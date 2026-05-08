import storageService from './storageService.js'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient.js'
import { withTimeout } from '../utils/async.js'
import { convertPrice, formatPrice } from '../utils/currency.js'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// Public URL for the brand icon used in email templates.
// The file public/logo-icon.png is served at the site root.
const LOGO_ICON_URL = import.meta.env.VITE_PUBLIC_LOGO_ICON_URL ||
  (typeof window !== 'undefined' ? `${window.location.origin}/logo-icon.png` : '')

function getAppBaseUrl() {
  const configuredUrl = String(import.meta.env.VITE_APP_PUBLIC_URL || '').trim()
  const runtimeUrl = typeof window !== 'undefined' ? window.location.origin : ''
  return (configuredUrl || runtimeUrl).replace(/\/+$/, '')
}

export function buildAppointmentConfirmationUrl(appointment) {
  const id = appointment?.id || appointment?.appointment_id || ''
  const code = appointment?.confirmation_code || ''
  if (!id || !code) return ''

  const params = new URLSearchParams({
    appointment_id: String(id),
    code: String(code),
  })

  return `${getAppBaseUrl()}/appointment-confirmation?${params.toString()}`
}

function normalizeDeliveryText(value = '') {
  return String(value || '').trim().toLowerCase()
}

function formatOrderTotalForEmail(order = {}) {
  if (order.order_total) return order.order_total

  const currency = order.currency || 'DOP'
  const totalDop = Number(order.total || 0)
  return formatPrice(convertPrice(totalDop, 'DOP', currency), currency)
}

export function estimateOrderDelivery(order = {}) {
  const method = normalizeDeliveryText(order.delivery_method || order.deliveryMethod)
  const city = normalizeDeliveryText(order.city || order.shipping_city || order.province || order.shipping_province)

  if (method.includes('pickup') || method.includes('recogida')) return 'Ready in 1 day'
  if (method.includes('express')) return '2 days'

  if (city.includes('santiago')) return '3 days'
  if (city.includes('santo domingo') || city.includes('distrito nacional') || city === 'dn') return '5 days'

  return '1 week'
}

const TEMPLATES = {
  routine: {
    es: import.meta.env.VITE_EMAILJS_ROUTINE_TEMPLATE_ID_ES,
    en: import.meta.env.VITE_EMAILJS_ROUTINE_TEMPLATE_ID_EN,
  },
  order: {
    es: import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID_ES,
    en: import.meta.env.VITE_EMAILJS_ORDER_TEMPLATE_ID_EN,
  },
  appointment: {
    es: import.meta.env.VITE_EMAILJS_APPOINTMENT_TEMPLATE_ID_ES,
    en: import.meta.env.VITE_EMAILJS_APPOINTMENT_TEMPLATE_ID_EN,
  },
}

let emailjs = null

function hasValue(v) {
  return !!String(v || '').trim()
}

function safeMessageForMissingConfig(emailType) {
  if (emailType === 'order') {
    return 'The order was saved successfully, but the confirmation email is not configured.'
  }
  return 'The routine was saved successfully, but email delivery is not configured.'
}

function safeMessageForTemplateNotFound(emailType) {
  if (emailType === 'order') {
    return 'The order was saved successfully, but the EmailJS template does not exist or does not belong to this service.'
  }
  return 'The routine was saved successfully, but the EmailJS template does not exist or does not belong to this service.'
}

async function getEmailJS() {
  if (emailjs) return emailjs
  try {
    const mod = await import('@emailjs/browser')
    emailjs = mod.default || mod
    emailjs.init(PUBLIC_KEY)
    return emailjs
  } catch (error) {
    console.error('[EmailJS error]', error)
    return null
  }
}

function resolveTemplateId(emailType, lang = 'es') {
  const typeTemplates = TEMPLATES[emailType] || {}
  return typeTemplates[lang] || typeTemplates.es || null
}

function validateConfig(emailType, lang = 'es') {
  const serviceId = SERVICE_ID
  const templateId = resolveTemplateId(emailType, lang)
  const publicKeyExists = hasValue(PUBLIC_KEY)

  console.log('[EmailJS config]', {
    emailType,
    serviceId,
    templateId,
    publicKeyExists,
  })

  if (!hasValue(serviceId) || !publicKeyExists || !hasValue(templateId)) {
    return {
      ok: false,
      serviceId,
      templateId,
      message: safeMessageForMissingConfig(emailType),
      reason: 'missing_config',
    }
  }

  return {
    ok: true,
    serviceId,
    templateId,
  }
}

async function writeEmailLog({
  type,
  to_email,
  order_id = null,
  appointment_id = null,
  routine_id = null,
  status,
  provider = 'emailjs',
  error_message = null,
  sent_at = null,
}) {
  const entry = {
    id: Date.now(),
    type,
    to_email,
    order_id,
    appointment_id,
    routine_id,
    status,
    provider,
    error_message,
    sent_at,
    created_at: new Date().toISOString(),
  }

  storageService.prepend('email_logs', entry)

  if (!isSupabaseConfigured) return

  try {
    await supabase.from('email_logs').insert({
      type,
      to_email,
      order_id,
      appointment_id,
      routine_id,
      status,
      provider,
      error_message,
      sent_at,
    })
  } catch (error) {
    console.warn('[EmailJS log] email_logs table unavailable or insert failed:', error?.message || error)
  }
}

async function sendEmail({ emailType, lang = 'es', params, log }) {
  const cfg = validateConfig(emailType, lang)

  if (!cfg.ok) {
    await writeEmailLog({ ...log, status: 'failed', error_message: cfg.message })
    return { ok: false, simulated: true, message: cfg.message }
  }

  const ejs = await getEmailJS()
  if (!ejs) {
    const message = safeMessageForMissingConfig(emailType)
    await writeEmailLog({ ...log, status: 'failed', error_message: message })
    return { ok: false, message }
  }

  try {
    await withTimeout(ejs.send(cfg.serviceId, cfg.templateId, params), 12000, 'EmailJS send')
    await writeEmailLog({ ...log, status: 'sent', sent_at: new Date().toISOString(), error_message: null })
    return { ok: true }
  } catch (error) {
    console.error('[EmailJS error]', error)
    const errorText = String(error?.text || error?.message || 'Unknown error')
    const lower = errorText.toLowerCase()
    const templateNotFound = lower.includes('template') && lower.includes('not found')

    const message = templateNotFound
      ? safeMessageForTemplateNotFound(emailType)
      : safeMessageForMissingConfig(emailType)

    await writeEmailLog({ ...log, status: 'failed', error_message: errorText })

    return {
      ok: false,
      message,
      rawError: errorText,
    }
  }
}

export async function sendRoutineByEmail(payload, lang = 'es') {
  const params = {
    to_email: payload.to_email,
    to_name: payload.to_name || 'Cliente',
    skin_type: payload.skin_type || '',
    diagnosis: payload.diagnosis || '',
    morning_routine: payload.morning_routine || '',
    night_routine: payload.night_routine || '',
    recommended_products: payload.recommended_products || '',
    reply_to: payload.reply_to || 'soporte@pharmadermrd.com',
    logo_url: LOGO_ICON_URL,
  }

  return sendEmail({
    emailType: 'routine',
    lang,
    params,
    log: {
      type: 'routine_ready',
      to_email: payload.to_email,
      routine_id: payload.routine_id || null,
    },
  })
}

export async function sendOrderConfirmationEmail(payload, lang = 'es') {
  const params = {
    to_email: payload.to_email,
    to_name: payload.to_name || 'Cliente',
    order_number: payload.order_number,
    order_total: formatOrderTotalForEmail(payload),
    order_status: payload.order_status || 'confirmed',
    payment_method: payload.payment_method || 'card',
    payment_details: payload.payment_details || 'Payment method registered successfully.',
    delivery_method: payload.delivery_method || 'delivery',
    estimated_delivery: payload.estimated_delivery || estimateOrderDelivery(payload),
    products: payload.products || '',
    shipping_address: payload.shipping_address || '',
    support_email: payload.support_email || 'soporte@pharmadermrd.com',
    reply_to: payload.reply_to || 'soporte@pharmadermrd.com',
    logo_url: LOGO_ICON_URL,
  }

  return sendEmail({
    emailType: 'order',
    lang,
    params,
    log: {
      type: 'order_confirmation',
      to_email: payload.to_email,
      order_id: payload.order_id || null,
    },
  })
}

export async function sendAppointmentConfirmationEmail(payload, lang = 'es') {
  const params = {
    to_email: payload.to_email,
    to_name: payload.to_name || 'Patient',

    appointment_id: payload.appointment_id || '',
    confirmation_code: payload.confirmation_code || payload.appointment_id || '',
    confirmation_url: payload.confirmation_url || buildAppointmentConfirmationUrl(payload),

    appointment_date: payload.appointment_date || '',
    appointment_time: payload.appointment_time || '',
    appointment_type: payload.appointment_type || 'General consultation',
    appointment_mode: payload.appointment_mode || '',
    appointment_reason: payload.appointment_reason || '',
    appointment_notes: payload.appointment_notes || '',
    appointment_urgency: payload.appointment_urgency || 'normal',
    appointment_status: payload.appointment_status || 'pending',

    dermatologist_id: payload.dermatologist_id || '',
    doctor_name: payload.doctor_name || '',
    doctor_specialty: payload.doctor_specialty || '',
    doctor_location: payload.doctor_location || '',

    analysis_id: payload.analysis_id || '',

    support_email: payload.support_email || 'soporte@pharmadermrd.com',
    reply_to: payload.reply_to || 'soporte@pharmadermrd.com',
    logo_url: LOGO_ICON_URL,
  }

  return sendEmail({
    emailType: 'appointment',
    lang,
    params,
    log: {
      type: 'appointment_confirmation',
      to_email: payload.to_email,
      appointment_id: payload.appointment_id || null,
    },
  })
}

export async function sendOrderConfirmation(order, lang = 'es') {
  const products = (order.items || [])
    .map(i => `${i.name || i.product_name} x${i.quantity || 1} (${i.size || i.size_label || 'N/A'})`)
    .join(', ')

  return sendOrderConfirmationEmail({
    to_email: order.customer_email,
    to_name: order.customer_name,
    order_id: order.id,
    order_number: order.order_number || order.id,
    order_total: formatOrderTotalForEmail(order),
    order_status: order.status,
    payment_method: order.payment_method,
    payment_details: order.payment_details || 'Payment method registered successfully.',
    delivery_method: order.delivery_method,
    estimated_delivery: order.estimated_delivery || estimateOrderDelivery(order),
    products,
    shipping_address: [order.address, order.city, order.country_code].filter(Boolean).join(', '),
    support_email: 'soporte@pharmadermrd.com',
    reply_to: 'soporte@pharmadermrd.com',
  }, lang)
}

export async function sendAppointmentConfirmation(apt, lang = 'es') {
  return sendAppointmentConfirmationEmail({
    to_email: apt.to_email || apt.user_email || apt.email,
    to_name: apt.to_name || apt.user_name || 'Patient',
    appointment_id: apt.id,
    confirmation_code: apt.confirmation_code || apt.id,
    confirmation_url: apt.confirmation_url || buildAppointmentConfirmationUrl(apt),
    appointment_date: apt.scheduled_date,
    appointment_time: apt.scheduled_time,
    appointment_type: apt.appointment_type,
    appointment_mode: apt.mode,
    appointment_reason: apt.reason,
    appointment_notes: apt.notes,
    appointment_urgency: apt.urgency,
    appointment_status: apt.status,
    dermatologist_id: apt.dermatologist_id,
    doctor_name: apt.doctor_name || apt.dermatologists?.name || '',
    doctor_specialty: apt.doctor_specialty || apt.dermatologists?.specialty || '',
    doctor_location: apt.doctor_location || apt.dermatologists?.location || '',
    analysis_id: apt.analysis_id,
  }, lang)
}

export const emailServiceConfigured = hasValue(SERVICE_ID) && hasValue(PUBLIC_KEY)

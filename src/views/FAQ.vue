<template>
  <div class="faq-page">

    <section class="faq-hero">
      <div class="hero-inner">
        <p class="hero-eyebrow">SUPPORT</p>
        <h1>Frequently Asked Questions</h1>
        <p class="hero-sub">Find answers to the most common questions about orders, products, appointments and skin care.</p>
      </div>
    </section>

    <section class="faq-body">
      <div class="faq-container">
        <div v-for="section in sections" :key="section.title" class="faq-section">
          <h2 class="faq-section-title">{{ section.title }}</h2>
          <div v-for="(item, idx) in section.items" :key="idx" class="faq-item">
            <button
              class="faq-question"
              @click="toggle(section.title, idx)"
              :aria-expanded="isOpen(section.title, idx)"
            >
              <span>{{ item.q }}</span>
              <span class="faq-chevron" :class="{ open: isOpen(section.title, idx) }">›</span>
            </button>
            <div v-show="isOpen(section.title, idx)" class="faq-answer">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>

        <div class="faq-cta">
          <p>Still have questions?</p>
          <RouterLink to="/contact" class="faq-cta-btn">Contact Us</RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const openMap = ref({})

function toggle(section, idx) {
  const key = `${section}-${idx}`
  openMap.value = { ...openMap.value, [key]: !openMap.value[key] }
}

function isOpen(section, idx) {
  return !!openMap.value[`${section}-${idx}`]
}

const sections = [
  {
    title: 'Orders',
    items: [
      {
        q: 'How can I place an order?',
        a: 'Browse our store, add products to your cart and proceed to checkout. You will need to be logged in to complete your purchase. We accept credit/debit cards, bank transfers and cash on delivery.',
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'Orders are processed quickly. If you need to make a change, please contact us at soporte@pharmadermrd.com as soon as possible. We will do our best to assist you before the order is dispatched.',
      },
      {
        q: 'How can I track my order?',
        a: 'Log in to your account and visit My Orders to see the status of your current and past orders. You will also receive a confirmation email with your order details.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept credit and debit cards, bank transfers to our registered accounts, and cash on delivery. All payment details are entered securely during checkout.',
      },
    ],
  },
  {
    title: 'Shipping',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Orders within Santiago are typically delivered within 1–2 business days. Santo Domingo and the Distrito Nacional take 2–3 business days. Other regions may take 3–5 business days.',
      },
      {
        q: 'How much does shipping cost?',
        a: 'Shipping to Santiago is RD$150. Delivery to Santo Domingo and Distrito Nacional is RD$200. Other regions are RD$300. Orders over RD$3,000 qualify for free shipping.',
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes. All orders with a subtotal of RD$3,000 or more qualify for free shipping, regardless of destination within the Dominican Republic.',
      },
    ],
  },
  {
    title: 'Returns',
    items: [
      {
        q: 'Can I return skincare products?',
        a: 'For hygiene and safety reasons, opened skincare products cannot be returned unless they are defective or damaged upon arrival. Unopened and sealed products can be returned within 7 days of receipt. Please contact us with your order number to initiate a return.',
      },
      {
        q: 'What if I received a damaged or incorrect order?',
        a: 'If your order arrived damaged or contained an incorrect item, please contact us within 48 hours at soporte@pharmadermrd.com with your order number and a photo of the issue. We will resolve it at no additional cost.',
      },
    ],
  },
  {
    title: 'Appointments',
    items: [
      {
        q: 'How do I book an appointment?',
        a: 'Go to Book Appointment from the navigation menu or footer. Select your preferred dermatologist, appointment type, date and time. You will receive a confirmation email once your appointment is booked.',
      },
      {
        q: 'Can I reschedule or cancel an appointment?',
        a: 'Yes. Log in and visit My Appointments to manage your scheduled appointments. You can also contact us directly at soporte@pharmadermrd.com.',
      },
      {
        q: 'Are virtual appointments available?',
        a: 'Yes. Several of our specialists offer virtual consultations. When booking, you can choose between virtual and in-person modalities depending on availability.',
      },
    ],
  },
  {
    title: 'Skin Analysis & Routines',
    items: [
      {
        q: 'How does the skin analysis work?',
        a: 'Our Skin Analysis tool is a guided questionnaire that evaluates your skin type, primary concerns and lifestyle. Based on your responses, it generates a personalized skin profile and product recommendations tailored to your needs.',
      },
      {
        q: 'Can I save my routine?',
        a: 'Yes. Once your routine is generated, you can view it in the Routine section of your account. You can also request to have it sent to your email directly from the routine page.',
      },
      {
        q: 'Is the skin analysis a medical diagnosis?',
        a: 'No. The skin analysis is an educational recommendation tool and does not replace a professional medical evaluation. For clinical concerns, we recommend booking a consultation with one of our dermatologists.',
      },
    ],
  },
  {
    title: 'Account & Login',
    items: [
      {
        q: 'How do I update my account information?',
        a: 'Log in and navigate to My Profile. From there you can update your personal details, contact information and preferences.',
      },
      {
        q: 'I forgot my password. What should I do?',
        a: 'On the login page, click "Forgot your password?" and enter your registered email address. You will receive a link to reset your password.',
      },
      {
        q: 'Is my data secure?',
        a: 'Yes. We use industry-standard security practices to protect your personal data. Your information is stored securely and never shared with third parties without your consent. See our Privacy Policy for full details.',
      },
    ],
  },
]
</script>

<style scoped>
.faq-page { min-height: 100vh; background: #f8fafc; }

.faq-hero {
  background: linear-gradient(135deg, #004e92 0%, #16a6e2 100%);
  padding: 4rem 1.5rem 3.5rem;
  text-align: center;
  color: white;
}
.hero-inner { max-width: 680px; margin: 0 auto; }
.hero-eyebrow {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .14em;
  opacity: .7;
  margin: 0 0 .6rem;
  text-transform: uppercase;
}
.faq-hero h1 {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  margin: 0 0 1rem;
  line-height: 1.15;
}
.hero-sub { font-size: 1.05rem; opacity: .85; margin: 0; line-height: 1.6; }

.faq-body { padding: 3rem 1.5rem 5rem; }
.faq-container { max-width: 820px; margin: 0 auto; }

.faq-section { margin-bottom: 2.5rem; }
.faq-section-title {
  font-size: .75rem;
  font-weight: 800;
  letter-spacing: .12em;
  text-transform: uppercase;
  color: #16a6e2;
  margin: 0 0 1rem;
  padding-bottom: .5rem;
  border-bottom: 2px solid #e0f4ff;
}

.faq-item { border-bottom: 1px solid #e5e7eb; }

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  padding: 1.1rem 0;
  text-align: left;
  font-size: .97rem;
  font-weight: 600;
  color: #111827;
  cursor: pointer;
  gap: 12px;
  transition: color .15s;
}
.faq-question:hover { color: #004e92; }

.faq-chevron {
  font-size: 1.3rem;
  color: #16a6e2;
  flex-shrink: 0;
  transition: transform .2s ease;
  display: inline-block;
}
.faq-chevron.open { transform: rotate(90deg); }

.faq-answer { padding: 0 0 1.1rem; }
.faq-answer p { font-size: .93rem; color: #4b5563; margin: 0; line-height: 1.7; }

.faq-cta {
  margin-top: 3rem;
  padding: 2.5rem;
  background: linear-gradient(135deg, #004e92 0%, #16a6e2 100%);
  border-radius: 16px;
  text-align: center;
  color: white;
}
.faq-cta p { font-size: 1.1rem; font-weight: 700; margin: 0 0 1.2rem; }
.faq-cta-btn {
  display: inline-block;
  padding: .75rem 2rem;
  background: white;
  color: #004e92;
  font-weight: 800;
  font-size: .9rem;
  letter-spacing: .04em;
  border-radius: 999px;
  text-decoration: none;
  transition: opacity .15s;
}
.faq-cta-btn:hover { opacity: .9; }
</style>

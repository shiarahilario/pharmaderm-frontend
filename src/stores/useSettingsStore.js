import { ref } from 'vue'
import { setGlobalLang } from '../lib/i18n.js'
import { countryList, countryCurrencyMap } from '../data/countries.js'
import { currencyList } from '../utils/currency.js'
import { useAuthStore } from './useAuthStore.js'

const language = ref('en')
const country  = ref('DO')
const currency = ref('DOP')

function _load() {
  document.documentElement.classList.remove('dark')
  document.documentElement.classList.add('light')
  try {
    const saved = localStorage.getItem('pharmaderm_settings')
    if (saved) {
      const s = JSON.parse(saved)
      language.value = localStorage.getItem('pharmaderm_lang') || s.language || 'en'
      country.value  = s.country   ?? 'DO'
      currency.value = s.currency  ?? 'DOP'
    } else {
      language.value = localStorage.getItem('pharmaderm_lang') || 'en'
      country.value  = 'DO'
      currency.value = 'DOP'
    }
  } catch {
    language.value = localStorage.getItem('pharmaderm_lang') || 'en'
    country.value  = 'DO'
    currency.value = 'DOP'
  }
  setGlobalLang(language.value)
}
_load()

function _save() {
  localStorage.setItem('pharmaderm_settings', JSON.stringify({
    language: language.value,
    country:  country.value,
    currency: currency.value,
  }))
  localStorage.setItem('pharmaderm_lang', language.value)
}

export function useSettingsStore() {
  function _syncAuth(updates) {
    try {
      const auth = useAuthStore()
      Promise.resolve(auth.updateSettings(updates)).catch(() => {})
    } catch {
      // ignore
    }
  }

  function setLanguage(lang) {
    language.value = lang
    setGlobalLang(lang)
    _save()
    _syncAuth({ language: lang })
  }

  function setCountry(code) {
    country.value = code
    // Auto-seleccionar moneda del país
    const defaultCurrency = countryCurrencyMap[code]
    if (defaultCurrency) currency.value = defaultCurrency
    _save()
    _syncAuth({ country: code, currency: currency.value })
  }

  function setCurrency(code) {
    currency.value = code
    _save()
    _syncAuth({ currency: code })
  }

  return {
    language, country, currency,
    countryList, currencyList,
    setLanguage, setCountry, setCurrency,
  }
}

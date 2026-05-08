<template>
  <div class="translate-widget">
    <button
      type="button"
      class="lang-btn"
      :class="{ active: lang === 'es' }"
      @click="setLang('es')"
      aria-label="Español"
    >ES</button>
    <span class="lang-divider">|</span>
    <button
      type="button"
      class="lang-btn"
      :class="{ active: lang === 'en' }"
      @click="setLang('en')"
      aria-label="English"
    >EN</button>
  </div>
</template>

<script setup>
import { useI18n } from '../lib/i18n.js'

const { lang, setLang } = useI18n()
</script>

<style scoped>
.translate-widget {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
}

.lang-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 3px 5px;
  border-radius: 4px;
  color: inherit;
  opacity: 0.55;
  transition: opacity 0.15s;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
}

.lang-btn.active {
  opacity: 1;
}

.lang-btn:hover {
  opacity: 0.9;
}

.lang-divider {
  opacity: 0.3;
}
</style>

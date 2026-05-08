<template>
  <div v-if="isVisibleRoute" class="accessibility-widget">
    <button
      type="button"
      class="accessibility-trigger"
      :aria-expanded="isOpen"
      aria-label="Accessibility options"
      @click="isOpen = !isOpen"
    >
      <span class="material-symbols-outlined">accessibility_new</span>
    </button>

    <transition name="a11y-panel">
      <section v-if="isOpen" class="accessibility-panel" aria-label="Accessibility panel">
        <div class="panel-head">
          <strong>Accessibility</strong>
          <button type="button" aria-label="Close accessibility panel" @click="isOpen = false">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <button type="button" :class="{ active: settings.largeText }" @click="toggle('largeText')">
          <span class="material-symbols-outlined">format_size</span>
          Larger text
        </button>
        <button type="button" :class="{ active: settings.contrast }" @click="toggle('contrast')">
          <span class="material-symbols-outlined">contrast</span>
          High contrast
        </button>
        <button type="button" :class="{ active: settings.grayscale }" @click="toggle('grayscale')">
          <span class="material-symbols-outlined">tonality</span>
          Grayscale
        </button>
        <button type="button" :class="{ active: settings.reduceMotion }" @click="toggle('reduceMotion')">
          <span class="material-symbols-outlined">motion_photos_pause</span>
          Reduce motion
        </button>
        <button type="button" :class="{ active: settings.highlightLinks }" @click="toggle('highlightLinks')">
          <span class="material-symbols-outlined">link</span>
          Highlight links
        </button>
        <button type="button" class="reset-btn" @click="reset">
          <span class="material-symbols-outlined">restart_alt</span>
          Reset
        </button>
      </section>
    </transition>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const STORAGE_KEY = 'pharmaderm_accessibility_settings'
const route = useRoute()
const isOpen = ref(false)
const settings = reactive({
  largeText: false,
  contrast: false,
  grayscale: false,
  reduceMotion: false,
  highlightLinks: false,
})

const isVisibleRoute = computed(() => route.path === '/inicio')

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    Object.assign(settings, saved)
  } catch {
    reset(false)
  }
}

function applySettings() {
  const root = document.documentElement
  root.classList.toggle('pd-a11y-large-text', settings.largeText)
  root.classList.toggle('pd-a11y-contrast', settings.contrast)
  root.classList.toggle('pd-a11y-grayscale', settings.grayscale)
  root.classList.toggle('pd-a11y-reduce-motion', settings.reduceMotion)
  root.classList.toggle('pd-a11y-highlight-links', settings.highlightLinks)
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...settings }))
}

function toggle(key) {
  settings[key] = !settings[key]
  applySettings()
}

function reset(shouldApply = true) {
  Object.assign(settings, {
    largeText: false,
    contrast: false,
    grayscale: false,
    reduceMotion: false,
    highlightLinks: false,
  })
  if (shouldApply) applySettings()
}

watch(() => route.path, () => {
  if (!isVisibleRoute.value) isOpen.value = false
})

onMounted(() => {
  loadSettings()
  applySettings()
})

onBeforeUnmount(() => {
  isOpen.value = false
})
</script>

<style scoped>
.accessibility-widget {
  position: fixed;
  right: 18px;
  bottom: 150px;
  z-index: 80;
}

.accessibility-trigger {
  width: 54px;
  height: 54px;
  border-radius: 999px;
  border: 1px solid rgba(22, 166, 226, 0.35);
  background: linear-gradient(135deg, #005187, #16a6e2);
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 16px 36px rgba(0, 81, 135, 0.24);
}

.accessibility-trigger span {
  font-size: 28px;
}

.accessibility-panel {
  position: absolute;
  right: 0;
  bottom: 66px;
  width: min(300px, calc(100vw - 32px));
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid #dbeafe;
  border-radius: 18px;
  box-shadow: 0 24px 70px rgba(0, 78, 146, 0.18);
  padding: 12px;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 2px 10px;
  color: #004e92;
}

.panel-head button,
.accessibility-panel > button {
  border: 0;
  background: transparent;
  cursor: pointer;
}

.accessibility-panel > button {
  width: 100%;
  min-height: 44px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  padding: 10px 12px;
  color: #0f172a;
  text-align: left;
  font-weight: 700;
}

.accessibility-panel > button:hover,
.accessibility-panel > button.active {
  background: #e0f2fe;
  color: #005187;
}

.accessibility-panel .reset-btn {
  color: #64748b;
}

.a11y-panel-enter-active,
.a11y-panel-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.a11y-panel-enter-from,
.a11y-panel-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

:global(html.pd-a11y-large-text) {
  font-size: 112.5%;
}

:global(html.pd-a11y-contrast body) {
  background: #fff !important;
  color: #001b33 !important;
}

:global(html.pd-a11y-contrast a),
:global(html.pd-a11y-contrast button) {
  outline-color: #005187;
}

:global(html.pd-a11y-grayscale) {
  filter: grayscale(1);
}

:global(html.pd-a11y-reduce-motion *),
:global(html.pd-a11y-reduce-motion *::before),
:global(html.pd-a11y-reduce-motion *::after) {
  animation-duration: 0.001ms !important;
  animation-iteration-count: 1 !important;
  scroll-behavior: auto !important;
  transition-duration: 0.001ms !important;
}

:global(html.pd-a11y-highlight-links a) {
  outline: 2px solid #16a6e2;
  outline-offset: 2px;
  text-decoration: underline !important;
}

@media (max-width: 640px) {
  .accessibility-widget {
    right: 14px;
    bottom: 146px;
  }
}
</style>

<template>
  <div>
    <AppNavbar v-if="showChrome" />

    <div :class="pageClass">
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </router-view>
      <AppFooter v-if="showChrome" />
    </div>

    <BottomNav v-if="showChrome" />
    <ScrollTopButton v-if="showChrome" />
    <BackgroundMusicPlayer v-if="!isPublicRoute" />
    <AccessibilityWidget />
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import BottomNav from './components/BottomNav.vue'
import AppFooter from './components/AppFooter.vue'
import ScrollTopButton from './components/ScrollTopButton.vue'
import BackgroundMusicPlayer from './components/BackgroundMusicPlayer.vue'
import AccessibilityWidget from './components/AccessibilityWidget.vue'

const route = useRoute()
const chromeHidden = ref(false)

const publicRoutes = ['/login', '/registro', '/olvide', '/reset-password', '/appointment-confirmation']
const isPublicRoute = computed(() => publicRoutes.includes(route.path))
const showChrome = computed(() => !isPublicRoute.value && !chromeHidden.value)
const pageClass = computed(() => {
  if (isPublicRoute.value) return ''
  return chromeHidden.value ? 'page-wrap page-wrap--immersive' : 'page-wrap'
})

function handleChromeVisibility(event) {
  chromeHidden.value = !!event.detail?.hidden
}

onMounted(() => {
  window.addEventListener('pd:chrome', handleChromeVisibility)
})

onBeforeUnmount(() => {
  window.removeEventListener('pd:chrome', handleChromeVisibility)
})
</script>

<style>
/* Global: offset page content below fixed AppNavbar (promo ~38px + nav 72px = ~110px) */
.page-wrap {
  padding-top: 110px;
  padding-bottom: 96px; /* room for BottomNav */
  min-height: 100vh;
}

.page-wrap--immersive {
  padding-top: 0;
  padding-bottom: 0;
}

/* Route transitions (used by <Transition name="page" />) */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.99);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.995);
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>

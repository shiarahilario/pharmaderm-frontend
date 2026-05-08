<template>
  <nav class="bottom-nav">
    <RouterLink to="/inicio" class="nav-item" :class="{ active: isActive('/inicio') }" :aria-label="t('bottomNav.home')">
      <span class="material-symbols-outlined">home</span>
      <p>{{ t('bottomNav.home') }}</p>
    </RouterLink>

    <RouterLink to="/tienda" class="nav-item" :class="{ active: isActive('/tienda') || isActive('/producto') }" :aria-label="t('bottomNav.shop')">
      <span class="material-symbols-outlined">grid_view</span>
      <p>{{ t('bottomNav.shop') }}</p>
    </RouterLink>

    <RouterLink to="/diagnostics" class="nav-center" :class="{ active: isActive('/diagnostics') }" :aria-label="t('bottomNav.diagnostics')">
      <div class="fab">
        <span class="material-symbols-outlined">stethoscope</span>
      </div>
      <p>{{ t('bottomNav.diagnostics') }}</p>
    </RouterLink>

    <RouterLink to="/routine" class="nav-item" :class="{ active: isActive('/routine') }" :aria-label="t('bottomNav.routine')">
      <span class="material-symbols-outlined">spa</span>
      <p>{{ t('bottomNav.routine') }}</p>
    </RouterLink>

    <RouterLink to="/perfil" class="nav-item" :class="{ active: isActive('/perfil') }" :aria-label="t('bottomNav.profile')">
      <span class="material-symbols-outlined">person</span>
      <p>{{ t('bottomNav.profile') }}</p>
    </RouterLink>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useRoute } from 'vue-router'
import { useI18n } from '../lib/i18n.js'

const route = useRoute()
const { t } = useI18n()

function isActive(path) {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(10px);
  border-top: 1px solid #e2e8f0;
  padding: 10px 24px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
}

.nav-item,
.nav-center {
  text-decoration: none;
  color: #94a3b8;
  display: grid;
  place-items: center;
  gap: 4px;
  min-width: 60px;
  user-select: none;
}


.nav-item .material-symbols-outlined,
.nav-center .material-symbols-outlined {
  font-size: 26px;
}

.nav-item p,
.nav-center p {
  font-size: 11px;
  margin: 0;
  font-weight: 600;
}

.nav-item.active,
.nav-center.active {
  color: #004e92;
}

.nav-center {
  margin-top: -20px;
}

.fab {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: #004e92;
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 16px 36px rgba(0,0,0,0.22);
  border: 4px solid rgba(248,250,252,0.96);
}

.nav-center.active .fab {
  background: #0066cc;
}

</style>

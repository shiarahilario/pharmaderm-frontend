<template>
  <div class="music-player">
    <button
      class="music-toggle"
      type="button"
      @click="togglePlay"
      :aria-label="playing ? 'Pause ambient music' : 'Play ambient music'"
      :title="playing ? 'Pause music' : 'Play music'"
    >
      <span class="music-icon" :class="{ pulse: playing }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 3v13.55A4 4 0 1 0 11 20V8h6V3H9Z"/>
        </svg>
      </span>
    </button>

    <audio ref="audioEl" loop preload="auto" :src="musicSrc" @canplaythrough="onCanPlay" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import musicFile from '../assets/fondo/musica.mp3'

const STORAGE_KEY = 'pd_music'
const AMBIENT_VOLUME = 0.22

const audioEl = ref(null)
const playing = ref(false)
const musicSrc = musicFile

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    if (saved.playing === true) playing.value = true
  } catch {}
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ playing: playing.value }))
}

function onCanPlay() {
  if (audioEl.value) audioEl.value.volume = AMBIENT_VOLUME
  if (playing.value) audioEl.value?.play().catch(() => { playing.value = false })
}

function togglePlay() {
  if (!audioEl.value) return
  if (playing.value) {
    audioEl.value.pause()
    playing.value = false
  } else {
    audioEl.value.play().then(() => { playing.value = true }).catch(() => { playing.value = false })
  }
  saveState()
}

onMounted(() => {
  loadState()
  if (audioEl.value) audioEl.value.volume = AMBIENT_VOLUME
})

onUnmounted(() => {
  audioEl.value?.pause()
})
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 88px;
  left: 16px;
  z-index: 60;
  display: flex;
  align-items: center;
  gap: 8px;
}

.music-toggle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #004e92;
  color: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 78, 146, 0.35);
  flex-shrink: 0;
  transition: background 0.2s;
}

.music-toggle:hover {
  background: #005eb8;
}

.music-icon svg {
  width: 20px;
  height: 20px;
}

.music-icon.pulse svg {
  animation: music-pulse 1.6s ease-in-out infinite;
}

@keyframes music-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.15); opacity: 0.8; }
}

</style>

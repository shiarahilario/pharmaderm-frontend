<template>
  <div
    class="min-h-screen pb-[120px]"
    :class="[{ 'pd-dark': isDark }, 'pd-root']"
  >
    <!-- HEADER -->
    <header class="sticky top-0 z-50 pd-surface pd-border-b">
      <div class="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwGk1ZsXrDiVM1y4eYkFkLAVJyj3SEQtwpa9gS41xgybM4JsMSUQU1bAYKb4aviIWmG2GtMVM1nQrg4rTEm3bi80sHtcf-M6xSUCR2ua9YOhGfPNVmoJhBG1zcuzQq8mODOnwTQihKFT5tQ_dy8FM8IC-Z12rIEybnyvjZd3JctWEFO86kmHZonJMxnQG6HrfgLFeTwIK6wsY-4PKy7LSaqAD3iJEqDxf2JVzH6t5Aj5cneE7Af9KkyxdLRTwpToy3oqVFRaMPLFs"
            class="h-9 w-9 rounded-lg shadow-sm"
            alt="PharmaDerm Logo"
          />
          <h1 class="text-lg font-bold tracking-tight pd-brand">
            PharmaDerm<span class="pd-accent">RD</span>
          </h1>
        </div>

        <div class="flex items-center gap-4">
          <button class="p-2 rounded-full pd-hover" type="button" aria-label="Search">
            <span class="material-symbols-outlined pd-icon">search</span>
          </button>
          <button class="p-2 rounded-full pd-hover" type="button" aria-label="Cart">
            <span class="material-symbols-outlined pd-icon">shopping_bag</span>
          </button>
          <button class="p-2 rounded-full pd-hover" type="button" aria-label="Profile">
            <span class="material-symbols-outlined pd-icon">person</span>
          </button>
        </div>
      </div>

      <div class="pd-banner">
        <p class="text-center text-white text-[11px] font-semibold uppercase tracking-widest">
          Free shipping on orders over RD$3,000 • Shop Now
        </p>
      </div>
    </header>

    <!-- MAIN -->
    <main class="max-w-[1200px] mx-auto px-6">
      <!-- HERO + ANALYZE CARD -->
      <section class="mt-8">
        <div class="pd-hero rounded-[28px] overflow-hidden shadow-xl relative">
          <div class="px-6 sm:px-10 py-12 sm:py-16 text-center text-white">
            <span class="text-xs uppercase tracking-[0.25em] opacity-80">
              Recommended by Experts
            </span>

            <h2 class="text-3xl sm:text-4xl font-extrabold mt-4 leading-tight">
              Dermatologist Recommended Body Moisturizers
            </h2>

            <p class="mt-4 text-white/90 text-sm sm:text-base">
              Restore your skin's protective barrier with clinically proven formulas.
            </p>

            <button
              class="mt-8 pd-cta px-8 sm:px-10 py-3 rounded-full font-bold shadow-lg transition"
              type="button"
            >
              Shop Recommendations
            </button>
          </div>

          <div class="px-6 sm:px-10 pb-10">
            <div class="pd-card rounded-2xl p-5 sm:p-6 shadow-xl flex items-center justify-between gap-4">
              <div>
                <h3 class="font-bold text-lg">Analyze Your Skin</h3>
                <p class="text-sm pd-muted">Get a personalized routine in 2 minutes.</p>
                <button
                  class="mt-2 pd-link font-bold text-sm flex items-center gap-1"
                  type="button"
                >
                  Start Skin Quiz <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              <div class="shrink-0 pd-chip p-4 rounded-2xl">
                <span class="material-symbols-outlined text-5xl pd-link">
                  face_retouching_natural
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- BEST SELLERS -->
      <section class="mt-10">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-xl">Best Sellers</h3>
          <a class="pd-link font-semibold text-sm hover:underline" href="#">View All</a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <article class="pd-card pd-border rounded-2xl p-4 shadow-sm">
            <div class="relative pd-soft rounded-xl p-6 flex items-center justify-center">
              <img
                class="h-40 object-contain"
                alt="CeraVe Moisturizing Cream"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk22qtYBeco0iYwHtPMKk7rtuRnJ3_M0lJeFY4fyMlih9jA8MKOAKmkPlc2AHy4BtlEppd00ZpCwGLI8PAz1l2IKVeT-mpMqMT2WbSfUNUbb3bGFG4gaCHLs3vJNmYVrXPR0TbXPdyZF55S08KSeb1VZc1ahNmRKbA2s0EqNZJEgjQk_xaWqO8-QTr_hxUjHXWpmH37Td7XIFQU6nv-fchJ6niWbJAoSrZ3WTdi-qdGU1fbFhMr0WZ-SMdH6tzfCHzFEbJQ-ORMds"
              />
              <button
                class="absolute top-3 right-3 w-9 h-9 rounded-full pd-surface shadow flex items-center justify-center"
                type="button"
                aria-label="Favorite"
              >
                <span class="material-symbols-outlined pd-muted text-[20px]">favorite</span>
              </button>
            </div>

            <p class="mt-3 text-[10px] uppercase tracking-widest pd-muted font-bold">CeraVe</p>
            <h4 class="font-semibold">Moisturizing Cream</h4>

            <div class="mt-3 flex items-center justify-between">
              <span class="pd-price font-bold">RD$1,250</span>
              <button class="pd-fab-mini" type="button">
                <span class="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </article>

          <!-- Card 2 -->
          <article class="pd-card pd-border rounded-2xl p-4 shadow-sm">
            <div class="relative pd-soft rounded-xl p-6 flex items-center justify-center">
              <img
                class="h-40 object-contain"
                alt="La Roche-Posay Hyalu B5 Serum"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMMlDIqmWLn_g7u4DLf32ffJ_h7LXEhd3iezdcAYWpk1nH2ULAE-sjIHl30kUmcN1eLFus8MN41AaIkGr4-Za_7vNUyWqqQyQiVhP2E41vFNm73DuxgaB7JcTvd8WY0cSjUVzIcb6hDFzk3w6W9zsJsgIDtgzwaCZDdenS9IR_ZAgHJUVH_aX4o0O7VEwEfVNrQRiE2Qn1FdXcCLF6Jp1SAnuUDEThlt8UF7zh2c_nMiSW8Y-Ni7M7TyGW4hsVgWnM5ZBlZ_YdWew"
              />
              <button
                class="absolute top-3 right-3 w-9 h-9 rounded-full pd-surface shadow flex items-center justify-center"
                type="button"
                aria-label="Favorite"
              >
                <span class="material-symbols-outlined pd-muted text-[20px]">favorite</span>
              </button>
            </div>

            <p class="mt-3 text-[10px] uppercase tracking-widest pd-muted font-bold">La Roche-Posay</p>
            <h4 class="font-semibold">Hyalu B5 Serum</h4>

            <div class="mt-3 flex items-center justify-between">
              <span class="pd-price font-bold">RD$2,400</span>
              <button class="pd-fab-mini" type="button">
                <span class="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </article>

          <!-- Card 3 -->
          <article class="pd-card pd-border rounded-2xl p-4 shadow-sm">
            <div class="relative pd-soft rounded-xl p-6 flex items-center justify-center">
              <img
                class="h-40 object-contain"
                alt="Mineral Sunscreen"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbfVBf8Eu8akiwraLwYqTMMlcs01tKQIItr4Z7ayqemmLg1ywZ_4dM3gHDVcfuZH_Sh6x-oDwExpO_aN-oKkUyhHwcK5ejECCvTzJZyOA6p7qaPmaRY0WoYQVTHH-4aiazW4EhFpYqFGIy544oqImpT1QAv94WemcrKMsC554wVOoqj5iT_ZsCgMZF4p0f8ZdqGhYv4h_2bfdC9fUplWGarfSzlIquHFcrSBdqxNEz0L47SFdwmlpU7lk5P0TG-wSz6W17c03TBrA"
              />
              <button
                class="absolute top-3 right-3 w-9 h-9 rounded-full pd-surface shadow flex items-center justify-center"
                type="button"
                aria-label="Favorite"
              >
                <span class="material-symbols-outlined pd-muted text-[20px]">favorite</span>
              </button>
            </div>

            <p class="mt-3 text-[10px] uppercase tracking-widest pd-muted font-bold">PharmaDerm</p>
            <h4 class="font-semibold">Mineral Sunscreen</h4>

            <div class="mt-3 flex items-center justify-between">
              <span class="pd-price font-bold">RD$950</span>
              <button class="pd-fab-mini" type="button">
                <span class="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- EXPERT RECOMMENDED -->
      <section class="mt-10">
        <h3 class="font-bold text-xl mb-4">Expert Recommended</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="pd-brandcard-a rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
            <span class="text-[10px] uppercase tracking-widest opacity-80 font-bold">Official Partner</span>
            <h4 class="text-2xl font-extrabold mt-2">CeraVe</h4>
            <button class="mt-4 pd-pill" type="button">Shop Brand</button>
            <img
              class="absolute -right-6 -bottom-6 w-28 h-28 rotate-12 opacity-25"
              alt="Brand"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwtfGO-I4erKLFtXOv-4TOQp-XiTy9K_KV-rh32gbQiR8gL-N0oUP6CAI3GjiG6nLU1lPVrBCkvAuEApmM04jlhaEnPLfXKIbf7xNMENVdcVRbH0lrG8muhGnLz_fI2kXR-BrHD4m_YgCBOAjhOuRnFtJ73rL6pEbmdxFhz_qpc7_Fkx3B7XvnKcjvtBeLGOoFjPd8MNefQYNoZkfyubW6TxYJuPTLwWJkYqF5paRJ_E8IHHCdM3LOj4TAMmiUiTsXSOELaRPRg48"
            />
          </div>

          <div class="pd-brandcard-b rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
            <span class="text-[10px] uppercase tracking-widest opacity-80 font-bold">Premium Care</span>
            <h4 class="text-2xl font-extrabold mt-2">La Roche-Posay</h4>
            <button class="mt-4 pd-pill" type="button">Shop Brand</button>
            <img
              class="absolute -right-6 -bottom-6 w-28 h-28 rotate-12 opacity-25"
              alt="Brand"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhGWBtBunhC8dRtZYLWiyS4Xvd_kbjIjkXdWbAlx3UiK6llwx5VkuA5IUVduNx-emluHj7BWFSFjTpHcUf7LaUiLCwCQS4l81dzkaG8fKOXPRYhm3fyOHAXnJo9d-FBnyYWnMjqba8VjHDZPMHoquSpnCuMdOQ1LLiYvqsT6uSlFRr_gd1kmieW7eX14wk4o8cuTV9hxQkuNP0QkbAyHlXFlHjRP_MuZKhF-IE7NZJ7Djanobceh37PtH723ezL1eaqgiG949f5rs"
            />
          </div>
        </div>
      </section>

      <!-- PROFESSIONAL GUIDANCE -->
      <section class="mt-10 mb-10">
        <div class="pd-guidance pd-border rounded-2xl p-8 text-center">
          <span class="material-symbols-outlined pd-link text-5xl">clinical_notes</span>
          <h3 class="font-bold text-2xl mt-2">Professional Guidance</h3>
          <p class="pd-muted mt-2 max-w-2xl mx-auto">
            Connect with certified dermatologists in the Dominican Republic for a specialized consultation.
          </p>

          <button class="mt-6 w-full max-w-xl mx-auto py-4 rounded-xl pd-primary text-white font-bold shadow-lg" type="button">
            Book Appointment
          </button>
        </div>
      </section>
    </main>

    <!-- FLOAT DARK MODE BUTTON -->
    <button
      class="fixed right-6 bottom-[120px] pd-surface p-3 rounded-full shadow-xl pd-border z-40"
      type="button"
      aria-label="Toggle dark mode"
      @click="toggleDark"
    >
      <span class="material-symbols-outlined pd-toggleicon">{{ isDark ? "light_mode" : "dark_mode" }}</span>
    </button>

    <!-- BOTTOM NAV (CLIQUEABLE) -->
    <nav class="fixed bottom-0 left-0 right-0 pd-surface pd-border-t px-6 py-3 flex justify-between items-center z-50">
      <RouterLink to="/inicio" class="pd-navitem" :class="{ active: isActive('/inicio') }" aria-label="Home">
        <span class="material-symbols-outlined">home</span>
        <p>Home</p>
      </RouterLink>

      <RouterLink to="/tienda" class="pd-navitem" :class="{ active: isActive('/shop') }" aria-label="Shop">
        <span class="material-symbols-outlined">grid_view</span>
        <p>Shop</p>
      </RouterLink>

      <RouterLink to="/diagnostics" class="pd-navcenter" :class="{ active: isActive('/diagnostics') }" aria-label="Diagnostics">
        <div class="pd-fab">
          <span class="material-symbols-outlined">stethoscope</span>
        </div>
        <p>Diagnostics</p>
      </RouterLink>

      <RouterLink to="/routine" class="pd-navitem" :class="{ active: isActive('/routine') }" aria-label="Routine">
        <span class="material-symbols-outlined">local_hospital</span>
        <p>Routine</p>
      </RouterLink>

      <RouterLink to="/profile" class="pd-navitem" :class="{ active: isActive('/profile') }" aria-label="Profile">
        <span class="material-symbols-outlined">person</span>
        <p>Profile</p>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isDark = ref(false);

onMounted(() => {
  const saved = localStorage.getItem("pd_dark");
  isDark.value = saved === "1";
});

const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("pd_dark", isDark.value ? "1" : "0");
};

const isActive = (path) => route.path === path;
</script>

<style scoped>
/* =========================================================
   PALETA CON VARIABLES (light / dark)
   - En dark NO mantenemos la misma colorimetría
   ========================================================= */

.pd-root {
  /* LIGHT (tu paleta actual) */
  --bg: #f8fafc;
  --text: #0f172a;
  --muted: #64748b;

  --surface: rgba(255, 255, 255, 0.92);
  --card: #ffffff;
  --soft: #f1f5f9;

  --border: #e2e8f0;

  --brand: #004e92;
  --link: #5dbcd2;
  --accent: #76b82a;

  --banner: #5dbcd2;

  --price: #004e92;

  --cta-bg: #ffffff;
  --cta-text: #004e92;

  --primary: #004e92;

  --nav-inactive: #94a3b8;
  --nav-active: #004e92;

  --fab: #004e92;
  --fab-ring: #f8fafc;

  --toggle: #475569; /* icon del botón flotante */
}

.pd-dark.pd-root {
  /* DARK (paleta adaptada: más profunda, menos “cyan brillante”) */
  --bg: #0b1220;           /* azul noche */
  --text: #e5e7eb;         /* casi blanco */
  --muted: #9aa7ba;        /* gris azulado */

  --surface: rgba(10, 18, 32, 0.92); /* glass oscuro */
  --card: #0f1a2e;         /* panel azul petróleo */
  --soft: #0a162a;         /* fondo interno */

  --border: #1c2b44;

  --brand: #8cc7ff;        /* logo/brand más claro en dark */
  --link: #66d6ff;         /* links cyan suave (no chillón) */
  --accent: #9be15d;       /* verde más vivo para destacar */

  --banner: #0f3a57;       /* barra shipping más sobria */

  --price: #cfe9ff;

  --cta-bg: #0f1a2e;
  --cta-text: #cfe9ff;

  --primary: #183a6b;      /* botones principales más oscuros */
  --nav-inactive: #6f8099;
  --nav-active: #66d6ff;

  --fab: #1f4b86;
  --fab-ring: #0b1220;

  --toggle: #fbbf24;       /* icono “sol” */
}

/* =========================================================
   APLICACIÓN DE VARIABLES
   ========================================================= */

.pd-root {
  background: var(--bg);
  color: var(--text);
}

.pd-muted { color: var(--muted); }

.pd-surface {
  background: var(--surface);
  backdrop-filter: blur(10px);
}

.pd-card { background: var(--card); }

.pd-soft { background: var(--soft); }

.pd-border { border: 1px solid var(--border); }
.pd-border-t { border-top: 1px solid var(--border); }
.pd-border-b { border-bottom: 1px solid var(--border); }

.pd-hover:hover { background: rgba(148, 163, 184, 0.18); }
.pd-dark .pd-hover:hover { background: rgba(255, 255, 255, 0.06); }

.pd-brand { color: var(--brand); }
.pd-accent { color: var(--accent); }
.pd-icon { color: var(--brand); }

.pd-banner { background: var(--banner); }

.pd-link { color: var(--link); }

.pd-hero {
  /* En dark, el hero también cambia (no el mismo degradado) */
  background: linear-gradient(135deg, var(--brand), var(--link));
}
.pd-dark .pd-hero {
  background: linear-gradient(135deg, #102a4d, #0f3a57);
}

.pd-cta {
  background: var(--cta-bg);
  color: var(--cta-text);
}
.pd-cta:hover { filter: brightness(0.98); }
.pd-dark .pd-cta:hover { filter: brightness(1.08); }

.pd-price { color: var(--price); }

.pd-primary { background: var(--primary); }

.pd-chip { background: color-mix(in srgb, var(--link) 12%, transparent); }
.pd-dark .pd-chip { background: rgba(102, 214, 255, 0.12); }

.pd-guidance {
  background: color-mix(in srgb, var(--link) 8%, var(--card));
}

/* Brand cards */
.pd-brandcard-a { background: linear-gradient(135deg, #005699, #004276); }
.pd-brandcard-b { background: linear-gradient(135deg, #004e92, #1a2b4b); }
.pd-dark .pd-brandcard-a { background: linear-gradient(135deg, #133a66, #0f2c4c); }
.pd-dark .pd-brandcard-b { background: linear-gradient(135deg, #102a4d, #0b203a); }

.pd-pill {
  background: rgba(255, 255, 255, 0.18);
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

/* botón + mini en cards */
.pd-fab-mini {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: var(--fab);
  color: #fff;
  display: grid;
  place-items: center;
}

/* icono del toggle */
.pd-toggleicon { color: var(--toggle); }

/* =========================================================
   BOTTOM NAV
   ========================================================= */

.pd-navitem,
.pd-navcenter {
  text-decoration: none;
  color: var(--nav-inactive);
  display: grid;
  place-items: center;
  gap: 4px;
  min-width: 64px;
  user-select: none;
}

.pd-navitem span,
.pd-navcenter span { font-size: 26px; }

.pd-navitem p,
.pd-navcenter p {
  font-size: 12px;
  margin: 0;
}

.pd-navitem.active,
.pd-navcenter.active { color: var(--nav-active); }

/* FAB central */
.pd-navcenter { margin-top: -18px; }

.pd-fab {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: var(--fab);
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
  border: 4px solid var(--fab-ring);
}
</style>

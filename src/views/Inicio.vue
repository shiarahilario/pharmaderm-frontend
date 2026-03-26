<template>
  <div
    class="min-h-screen pb-[120px]"
    :class="[{ 'pd-dark': isDark }, 'pd-root']"
    @click="handleRootClick"
  >
    <!-- HEADER -->
    <header class="sticky top-0 z-50 pd-surface pd-border-b">
      <div class="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwGk1ZsXrDiVM1y4eYkFkLAVJyj3SEQtwpa9gS41xgybM4JsMSUQU1bAYKb4aviIWmG2GtMVM1nQrg4rTEm3bi80sHtcf-M6xSUCR2ua9YOhGfPNVmoJhBG1zcuzQq8mODOnwTQihKFT5tQ_dy8FM8IC-Z12rIEybnyvjZd3JctWEFO86kmHZonJMxnQG6HrfgLFeTwIK6wsY-4PKy7LSaqAD3iJEqDxf2JVzH6t5Aj5cneE7Af9KkyxdLRTwpToy3oqVFRaMPLFs"
            class="h-9 w-9 rounded-lg shadow-sm object-cover"
            alt="PharmaDerm Logo"
          />
          <h1 class="text-lg font-bold tracking-tight pd-brand">
            PharmaDerm<span class="pd-accent">RD</span>
          </h1>
        </div>

        <div class="flex items-center gap-4 relative">
          <button
            class="p-2 rounded-full pd-hover relative"
            type="button"
            aria-label="Search"
            @click.stop="openSearch"
          >
            <span class="material-symbols-outlined pd-icon">search</span>
          </button>

          <button
            class="p-2 rounded-full pd-hover relative"
            type="button"
            aria-label="Cart"
            @click.stop="goToCart"
          >
            <span class="material-symbols-outlined pd-icon">shopping_bag</span>
            <span v-if="cartCount > 0" class="pd-badge">{{ cartCount }}</span>
          </button>

          <button
            class="p-2 rounded-full pd-hover relative"
            type="button"
            aria-label="Profile"
            @click.stop="toggleProfilePanel"
          >
            <span class="material-symbols-outlined pd-icon">person</span>
          </button>

          <!-- MINI PANEL DE PERFIL -->
          <transition name="pd-fade-scale">
            <div
              v-if="showProfilePanel"
              class="pd-account-panel pd-border"
              @click.stop
            >
              <div class="pd-account-top">
                <div class="pd-account-email">{{ currentUser.email }}</div>

                <button
                  class="pd-account-close"
                  type="button"
                  aria-label="Close"
                  @click="showProfilePanel = false"
                >
                  <span class="material-symbols-outlined">close</span>
                </button>
              </div>

              <div class="pd-account-main">
                <div class="pd-account-avatar-wrap">
                  <img
                    v-if="currentUser.avatar"
                    :src="currentUser.avatar"
                    alt="Avatar"
                    class="pd-account-avatar"
                  />
                  <div v-else class="pd-account-avatar pd-account-avatar-fallback">
                    {{ currentInitial }}
                  </div>
                </div>

                <h3 class="pd-account-greeting">¡Hola, {{ currentUser.name }}!</h3>

                <button
                  class="pd-account-manage"
                  type="button"
                  @click="router.push('/perfil')"
                >
                  Administrar tu cuenta
                </button>
              </div>

              <div class="pd-account-list">
                <div class="pd-account-list-title">Ocultar más cuentas</div>

                <div
                  v-for="(acc, index) in linkedAccounts"
                  :key="`${acc.email}-${index}`"
                  class="pd-account-item"
                >
                  <div class="pd-account-item-avatar">
                    <img
                      v-if="acc.avatar"
                      :src="acc.avatar"
                      alt="Account"
                      class="pd-account-item-avatar-img"
                    />
                    <span v-else>{{ (acc.name || acc.email || 'U').charAt(0).toUpperCase() }}</span>
                  </div>

                  <div class="pd-account-item-text">
                    <p class="pd-account-item-name">{{ acc.name }}</p>
                    <p class="pd-account-item-email">{{ acc.email }}</p>
                  </div>
                </div>

                <button
                  class="pd-account-action"
                  type="button"
                  @click="router.push('/registro')"
                >
                  <span class="material-symbols-outlined">add</span>
                  Agregar otra cuenta
                </button>

                <button
                  class="pd-account-action"
                  type="button"
                  @click="logout"
                >
                  <span class="material-symbols-outlined">logout</span>
                  Salir de la cuenta
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div class="pd-banner">
        <p class="text-center text-white text-[11px] font-semibold uppercase tracking-widest py-2">
          Free shipping on orders over RD$3,000 • Shop Now
        </p>
      </div>
    </header>

    <!-- SEARCH OVERLAY -->
    <transition name="pd-search-fade">
      <div
        v-if="showSearchOverlay"
        class="pd-search-overlay"
        @click.self="closeSearch"
      >
        <div class="pd-search-shell">
          <div class="pd-search-top pd-surface pd-border-b">
            <div class="pd-search-nav">
              <button class="pd-search-nav-item" type="button" @click="router.push('/tienda')">OUR PRODUCTS</button>
              <button class="pd-search-nav-item" type="button" @click="scrollToBestSellers">BEST SELLERS</button>
              <button class="pd-search-nav-item" type="button" @click="router.push('/diagnostics')">ANALYZE YOUR SKIN</button>
              <button class="pd-search-nav-item" type="button" @click="router.push('/diagnostics')">EXPERT ADVICE</button>
              <button class="pd-search-nav-item" type="button">OUR STORY</button>
              <button class="pd-search-nav-item" type="button">OFFERS</button>

              <button class="pd-search-close" type="button" @click="closeSearch">
                <span class="material-symbols-outlined">close</span>
                <span>CLOSE</span>
              </button>
            </div>
          </div>

          <div class="pd-search-head">
            <div class="pd-search-input-wrap">
              <span class="pd-search-leading">I'm Looking for...</span>
              <input
                ref="searchInputRef"
                v-model.trim="searchText"
                type="text"
                class="pd-search-input"
                placeholder="toleriane"
              />
            </div>
          </div>

          <div class="pd-search-body">
            <div class="pd-search-results">
              <div class="pd-search-results-head">
                <h3>BEST MATCHES</h3>
                <button
                  v-if="searchMatches.length > 0"
                  class="pd-view-all"
                  type="button"
                  @click="viewAllSearchResults"
                >
                  View all
                </button>
              </div>

              <div v-if="searchMatches.length > 0" class="pd-search-grid">
                <article
                  v-for="product in searchMatches"
                  :key="product.id"
                  class="pd-search-card"
                  @click="openProductSearch(product)"
                >
                  <div class="pd-search-card-imagewrap">
                    <img :src="product.image" :alt="product.name" class="pd-search-card-image" />
                  </div>

                  <div class="pd-search-card-content">
                    <h4 class="pd-search-card-title">{{ product.name }}</h4>
                    <p class="pd-search-card-desc">{{ product.description }}</p>

                    <div class="pd-search-stars">
                      <span v-for="n in 5" :key="n">★</span>
                    </div>

                    <p class="pd-search-price">RD${{ formatPrice(product.priceRD) }}</p>
                  </div>
                </article>
              </div>

              <div v-else class="pd-search-empty">
                No se encontraron productos con “{{ searchText || '...' }}”.
              </div>
            </div>

            <aside class="pd-search-sidebar pd-border">
              <div>
                <h4 class="pd-search-side-title">POPULAR SEARCHES</h4>
                <button
                  v-for="term in popularSearches"
                  :key="term"
                  class="pd-search-side-link"
                  type="button"
                  @click="applyPopularSearch(term)"
                >
                  {{ term }}
                </button>
              </div>

              <div class="mt-10">
                <h4 class="pd-search-side-title">CATEGORIES</h4>
                <button
                  v-for="cat in searchCategories"
                  :key="cat"
                  class="pd-search-side-link"
                  type="button"
                  @click="applyPopularSearch(cat)"
                >
                  {{ cat }}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </transition>

    <!-- MAIN -->
    <main class="max-w-[1200px] mx-auto px-6">
      <!-- HERO -->
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
              @click="router.push('/tienda')"
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
                  type="button"
                  class="mt-2 inline-flex items-center gap-1 pd-link font-bold text-sm"
                  @click="router.push('/quiz')"
                >
                  Start Skin Quiz
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
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
      <section class="mt-10" ref="bestSellersRef">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-xl">Best Sellers</h3>
          <RouterLink class="pd-link font-semibold text-sm hover:underline" to="/tienda">
            View All
          </RouterLink>
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
              <button class="pd-fab-mini" type="button" @click="addToCart(productCatalogMap['cerave-moisturizing-cream'])">
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
              <button class="pd-fab-mini" type="button" @click="addToCart(productCatalogMap['lrp-hyalu-b5'])">
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
              <button class="pd-fab-mini" type="button" @click="addToCart(productCatalogMap['pharmaderm-mineral-sunscreen'])">
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
            <button class="mt-4 pd-pill" type="button" @click="goToBrand('cerave')">Shop Brand</button>
            <img
              class="absolute -right-6 -bottom-6 w-28 h-28 rotate-12 opacity-25"
              alt="Brand"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwtfGO-I4erKLFtXOv-4TOQp-XiTy9K_KV-rh32gbQiR8gL-N0oUP6CAI3GjiG6nLU1lPVrBCkvAuEApmM04jlhaEnPLfXKIbf7xNMENVdcVRbH0lrG8muhGnLz_fI2kXR-BrHD4m_YgCBOAjhOuRnFtJ73rL6pEbmdxFhz_qpc7_Fkx3B7XvnKcjvtBeLGOoFjPd8MNefQYNoZkfyubW6TxYJuPTLwWJkYqF5paRJ_E8IHHCdM3LOj4TAMmiUiTsXSOELaRPRg48"
            />
          </div>

          <div class="pd-brandcard-b rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
            <span class="text-[10px] uppercase tracking-widest opacity-80 font-bold">Premium Care</span>
            <h4 class="text-2xl font-extrabold mt-2">La Roche-Posay</h4>
            <button class="mt-4 pd-pill" type="button" @click="goToBrand('larocheposay')">Shop Brand</button>
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

          <button
            class="mt-6 w-full max-w-xl mx-auto py-4 rounded-xl pd-primary text-white font-bold shadow-lg"
            type="button"
            @click="router.push('/Diagnostics')"
          >
            Book Appointment
          </button>
        </div>
      </section>
    </main>

    <!-- DARK MODE BUTTON -->
    <button
      class="fixed right-6 bottom-[120px] pd-surface p-3 rounded-full shadow-xl pd-border z-40"
      type="button"
      aria-label="Toggle dark mode"
      @click="toggleDark"
    >
      <span class="material-symbols-outlined pd-toggleicon">
        {{ isDark ? "light_mode" : "dark_mode" }}
      </span>
    </button>

    <!-- BOTTOM NAV -->
    <nav class="fixed bottom-0 left-0 right-0 pd-surface pd-border-t px-6 py-3 flex justify-between items-center z-50">
      <RouterLink to="/inicio" class="pd-navitem" :class="{ active: isActive('/inicio') }" aria-label="Home">
        <span class="material-symbols-outlined">home</span>
        <p>Home</p>
      </RouterLink>

      <RouterLink to="/tienda" class="pd-navitem" :class="{ active: isActive('/tienda') }" aria-label="Shop">
        <span class="material-symbols-outlined">grid_view</span>
        <p>Shop</p>
      </RouterLink>

      <RouterLink to="/diagnostics" class="pd-navcenter" :class="{ active: isActive('/diagnostics') }" aria-label="Diagnostics">
        <div class="pd-fab">
          <span class="material-symbols-outlined">stethoscope</span>
        </div>
        <p>Diagnostics</p>
      </RouterLink>

      <button
        type="button"
        class="pd-navitem pd-nav-button"
        :class="{ active: isActive('/diagnostics') }"
        aria-label="Routine"
        @click="router.push('/diagnostics')"
      >
        <span class="material-symbols-outlined">local_hospital</span>
        <p>Routine</p>
      </button>

      <RouterLink to="/perfil" class="pd-navitem" :class="{ active: isActive('/profile') || isActive('/perfil') }" aria-label="Profile">
        <span class="material-symbols-outlined">person</span>
        <p>Profile</p>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";

const route = useRoute();
const router = useRouter();

const isDark = ref(false);
const showProfilePanel = ref(false);
const showSearchOverlay = ref(false);
const searchText = ref("");
const searchInputRef = ref(null);
const bestSellersRef = ref(null);

const defaultUser = {
  name: "Shiara",
  email: "hilarioluna.sh@gmail.com",
  avatar: "https://i.pinimg.com/736x/8d/45/29/8d452972b91132da7fd5e07b533ee2dd.jpg",
};

const fallbackAccounts = [
  {
    name: "SHIARA HILARIO LUNA",
    email: "2220012@ipisa.edu.do",
    avatar: "",
  },
];

const currentUser = ref({ ...defaultUser });
const linkedAccounts = ref([...fallbackAccounts]);

const productCatalog = ref([
  {
    id: "cerave-moisturizing-cream",
    brand: "cerave",
    name: "Moisturizing Cream",
    description: "Barrier-repair moisturizer for dry to very dry skin.",
    priceRD: 1250,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAk22qtYBeco0iYwHtPMKk7rtuRnJ3_M0lJeFY4fyMlih9jA8MKOAKmkPlc2AHy4BtlEppd00ZpCwGLI8PAz1l2IKVeT-mpMqMT2WbSfUNUbb3bGFG4gaCHLs3vJNmYVrXPR0TbXPdyZF55S08KSeb1VZc1ahNmRKbA2s0EqNZJEgjQk_xaWqO8-QTr_hxUjHXWpmH37Td7XIFQU6nv-fchJ6niWbJAoSrZ3WTdi-qdGU1fbFhMr0WZ-SMdH6tzfCHzFEbJQ-ORMds",
    routeBrand: "cerave",
    keywords: ["cerave", "cream", "moisturizer", "dry skin", "barrier"],
  },
  {
    id: "lrp-hyalu-b5",
    brand: "larocheposay",
    name: "Hyalu B5 Serum",
    description: "Hydrating anti-aging serum with hyaluronic acid and vitamin B5.",
    priceRD: 2400,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMMlDIqmWLn_g7u4DLf32ffJ_h7LXEhd3iezdcAYWpk1nH2ULAE-sjIHl30kUmcN1eLFus8MN41AaIkGr4-Za_7vNUyWqqQyQiVhP2E41vFNm73DuxgaB7JcTvd8WY0cSjUVzIcb6hDFzk3w6W9zsJsgIDtgzwaCZDdenS9IR_ZAgHJUVH_aX4o0O7VEwEfVNrQRiE2Qn1FdXcCLF6Jp1SAnuUDEThlt8UF7zh2c_nMiSW8Y-Ni7M7TyGW4hsVgWnM5ZBlZ_YdWew",
    routeBrand: "larocheposay",
    keywords: ["la roche posay", "hyalu", "b5", "serum", "hydration"],
  },
  {
    id: "pharmaderm-mineral-sunscreen",
    brand: "pharmaderm",
    name: "Mineral Sunscreen",
    description: "Lightweight mineral sunscreen for daily UV protection.",
    priceRD: 950,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbfVBf8Eu8akiwraLwYqTMMlcs01tKQIItr4Z7ayqemmLg1ywZ_4dM3gHDVcfuZH_Sh6x-oDwExpO_aN-oKkUyhHwcK5ejECCvTzJZyOA6p7qaPmaRY0WoYQVTHH-4aiazW4EhFpYqFGIy544oqImpT1QAv94WemcrKMsC554wVOoqj5iT_ZsCgMZF4p0f8ZdqGhYv4h_2bfdC9fUplWGarfSzlIquHFcrSBdqxNEz0L47SFdwmlpU7lk5P0TG-wSz6W17c03TBrA",
    routeBrand: "pharmaderm",
    keywords: ["sunscreen", "spf", "uv", "mineral"],
  },
  {
    id: "lrp-toleriane-cleanser",
    brand: "larocheposay",
    name: "Toleriane Purifying Foaming Cleanser",
    description: "Cleanser for normal to oily sensitive skin.",
    priceRD: 1650,
    image: "https://www.laroche-posay.us/on/demandware.static/-/Sites-lrp-us-Library/default/dwca0057bf/plp/toleriane-purifying-foaming-cleanser.png",
    routeBrand: "larocheposay",
    keywords: ["toleriane", "cleanser", "foaming", "purifying", "sensitive skin"],
  },
  {
    id: "lrp-toleriane-double-repair",
    brand: "larocheposay",
    name: "Toleriane Double Repair Face Moisturizer",
    description: "Face moisturizer for sensitive skin and barrier support.",
    priceRD: 2100,
    image: "https://www.laroche-posay.us/on/demandware.static/-/Sites-lrp-us-Library/default/dw9d4c4a2c/plp/toleriane-double-repair-face-moisturizer.png",
    routeBrand: "larocheposay",
    keywords: ["toleriane", "double repair", "moisturizer", "face", "sensitive skin"],
  },
  {
    id: "lrp-cicaplast-b5",
    brand: "larocheposay",
    name: "Cicaplast Balm B5+",
    description: "Soothing balm for dry, irritated and compromised skin.",
    priceRD: 1650,
    image: "https://www.laroche-posay.us/on/demandware.static/-/Sites-lrp-us-Library/default/dw0e5a1e37/plp/cicaplast-balm-b5.png",
    routeBrand: "larocheposay",
    keywords: ["cicaplast", "b5", "balm", "repair", "soothing"],
  },
  {
    id: "lrp-effaclar-duo",
    brand: "larocheposay",
    name: "Effaclar Duo",
    description: "Acne treatment for blemishes and oily skin.",
    priceRD: 1750,
    image: "https://www.laroche-posay.us/on/demandware.static/-/Sites-lrp-us-Library/default/dw53bf72c6/plp/effaclar-duo.png",
    routeBrand: "larocheposay",
    keywords: ["effaclar", "acne", "treatment", "oily skin"],
  },
]);

const productCatalogMap = computed(() =>
  Object.fromEntries(productCatalog.value.map((p) => [p.id, p]))
);

const popularSearches = ["sunscreen", "cicaplast", "moisturizer", "b5", "effaclar"];
const searchCategories = ["Toleriane", "Serums", "Moisturizers", "Sunscreens"];

const searchMatches = computed(() => {
  const q = searchText.value.trim().toLowerCase();

  if (!q) {
    return productCatalog.value.slice(0, 3);
  }

  return productCatalog.value
    .filter((product) => {
      const haystack = [
        product.name,
        product.brand,
        product.description,
        ...(product.keywords || []),
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(q);
    })
    .slice(0, 6);
});

const cartCount = computed(() => {
  try {
    const cart = JSON.parse(localStorage.getItem("pharmaderm_cart") || "[]");
    return cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  } catch {
    return 0;
  }
});

const currentInitial = computed(() => {
  return (currentUser.value.name || currentUser.value.email || "U").charAt(0).toUpperCase();
});

onMounted(() => {
  const saved = localStorage.getItem("pd_dark");
  isDark.value = saved === "1";

  loadUserSession();
});

const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("pd_dark", isDark.value ? "1" : "0");
};

const isActive = (path) => route.path === path;

const loadUserSession = () => {
  try {
    const savedUser = JSON.parse(localStorage.getItem("pharmaderm_user") || "null");
    const savedAccounts = JSON.parse(localStorage.getItem("pharmaderm_accounts") || "null");

    if (savedUser) {
      currentUser.value = {
        name: savedUser.name || "Shiara",
        email: savedUser.email || "hilarioluna.sh@gmail.com",
        avatar: savedUser.avatar || defaultUser.avatar,
      };
    }

    if (savedAccounts && Array.isArray(savedAccounts) && savedAccounts.length) {
      linkedAccounts.value = savedAccounts;
    }
  } catch {
    currentUser.value = { ...defaultUser };
    linkedAccounts.value = [...fallbackAccounts];
  }
};

const toggleProfilePanel = () => {
  showProfilePanel.value = !showProfilePanel.value;
  if (showProfilePanel.value) {
    showSearchOverlay.value = false;
  }
};

const openSearch = async () => {
  showSearchOverlay.value = true;
  showProfilePanel.value = false;
  await nextTick();
  searchInputRef.value?.focus();
};

const closeSearch = () => {
  showSearchOverlay.value = false;
};

const handleRootClick = () => {
  showProfilePanel.value = false;
};

const goToBrand = (brand) => {
  router.push({ path: "/tienda", query: { brand } });
};

const formatPrice = (n) => {
  return Number(n || 0).toLocaleString("en-US");
};

const applyPopularSearch = (term) => {
  searchText.value = term;
};

const viewAllSearchResults = () => {
  router.push({
    path: "/tienda",
    query: {
      search: searchText.value || "",
    },
  });
  closeSearch();
};

const openProductSearch = (product) => {
  router.push({
    path: "/tienda",
    query: {
      brand: product.routeBrand === "pharmaderm" ? undefined : product.routeBrand,
      search: product.name,
    },
  });
  closeSearch();
};

const addToCart = (product) => {
  if (!product) return;

  try {
    const cart = JSON.parse(localStorage.getItem("pharmaderm_cart") || "[]");
    const index = cart.findIndex((item) => item.id === product.id);

    if (index >= 0) {
      cart[index].quantity = (cart[index].quantity || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        priceRD: product.priceRD,
        image: product.image,
        quantity: 1,
        brand: product.brand,
      });
    }

    localStorage.setItem("pharmaderm_cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

const goToCart = () => {
  router.push("/carrito");
};

const logout = () => {
  localStorage.removeItem("pharmaderm_user");
  showProfilePanel.value = false;
  currentUser.value = { ...defaultUser };
  router.push("/login");
};

const scrollToBestSellers = () => {
  closeSearch();
  nextTick(() => {
    bestSellersRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
};
</script>

<style scoped>
.pd-root {
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
  --toggle: #475569;
  --overlay: rgba(248, 250, 252, 0.97);
}

.pd-dark.pd-root {
  --bg: #0b1220;
  --text: #e5e7eb;
  --muted: #9aa7ba;
  --surface: rgba(10, 18, 32, 0.92);
  --card: #0f1a2e;
  --soft: #0a162a;
  --border: #1c2b44;
  --brand: #8cc7ff;
  --link: #66d6ff;
  --accent: #9be15d;
  --banner: #0f3a57;
  --price: #cfe9ff;
  --cta-bg: #0f1a2e;
  --cta-text: #cfe9ff;
  --primary: #183a6b;
  --nav-inactive: #6f8099;
  --nav-active: #66d6ff;
  --fab: #1f4b86;
  --fab-ring: #0b1220;
  --toggle: #fbbf24;
  --overlay: rgba(11, 18, 32, 0.98);
}

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

.pd-fab-mini {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: var(--fab);
  color: #fff;
  display: grid;
  place-items: center;
}

.pd-toggleicon { color: var(--toggle); }

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

.pd-nav-button {
  background: transparent;
  border: none;
  cursor: pointer;
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

.pd-badge {
  position: absolute;
  top: 0;
  right: -2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 800;
  display: grid;
  place-items: center;
}

/* PANEL PERFIL */
.pd-account-panel {
  position: absolute;
  right: 0;
  top: calc(100% + 14px);
  width: 380px;
  max-width: calc(100vw - 24px);
  background: var(--card);
  border-radius: 26px;
  overflow: hidden;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.18);
  z-index: 120;
}

.pd-account-top {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 18px 22px 6px;
}

.pd-account-email {
  font-size: 15px;
  font-weight: 700;
  color: var(--text);
}

.pd-account-close {
  position: absolute;
  right: 16px;
  top: 12px;
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
}

.pd-account-main {
  text-align: center;
  padding: 8px 22px 18px;
}

.pd-account-avatar-wrap {
  display: flex;
  justify-content: center;
  margin-top: 2px;
}

.pd-account-avatar {
  width: 86px;
  height: 86px;
  border-radius: 999px;
  object-fit: cover;
  border: 3px solid #ffffff;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.pd-account-avatar-fallback {
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--brand), var(--link));
  color: #fff;
  font-weight: 900;
  font-size: 28px;
}

.pd-account-greeting {
  margin-top: 14px;
  font-size: 20px;
  font-weight: 500;
}

.pd-account-manage {
  margin-top: 14px;
  border: 1px solid var(--border);
  background: transparent;
  color: #1d4ed8;
  padding: 12px 18px;
  border-radius: 999px;
  font-weight: 700;
  width: 100%;
  max-width: 270px;
}

.pd-account-list {
  padding: 0 16px 16px;
}

.pd-account-list-title {
  background: color-mix(in srgb, var(--soft) 76%, white);
  border-radius: 16px;
  padding: 16px 18px;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 700;
}

.pd-account-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 14px;
  background: color-mix(in srgb, var(--soft) 82%, white);
  margin-top: 4px;
}

.pd-account-item-avatar {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: #e5e7eb;
  color: #334155;
  display: grid;
  place-items: center;
  font-weight: 800;
  overflow: hidden;
  flex-shrink: 0;
}

.pd-account-item-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pd-account-item-name {
  margin: 0;
  font-size: 14px;
  font-weight: 700;
}

.pd-account-item-email {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
}

.pd-account-action {
  width: 100%;
  margin-top: 6px;
  border: none;
  background: color-mix(in srgb, var(--soft) 82%, white);
  border-radius: 14px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  color: var(--text);
}

/* SEARCH OVERLAY */
.pd-search-overlay {
  position: fixed;
  inset: 0;
  background: var(--overlay);
  z-index: 110;
  overflow-y: auto;
}

.pd-search-shell {
  min-height: 100vh;
}

.pd-search-top {
  position: sticky;
  top: 0;
  z-index: 2;
}

.pd-search-nav {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 0 0 16px;
  min-height: 68px;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
}

.pd-search-nav-item {
  background: transparent;
  border: none;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--text);
  white-space: nowrap;
}

.pd-search-close {
  margin-left: auto;
  min-width: 210px;
  align-self: stretch;
  border: none;
  border-left: 1px solid var(--border);
  background: color-mix(in srgb, var(--link) 18%, white);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
}

.pd-search-head {
  border-bottom: 1px solid var(--border);
  padding: 24px 14px 28px;
}

.pd-search-input-wrap {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 42px;
  line-height: 1.15;
}

.pd-search-leading {
  color: #475569;
  font-weight: 300;
}

.pd-search-input {
  border: none;
  outline: none;
  background: transparent;
  color: var(--text);
  font-size: 42px;
  font-weight: 600;
  min-width: 260px;
  flex: 1;
}

.pd-search-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 28px;
  padding: 36px 14px 50px;
}

.pd-search-results-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}

.pd-search-results-head h3 {
  margin: 0;
  font-size: 18px;
  letter-spacing: 0.02em;
  font-weight: 700;
}

.pd-view-all {
  background: transparent;
  border: none;
  text-decoration: underline;
  color: var(--text);
  font-size: 14px;
}

.pd-search-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 26px;
}

.pd-search-card {
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 18px;
  cursor: pointer;
}

.pd-search-card-imagewrap {
  background: white;
  min-height: 150px;
  display: grid;
  place-items: center;
}

.pd-dark .pd-search-card-imagewrap {
  background: #111827;
}

.pd-search-card-image {
  width: 100%;
  max-width: 120px;
  max-height: 140px;
  object-fit: contain;
}

.pd-search-card-title {
  margin: 0 0 10px;
  font-size: 18px;
  line-height: 1.15;
  font-weight: 900;
  text-transform: uppercase;
}

.pd-search-card-desc {
  margin: 0 0 10px;
  color: #475569;
  font-size: 14px;
  line-height: 1.4;
}

.pd-dark .pd-search-card-desc {
  color: #9aa7ba;
}

.pd-search-stars {
  color: #0ea5e9;
  letter-spacing: 2px;
  font-size: 14px;
  margin-bottom: 10px;
}

.pd-search-price {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.pd-search-sidebar {
  background: rgba(255, 255, 255, 0.75);
  padding: 28px 28px 32px;
  align-self: start;
}

.pd-dark .pd-search-sidebar {
  background: rgba(15, 26, 46, 0.88);
}

.pd-search-side-title {
  margin: 0 0 18px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
}

.pd-search-side-link {
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 8px 0;
  font-size: 16px;
  color: var(--text);
}

.pd-search-empty {
  padding: 30px;
  border: 1px dashed var(--border);
  border-radius: 18px;
  color: var(--muted);
  font-weight: 700;
}

/* ANIMACIONES */
.pd-fade-scale-enter-active,
.pd-fade-scale-leave-active {
  transition: all 0.18s ease;
}
.pd-fade-scale-enter-from,
.pd-fade-scale-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.pd-search-fade-enter-active,
.pd-search-fade-leave-active {
  transition: opacity 0.2s ease;
}
.pd-search-fade-enter-from,
.pd-search-fade-leave-to {
  opacity: 0;
}

/* RESPONSIVE */
@media (max-width: 1100px) {
  .pd-search-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 900px) {
  .pd-search-body {
    grid-template-columns: 1fr;
  }

  .pd-search-sidebar {
    order: -1;
  }
}

@media (max-width: 720px) {
  .pd-account-panel {
    right: -8px;
    width: min(380px, calc(100vw - 18px));
  }

  .pd-search-input-wrap,
  .pd-search-input {
    font-size: 26px;
  }

  .pd-search-grid {
    grid-template-columns: 1fr;
  }

  .pd-search-card {
    grid-template-columns: 120px minmax(0, 1fr);
  }

  .pd-search-close {
    min-width: 120px;
  }
}
</style>
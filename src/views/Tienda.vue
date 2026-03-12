<template>
  <div class="app-shell pb-[120px]">
    <!-- HEADER -->
    <header class="header">
      <div class="container header__row">
        <div class="brand">
          <!-- TU LOGO SIN FONDO (YA LO PUSISTE MANUAL) -->
          <img
            :src="logoSrc"
            class="brand__logo"
            alt="PharmaDerm Logo"
          />
          <h1 class="brand__title">
            PharmaDerm<span class="brand__accent">RD</span>
          </h1>
        </div>

        <div class="header__actions">
          <button class="icon-btn" type="button" aria-label="Search">
            <span class="material-symbols-outlined">search</span>
          </button>
          <button class="icon-btn" type="button" aria-label="Cart" @click="$router.push('/carrito')">
            <span class="material-symbols-outlined">shopping_bag</span>
          </button>
          <button class="icon-btn" type="button" aria-label="Profile" @click="$router.push('/perfil')">
            <span class="material-symbols-outlined">person</span>
          </button>
        </div>
      </div>

      <div class="topbar">
        <p class="topbar__text">
          Free shipping on orders over RD$3,000 • Shop Now
        </p>
      </div>
    </header>

    <!-- MAIN -->
    <main class="container store">
      <!-- TITLE ROW (como LRP) -->
      <section class="store__title">
        <div class="crumbs">
          <span class="crumb" @click="$router.push('/inicio')">Home</span>
          <span class="sep">›</span>
          <span class="crumb">Our Products</span>
          <span class="sep">›</span>
          <span class="crumb active">{{ activeBrandLabel }}</span>
        </div>

        <div class="title-row">
          <div class="title-left">
            <h2 class="h1">{{ activeBrandLabel.toUpperCase() }}</h2>
            <p class="subtitle">
              Dermatologist recommended skincare. Browse by line, concern, and type.
            </p>
          </div>

          <div class="title-right">
            <div class="count">
              <span class="count__num">{{ filteredProducts.length }}</span>
              <span class="count__txt">products</span>
            </div>

            <div class="sort">
              <span class="sort__label">Sort by</span>
              <select v-model="sortBy" class="select">
                <option value="best">Best Sellers</option>
                <option value="priceAsc">Price (Low to High)</option>
                <option value="priceDesc">Price (High to Low)</option>
                <option value="az">Alphabetically (A-Z)</option>
                <option value="za">Alphabetically (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- BRAND TOGGLE (CeraVe / La Roche-Posay) -->
        <div class="brand-tabs">
          <button
            class="tab"
            :class="{ 'tab--active': activeBrand === 'larocheposay' }"
            type="button"
            @click="setBrand('larocheposay')"
          >
            La Roche-Posay
          </button>
          <button
            class="tab"
            :class="{ 'tab--active': activeBrand === 'cerave' }"
            type="button"
            @click="setBrand('cerave')"
          >
            CeraVe
          </button>
        </div>
      </section>

      <section class="store__grid">
        <!-- FILTERS SIDEBAR (independiente de la barra inferior) -->
        <aside class="filters">
          <div class="filters__header">
            <h3 class="filters__title">Filter by</h3>

            <button class="link-btn" type="button" @click="resetFilters">
              Reset
            </button>
          </div>

          <!-- Search inside filters -->
          <div class="filter-card">
            <h4 class="filter-card__title">Search</h4>
            <input
              v-model.trim="filterSearch"
              class="input"
              type="text"
              placeholder="Search products..."
            />
          </div>

          <!-- Price -->
          <div class="filter-card">
            <h4 class="filter-card__title">Price</h4>
            <div class="price-grid">
              <div>
                <label class="label">Min</label>
                <input v-model.number="priceMin" class="input" type="number" min="0" placeholder="0" />
              </div>
              <div>
                <label class="label">Max</label>
                <input v-model.number="priceMax" class="input" type="number" min="0" placeholder="999" />
              </div>
            </div>
          </div>

          <!-- Product Line -->
          <div class="filter-card">
            <h4 class="filter-card__title">Product Line</h4>
            <div class="checklist">
              <label v-for="line in availableLines" :key="line" class="check">
                <input
                  type="checkbox"
                  :value="line"
                  v-model="selectedLines"
                />
                <span>{{ line }}</span>
              </label>
            </div>
          </div>

          <!-- Skin Concern -->
          <div class="filter-card">
            <h4 class="filter-card__title">Skin Concern</h4>
            <div class="checklist">
              <label v-for="c in availableConcerns" :key="c" class="check">
                <input
                  type="checkbox"
                  :value="c"
                  v-model="selectedConcerns"
                />
                <span>{{ c }}</span>
              </label>
            </div>
          </div>

          <!-- Product Type -->
          <div class="filter-card">
            <h4 class="filter-card__title">Type</h4>
            <div class="checklist">
              <label v-for="t in availableTypes" :key="t" class="check">
                <input
                  type="checkbox"
                  :value="t"
                  v-model="selectedTypes"
                />
                <span>{{ t }}</span>
              </label>
            </div>
          </div>
        </aside>

        <!-- PRODUCTS -->
        <div class="products">
          <div class="products__top">
            <h3 class="h2">Best Sellers</h3>
            <button class="link-btn" type="button" @click="resetFilters">
              View All
            </button>
          </div>

          <div class="cards">
            <article
              v-for="p in sortedProducts"
              :key="p.id"
              class="card"
            >
              <div class="card__media">
                <img :src="p.image" :alt="p.name" class="card__img" />

                <button class="fav" type="button" aria-label="Favorite" @click="toggleFav(p.id)">
                  <span class="material-symbols-outlined">
                    {{ favorites.has(p.id) ? 'favorite' : 'favorite' }}
                  </span>
                </button>
              </div>

              <div class="card__body">
                <p class="brandline">{{ p.brandLabel }}</p>
                <h4 class="card__name">{{ p.name }}</h4>

                <div class="meta">
                  <div class="stars" aria-label="rating">
                    <span v-for="n in 5" :key="n">★</span>
                  </div>
                  <span class="rating">{{ p.rating.toFixed(1) }} ({{ p.reviews }})</span>
                </div>

                <!-- SIZE dinámico por producto -->
                <div class="size-row" v-if="p.sizes?.length">
                  <label class="size-row__label">Size</label>
                  <select v-model="selectedSize[p.id]" class="select select--small">
                    <option
                      v-for="s in p.sizes"
                      :key="s"
                      :value="s"
                    >
                      {{ s }}
                    </option>
                  </select>
                </div>

                <div class="card__foot">
                  <span class="price">RD${{ formatPrice(p.priceRD) }}</span>
                  <button class="add" type="button" @click="addToCart(p)">
                    <span class="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>
            </article>

            <div v-if="sortedProducts.length === 0" class="empty">
              No products match your filters.
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- FLOAT DARK MODE BUTTON -->
    <button
      class="dark-fab"
      type="button"
      aria-label="Toggle dark mode"
      @click="toggleDark"
    >
      <span class="material-symbols-outlined">
        {{ isDark ? 'light_mode' : 'dark_mode' }}
      </span>
    </button>

    <!-- BOTTOM NAV -->
    <nav class="bottom-nav">
      <RouterLink class="nav-item" to="/inicio">
        <span class="material-symbols-outlined">home</span>
        <p>Home</p>
      </RouterLink>

      <RouterLink class="nav-item" to="/tienda">
        <span class="material-symbols-outlined">grid_view</span>
        <p>Shop</p>
      </RouterLink>

      <RouterLink class="nav-center" to="/coleccion">
        <div class="nav-center__btn">
          <span class="material-symbols-outlined">stethoscope</span>
        </div>
        <p>Diagnostics</p>
      </RouterLink>

      <RouterLink class="nav-item" to="/quiz">
        <span class="material-symbols-outlined">local_hospital</span>
        <p>Routine</p>
      </RouterLink>

      <RouterLink class="nav-item" to="/perfil">
        <span class="material-symbols-outlined">person</span>
        <p>Profile</p>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

/** ====== DARK MODE (sin Tailwind) ====== */
const isDark = ref(false);

const applyDarkClass = (val) => {
  const html = document.documentElement;
  if (val) html.classList.add("dark");
  else html.classList.remove("dark");
};

const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("pharmaderm_dark", isDark.value ? "1" : "0");
  applyDarkClass(isDark.value);
};

/** ====== LOGO (ya lo cambiaste a PNG sin fondo) ====== */
const logoSrc = ref(
  // cambia esto por tu ruta/local o url final si ya lo pusiste
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCwGk1ZsXrDiVM1y4eYkFkLAVJyj3SEQtwpa9gS41xgybM4JsMSUQU1bAYKb4aviIWmG2GtMVM1nQrg4rTEm3bi80sHtcf-M6xSUCR2ua9YOhGfPNVmoJhBG1zcuzQq8mODOnwTQihKFT5tQ_dy8FM8IC-Z12rIEybnyvjZd3JctWEFO86kmHZonJMxnQG6HrfgLFeTwIK6wsY-4PKy7LSaqAD3iJEqDxf2JVzH6t5Aj5cneE7Af9KkyxdLRTwpToy3oqVFRaMPLFs"
);

/** ====== BRAND SWITCH ====== */
const activeBrand = ref("larocheposay"); // 'larocheposay' | 'cerave'
const activeBrandLabel = computed(() =>
  activeBrand.value === "larocheposay" ? "La Roche-Posay" : "CeraVe"
);

const setBrand = (b) => {
  activeBrand.value = b;
  router.replace({ path: "/tienda", query: { brand: b } });
  resetFilters();
};

/** ====== DATA ======
 *  Nota: aquí mantenemos una lista decente de LRP + algunos CeraVe (puedes ampliar).
 *  sizes: array por producto (NO fijo).
 */
const products = ref([
  // ===== La Roche-Posay =====
  {
    id: "lrp-hyalu-b5",
    brand: "larocheposay",
    brandLabel: "LA ROCHE-POSAY",
    line: "Hyalu B5",
    concerns: ["Dry Skin", "Fine Lines & Wrinkles", "Sensitivity"],
    type: "Serum",
    name: "Hyalu B5 Pure Hyaluronic Acid Serum",
    priceRD: 2400,
    rating: 4.4,
    reviews: 1421,
    sizes: ["30ML", "50ML"],
    bestSeller: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMMlDIqmWLn_g7u4DLf32ffJ_h7LXEhd3iezdcAYWpk1nH2ULAE-sjIHl30kUmcN1eLFus8MN41AaIkGr4-Za_7vNUyWqqQyQiVhP2E41vFNm73DuxgaB7JcTvd8WY0cSjUVzIcb6hDFzk3w6W9zsJsgIDtgzwaCZDdenS9IR_ZAgHJUVH_aX4o0O7VEwEfVNrQRiE2Qn1FdXcCLF6Jp1SAnuUDEThlt8UF7zh2c_nMiSW8Y-Ni7M7TyGW4hsVgWnM5ZBlZ_YdWew",
  },
  {
    id: "lrp-mela-b3",
    brand: "larocheposay",
    brandLabel: "LA ROCHE-POSAY",
    line: "Mela B3",
    concerns: ["Dark Spots", "Uneven Skin Tone", "Sensitivity"],
    type: "Serum",
    name: "Mela B3 Dark Spot Serum",
    priceRD: 2950,
    rating: 4.5,
    reviews: 980,
    sizes: ["30ML", "50ML"],
    bestSeller: false,
    image:
      "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lrp-us-Library/default/dwd2f5fd78/images/plp/placeholder.png",
  },
  {
    id: "lrp-toleriane-uv",
    brand: "larocheposay",
    brandLabel: "LA ROCHE-POSAY",
    line: "Toleriane",
    concerns: ["Sensitive Skin", "UV Protection", "Dry Skin"],
    type: "Moisturizer",
    name: "Toleriane Double Repair Face Moisturizer UV SPF 30",
    priceRD: 2100,
    rating: 4.4,
    reviews: 1421,
    sizes: ["100ML", "40ML"],
    bestSeller: true,
    image:
      "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lrp-us-Library/default/dwd2f5fd78/images/plp/placeholder.png",
  },
  {
    id: "lrp-cicaplast-b5",
    brand: "larocheposay",
    brandLabel: "LA ROCHE-POSAY",
    line: "Cicaplast",
    concerns: ["Dry/Damaged", "Sensitive Skin"],
    type: "Balm",
    name: "Cicaplast Balm B5+",
    priceRD: 1650,
    rating: 4.7,
    reviews: 5200,
    sizes: ["40ML", "100ML"],
    bestSeller: true,
    image:
      "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lrp-us-Library/default/dwd2f5fd78/images/plp/placeholder.png",
  },
  {
    id: "lrp-effaclar-duo",
    brand: "larocheposay",
    brandLabel: "LA ROCHE-POSAY",
    line: "Effaclar",
    concerns: ["Acne Prone", "Oily Skin"],
    type: "Treatment",
    name: "Effaclar Duo Acne Spot Treatment",
    priceRD: 1750,
    rating: 4.3,
    reviews: 3900,
    sizes: ["40ML"],
    bestSeller: true,
    image:
      "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lrp-us-Library/default/dwd2f5fd78/images/plp/placeholder.png",
  },
  {
    id: "lrp-anthelios-fluid",
    brand: "larocheposay",
    brandLabel: "LA ROCHE-POSAY",
    line: "Anthelios",
    concerns: ["UV Protection", "Sensitive Skin"],
    type: "Sunscreen",
    name: "Anthelios Ultra-Light Fluid Facial Sunscreen SPF 60",
    priceRD: 2200,
    rating: 4.6,
    reviews: 3652,
    sizes: ["50ML"],
    bestSeller: true,
    image:
      "https://www.laroche-posay.us/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-lrp-us-Library/default/dwd2f5fd78/images/plp/placeholder.png",
  },

  // ===== CeraVe (placeholder para el toggle) =====
  {
    id: "cerave-moisturizing-cream",
    brand: "cerave",
    brandLabel: "CERAVE",
    line: "Moisturizers",
    concerns: ["Dry Skin", "Sensitive Skin"],
    type: "Moisturizer",
    name: "Moisturizing Cream",
    priceRD: 1250,
    rating: 4.7,
    reviews: 9000,
    sizes: ["340G", "454G"],
    bestSeller: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAk22qtYBeco0iYwHtPMKk7rtuRnJ3_M0lJeFY4fyMlih9jA8MKOAKmkPlc2AHy4BtlEppd00ZpCwGLI8PAz1l2IKVeT-mpMqMT2WbSfUNUbb3bGFG4gaCHLs3vJNmYVrXPR0TbXPdyZF55S08KSeb1VZc1ahNmRKbA2s0EqNZJEgjQk_xaWqO8-QTr_hxUjHXWpmH37Td7XIFQU6nv-fchJ6niWbJAoSrZ3WTdi-qdGU1fbFhMr0WZ-SMdH6tzfCHzFEbJQ-ORMds",
  },
]);

/** ====== Filters state ====== */
const filterSearch = ref("");
const priceMin = ref(null);
const priceMax = ref(null);

const selectedLines = ref([]);
const selectedConcerns = ref([]);
const selectedTypes = ref([]);

const sortBy = ref("best");

/** ====== Favorites & size selection ====== */
const favorites = ref(new Set());
const selectedSize = reactive({});

/** ====== Derived lists (según marca actual) ====== */
const brandProducts = computed(() =>
  products.value.filter((p) => p.brand === activeBrand.value)
);

const availableLines = computed(() => {
  const set = new Set(brandProducts.value.map((p) => p.line).filter(Boolean));
  return Array.from(set).sort();
});

const availableConcerns = computed(() => {
  const set = new Set();
  brandProducts.value.forEach((p) => (p.concerns || []).forEach((c) => set.add(c)));
  return Array.from(set).sort();
});

const availableTypes = computed(() => {
  const set = new Set(brandProducts.value.map((p) => p.type).filter(Boolean));
  return Array.from(set).sort();
});

/** ====== Filtering ====== */
const filteredProducts = computed(() => {
  const q = filterSearch.value.toLowerCase();

  return brandProducts.value.filter((p) => {
    // search
    if (q) {
      const hay = `${p.name} ${p.brandLabel} ${p.line} ${(p.concerns || []).join(" ")} ${p.type}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    // price
    if (priceMin.value != null && priceMin.value !== "" && p.priceRD < priceMin.value) return false;
    if (priceMax.value != null && priceMax.value !== "" && p.priceRD > priceMax.value) return false;

    // lines
    if (selectedLines.value.length > 0 && !selectedLines.value.includes(p.line)) return false;

    // concerns
    if (selectedConcerns.value.length > 0) {
      const pc = p.concerns || [];
      const ok = selectedConcerns.value.some((c) => pc.includes(c));
      if (!ok) return false;
    }

    // types
    if (selectedTypes.value.length > 0 && !selectedTypes.value.includes(p.type)) return false;

    return true;
  });
});

/** ====== Sorting ====== */
const sortedProducts = computed(() => {
  const arr = [...filteredProducts.value];

  switch (sortBy.value) {
    case "priceAsc":
      arr.sort((a, b) => a.priceRD - b.priceRD);
      break;
    case "priceDesc":
      arr.sort((a, b) => b.priceRD - a.priceRD);
      break;
    case "az":
      arr.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "za":
      arr.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "best":
    default:
      arr.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
      break;
  }
  return arr;
});

/** ====== Helpers ====== */
const formatPrice = (n) => {
  const s = Number(n || 0).toFixed(0);
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const toggleFav = (id) => {
  const set = new Set(favorites.value);
  if (set.has(id)) set.delete(id);
  else set.add(id);
  favorites.value = set;
};

const addToCart = (p) => {
  // placeholder: integra tu store si ya tienes carrito
  console.log("ADD TO CART:", p.id, selectedSize[p.id] || p.sizes?.[0] || "");
};

const resetFilters = () => {
  filterSearch.value = "";
  priceMin.value = null;
  priceMax.value = null;
  selectedLines.value = [];
  selectedConcerns.value = [];
  selectedTypes.value = [];
  sortBy.value = "best";
};

/** ====== init ====== */
onMounted(() => {
  const saved = localStorage.getItem("pharmaderm_dark");
  isDark.value = saved === "1";
  applyDarkClass(isDark.value);

  // leer brand por query
  const b = route.query.brand;
  if (b === "cerave" || b === "larocheposay") {
    activeBrand.value = b;
  }

  // set default selected sizes
  products.value.forEach((p) => {
    if (p.sizes?.length) selectedSize[p.id] = p.sizes[0];
  });
});

watch(
  () => route.query.brand,
  (b) => {
    if (b === "cerave" || b === "larocheposay") {
      activeBrand.value = b;
      resetFilters();
    }
  }
);
</script>

<style scoped>
/* =========================
   THEME (no Tailwind dark)
========================= */
:global(html) {
  --bg: #f6f9fc;
  --text: #0f172a;
  --muted: #64748b;

  --surface: rgba(255,255,255,0.92);
  --card: #ffffff;
  --border: rgba(15, 23, 42, 0.08);

  --primary: #004e92;
  --primary2: #5dbcd2;

  --shadow: 0 10px 30px rgba(2, 6, 23, 0.08);
}

:global(html.dark) {
  --bg: #060b16;
  --text: #e8eefc;
  --muted: rgba(232, 238, 252, 0.7);

  --surface: rgba(10, 18, 36, 0.78);
  --card: #0b152e;
  --border: rgba(255, 255, 255, 0.10);

  --primary: #74b0ff;    /* azul claro para contraste */
  --primary2: #67d3e6;   /* cian suave */
  --shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
}

.app-shell {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
}

/* =========================
   HEADER
========================= */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(10px);
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}
.header__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
}
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.brand__logo {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.12);
  object-fit: contain;
  background: transparent;
}
.brand__title {
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--primary);
}
.brand__accent {
  color: #76b82a;
}
.header__actions {
  display: flex;
  gap: 10px;
}
.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: 0.15s;
}
.icon-btn:hover {
  background: rgba(148, 163, 184, 0.15);
}
.icon-btn .material-symbols-outlined {
  color: var(--primary);
}

.topbar {
  background: var(--primary2);
  padding: 8px 0;
}
.topbar__text {
  margin: 0;
  text-align: center;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* =========================
   STORE LAYOUT
========================= */
.store { padding-top: 18px; }
.store__title { margin-top: 10px; }

.crumbs {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 14px;
  color: var(--muted);
  margin-bottom: 10px;
}
.crumb { cursor: pointer; }
.crumb.active { color: var(--primary2); font-weight: 700; }
.sep { opacity: 0.6; }

.title-row {
  display: flex;
  gap: 18px;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  padding-bottom: 14px;
}
.h1 {
  margin: 0;
  font-size: 44px;
  line-height: 1;
  letter-spacing: -0.03em;
}
.subtitle {
  margin: 10px 0 0;
  color: var(--muted);
  max-width: 520px;
  font-size: 18px;
}

.title-right {
  display: flex;
  gap: 18px;
  align-items: center;
  margin-left: auto;
}
.count {
  display: grid;
  text-align: right;
  line-height: 1.1;
}
.count__num { font-weight: 900; font-size: 22px; }
.count__txt { color: var(--muted); font-weight: 700; }

.sort { display: flex; gap: 10px; align-items: center; }
.sort__label { color: var(--muted); font-weight: 700; }

.select {
  height: 44px;
  padding: 0 14px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  outline: none;
}
.select--small {
  height: 40px;
  border-radius: 12px;
}

.brand-tabs {
  display: inline-flex;
  gap: 10px;
  padding: 8px;
  border: 1px solid var(--border);
  background: rgba(148, 163, 184, 0.12);
  border-radius: 16px;
  margin-top: 10px;
}
.tab {
  height: 40px;
  padding: 0 14px;
  border-radius: 14px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text);
  font-weight: 800;
  cursor: pointer;
}
.tab--active {
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}

.store__grid {
  display: grid;
  grid-template-columns: 330px 1fr;
  gap: 18px;
  margin-top: 18px;
}
@media (max-width: 980px) {
  .store__grid {
    grid-template-columns: 1fr;
  }
}

/* =========================
   FILTERS (sticky + scroll)
========================= */
.filters {
  position: sticky;
  top: 130px;
  align-self: start;
  max-height: calc(100vh - 160px);
  overflow: auto;
  padding-right: 6px;
}
.filters::-webkit-scrollbar { width: 8px; }
.filters::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.25);
  border-radius: 999px;
}

.filters__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.filters__title {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
}

.filter-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 14px;
  margin-bottom: 12px;
  box-shadow: 0 10px 22px rgba(2, 6, 23, 0.06);
}
:global(html.dark) .filter-card {
  box-shadow: 0 20px 38px rgba(0, 0, 0, 0.35);
}

.filter-card__title {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 900;
}

.input {
  width: 100%;
  height: 44px;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  padding: 0 12px;
  outline: none;
}
.input:focus {
  border-color: var(--primary2);
  box-shadow: 0 0 0 3px rgba(93, 188, 210, 0.25);
}
.label {
  display: block;
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 6px;
  font-weight: 800;
}

.price-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.checklist {
  display: grid;
  gap: 10px;
}
.check {
  display: flex;
  gap: 10px;
  align-items: center;
  color: var(--muted);
  font-weight: 700;
}
.check input { width: 18px; height: 18px; }

.link-btn {
  background: transparent;
  border: 0;
  color: var(--primary2);
  font-weight: 900;
  cursor: pointer;
}

/* =========================
   PRODUCTS
========================= */
.products__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 900;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
@media (max-width: 1120px) {
  .cards { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 640px) {
  .cards { grid-template-columns: 1fr; }
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 22px;
  overflow: hidden;
  box-shadow: var(--shadow);
}
.card__media {
  position: relative;
  padding: 18px;
  background: rgba(148, 163, 184, 0.12);
}
.card__img {
  width: 100%;
  height: 220px;
  object-fit: contain;
  display: block;
  filter: drop-shadow(0 18px 24px rgba(0,0,0,0.10));
}
.fav {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: 0 10px 20px rgba(2,6,23,0.10);
  display: grid;
  place-items: center;
  cursor: pointer;
}
.fav .material-symbols-outlined { color: var(--muted); font-size: 24px; }

.card__body { padding: 16px 16px 18px; }
.brandline {
  margin: 0 0 6px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.9);
}
.card__name {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: -0.02em;
}
.meta {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
}
.stars {
  color: #fbbf24;
  font-size: 14px;
  letter-spacing: 2px;
  opacity: 0.9;
}
.rating {
  color: var(--muted);
  font-weight: 800;
}

.size-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}
.size-row__label {
  color: var(--muted);
  font-weight: 900;
}

.card__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.price {
  color: var(--primary);
  font-size: 22px;
  font-weight: 900;
}
.add {
  width: 52px;
  height: 52px;
  border-radius: 999px;
  background: var(--primary);
  border: 0;
  color: #fff;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 18px 26px rgba(0,0,0,0.20);
}
.add .material-symbols-outlined { font-size: 22px; }

.empty {
  grid-column: 1 / -1;
  padding: 20px;
  border: 1px dashed var(--border);
  border-radius: 18px;
  color: var(--muted);
  font-weight: 800;
}

/* =========================
   DARK FAB + BOTTOM NAV
========================= */
.dark-fab {
  position: fixed;
  right: 24px;
  bottom: 120px;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  background: var(--card);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  cursor: pointer;
  display: grid;
  place-items: center;
  z-index: 60;
}
.dark-fab .material-symbols-outlined { color: var(--muted); }

.bottom-nav {
  position: fixed;
  left: 0; right: 0; bottom: 0;
  background: var(--card);
  border-top: 1px solid var(--border);
  padding: 10px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 70;
}

.nav-item, .nav-center {
  text-decoration: none;
  color: var(--muted);
  display: grid;
  justify-items: center;
  gap: 4px;
  font-weight: 800;
}
.nav-item .material-symbols-outlined { font-size: 24px; }
.nav-item p, .nav-center p { margin: 0; font-size: 12px; }

.nav-item.router-link-active {
  color: var(--primary);
}

.nav-center {
  margin-top: -26px;
  color: var(--text);
}
.nav-center__btn {
  width: 58px;
  height: 58px;
  border-radius: 999px;
  background: var(--primary);
  color: #fff;
  display: grid;
  place-items: center;
  border: 4px solid var(--bg);
  box-shadow: var(--shadow);
}
.nav-center__btn .material-symbols-outlined { font-size: 24px; }
</style>

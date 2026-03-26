<template>
  <div class="shop-page" @click="closeOverlays">
    <header class="shop-header">
      <div class="top-promos">
        <div>FREE SHIPPING ON ORDERS OVER RD$3,000 • SHOP NOW</div>
      </div>

      <div class="header-main container">
        <div class="brand" @click.stop="$router.push('/inicio')">
          <img :src="logoSrc" alt="PharmaDerm" class="logo" />
          <span class="brand-text">
            PharmaDerm<span class="brand-accent">RD</span>
          </span>
        </div>

        <nav class="desktop-nav">
          <div
            class="nav-hover-wrap"
            @mouseenter="productsMenuOpen = true"
            @mouseleave="productsMenuOpen = false"
          >
            <button
              class="nav-link active"
              @click.stop="productsMenuOpen = !productsMenuOpen"
            >
              OUR PRODUCTS
            </button>

            <transition name="fade">
              <div
                v-if="productsMenuOpen"
                class="products-hover-panel"
                @click.stop
              >
                <div class="hover-grid">
                  <div class="hover-col">
                    <h4>FACE</h4>
                    <button
                      v-for="item in hoverFace"
                      :key="item"
                      @click="applySearch(item)"
                    >
                      {{ item }}
                    </button>
                  </div>

                  <div class="hover-col">
                    <h4>SUNSCREEN</h4>
                    <button
                      v-for="item in hoverSunscreen"
                      :key="item"
                      @click="applySearch(item)"
                    >
                      {{ item }}
                    </button>
                  </div>

                  <div class="hover-col">
                    <h4>BODY</h4>
                    <button
                      v-for="item in hoverBody"
                      :key="item"
                      @click="applySearch(item)"
                    >
                      {{ item }}
                    </button>
                  </div>

                  <div class="hover-col">
                    <h4>SKIN CONCERN</h4>
                    <button
                      v-for="item in hoverConcerns"
                      :key="item"
                      @click="setConcernFilter(item)"
                    >
                      {{ normalizeConcernLabel(item) }}
                    </button>
                  </div>

                  <div class="hover-col">
                    <h4>PRODUCT LINE</h4>
                    <button
                      v-for="item in hoverLines"
                      :key="item"
                      @click="setLineFilter(item)"
                    >
                      {{ item }}
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>


          <button class="nav-link" @click="$router.push('/quiz')">
            ANALYZE YOUR SKIN
          </button>

          <button class="nav-link" @click="$router.push('/inicio')">
            EXPERT ADVICE
          </button>

          <button class="nav-link" @click="$router.push('/inicio')">
            OUR STORY
          </button>
        </nav>

        <div class="header-actions">
          <button
            class="icon-btn"
            aria-label="Search"
            @click.stop="toggleSearchOverlay"
          >
            <span class="material-symbols-outlined">search</span>
          </button>

          <button
            class="icon-btn cart-btn"
            aria-label="Cart"
            @click.stop="$router.push('/carrito')"
          >
            <span class="material-symbols-outlined">shopping_bag</span>
            <span v-if="cartCount" class="cart-badge">{{ cartCount }}</span>
          </button>

          <div class="profile-wrap">
            <button
              class="icon-btn"
              aria-label="Profile"
              @click.stop="profilePanelOpen = !profilePanelOpen"
            >
              <span class="material-symbols-outlined">person</span>
            </button>

            <transition name="fade">
              <div
                v-if="profilePanelOpen"
                class="profile-panel"
                @click.stop
              >
                <button @click="$router.push('/login')">Log in</button>
                <button @click="$router.push('/registro')">Create account</button>
                <button @click="$router.push('/carrito')">My cart</button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </header>

    <transition name="fade">
      <div
        v-if="searchOverlayOpen"
        class="search-overlay"
        @click.self="searchOverlayOpen = false"
      >
        <div class="search-overlay__box" @click.stop>
          <div class="search-overlay__top">
            <div class="search-tabs">
              <button class="nav-link active" @click="$router.push('/tienda')">
                OUR PRODUCTS
              </button>
              <button class="nav-link" @click="$router.push('/quiz')">
                ANALYZE YOUR SKIN
              </button>
              <button class="nav-link" @click="$router.push('/inicio')">
                EXPERT ADVICE
              </button>
              <button class="nav-link" @click="$router.push('/inicio')">
                OUR STORY
              </button>
            </div>

            <button class="close-search" @click="searchOverlayOpen = false">
              <span class="material-symbols-outlined">close</span>
              <span>CLOSE</span>
            </button>
          </div>

          <div class="search-overlay__input-row">
            <span class="search-title">I’m looking for...</span>
            <input
              ref="searchInputRef"
              v-model.trim="search"
              type="text"
              class="search-overlay__input"
              placeholder="toleriane"
            />
          </div>

          <div class="search-overlay__content">
            <div class="search-left">
              <div class="search-left__header">
                <h3>BEST MATCHES</h3>
                <button class="view-all-btn" @click="searchOverlayOpen = false">
                  View all
                </button>
              </div>

              <div class="best-matches-grid">
                <button
                  v-for="item in quickResults"
                  :key="item.id"
                  class="best-match-card"
                  @click="openProduct(item.slug)"
                >
                  <img :src="item.image" :alt="item.name" />
                  <div class="best-match-card__info">
                    <h4>{{ shortenName(item.name) }}</h4>
                    <p>{{ item.subtitle }}</p>
                    <div class="mini-stars">★★★★★</div>
                    <strong>RD${{ formatRD(item.priceFrom) }}</strong>
                  </div>
                </button>

                <div v-if="!quickResults.length" class="search-empty">
                  No matches yet.
                </div>
              </div>
            </div>

            <aside class="search-right">
              <div class="search-side-box">
                <h4>POPULAR SEARCHES</h4>
                <button
                  v-for="term in popularSearches"
                  :key="term"
                  @click="applySearch(term)"
                >
                  {{ term }}
                </button>
              </div>

              <div class="search-side-box">
                <h4>CATEGORIES</h4>
                <button
                  v-for="term in searchCategories"
                  :key="term"
                  @click="applySearch(term)"
                >
                  {{ term }}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </transition>

    <main class="container shop-layout">
      <section class="breadcrumb-row">
        <div class="crumbs">
          <span class="crumb" @click="$router.push('/inicio')">Home</span>
          <span>›</span>
          <span class="crumb active">Our Products</span>
          <span>›</span>
          <span class="crumb active">{{ activeBrandLabel }}</span>
        </div>
      </section>

      <section class="hero-title">
        <div>
          <h1>{{ activeBrandLabel.toUpperCase() }}</h1>
          <p>Dermatologist recommended skincare. Browse</p>
        </div>

        <div class="title-actions">
          <div class="product-count">
            <strong>{{ sortedProducts.length }}</strong>
            <span>products</span>
          </div>

          <select v-model="sortBy" class="sort-select">
            <option value="best">Best Sellers</option>
            <option value="az">Alphabetically (A-Z)</option>
            <option value="za">Alphabetically (Z-A)</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
          </select>
        </div>
      </section>

      <section class="brand-switch-row">
        <button
          class="brand-switch"
          :class="{ active: activeBrand === 'larocheposay' }"
          @click="setBrand('larocheposay')"
        >
          La Roche-Posay
        </button>

        <button
          class="brand-switch"
          :class="{ active: activeBrand === 'cerave' }"
          @click="setBrand('cerave')"
        >
          CeraVe
        </button>
      </section>

      <section class="content-grid">
        <aside class="filters">
          <div class="filters-header">
            <h3>FILTER BY</h3>
            <button @click="resetFilters">Reset</button>
          </div>

          <div class="filter-box">
            <h4>SEARCH</h4>
            <input v-model.trim="search" type="text" placeholder="Search products..." />
          </div>

          <div class="filter-box">
            <h4>PRODUCT LINE</h4>
            <div class="scroll-checks">
              <label v-for="line in availableLines" :key="line" class="check-row">
                <input type="checkbox" :value="line" v-model="selectedLines" />
                <span>{{ line }}</span>
              </label>
            </div>
          </div>

          <div class="filter-box">
            <h4>SKIN CONCERN</h4>
            <div class="scroll-checks">
              <label
                v-for="concern in availableConcerns"
                :key="concern"
                class="check-row"
              >
                <input type="checkbox" :value="concern" v-model="selectedConcerns" />
                <span>{{ normalizeConcernLabel(concern) }}</span>
              </label>
            </div>
          </div>

          <div class="filter-box">
            <h4>TYPE</h4>
            <div class="scroll-checks">
              <label v-for="type in availableTypes" :key="type" class="check-row">
                <input type="checkbox" :value="type" v-model="selectedTypes" />
                <span>{{ type }}</span>
              </label>
            </div>
          </div>
        </aside>

        <section class="products-zone">
          <div class="products-grid">
            <article
              v-for="product in sortedProducts"
              :key="product.id"
              class="product-card"
            >
              <div class="card-image-wrap" @click="openProduct(product.slug)">
                <img :src="product.image" :alt="product.name" class="card-image" />
              </div>

              <div class="card-body">
                <p class="brand-line">{{ product.brandLabel }}</p>

                <h3 class="product-name" @click="openProduct(product.slug)">
                  {{ product.name }}
                </h3>

                <p class="product-subtitle">{{ product.subtitle }}</p>

                <div class="rating-row">
                  <span class="stars">★★★★★</span>
                  <span class="reviews">
                    {{ Number(product.rating || 4.5).toFixed(1) }}
                    ({{ product.reviews || 0 }})
                  </span>
                </div>

                <div v-if="product.sizes?.length" class="size-row">
                  <label>Size</label>
                  <select v-model="selectedSize[product.id]">
                    <option
                      v-for="size in product.sizes"
                      :key="size.label"
                      :value="size.label"
                    >
                      {{ size.label }}
                    </option>
                  </select>
                </div>

                <div class="card-bottom">
                  <strong class="price">RD${{ formatRD(selectedPrice(product)) }}</strong>

                  <div class="action-row">
                    <button class="outline-btn" @click="openProduct(product.slug)">
                      View
                    </button>
                    <button class="primary-btn" @click="addToCart(product)">
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </article>

            <div v-if="!sortedProducts.length" class="empty-state">
              No products match your filters.
            </div>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup>
import {
  computed,
  reactive,
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import { lrpCatalog } from "../data/lrpCatalog";
import { addItemToCart, getCartCount } from "../utils/cart";

const router = useRouter();

const logoSrc =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCwGk1ZsXrDiVM1y4eYkFkLAVJyj3SEQtwpa9gS41xgybM4JsMSUQU1bAYKb4aviIWmG2GtMVM1nQrg4rTEm3bi80sHtcf-M6xSUCR2ua9YOhGfPNVmoJhBG1zcuzQq8mODOnwTQihKFT5tQ_dy8FM8IC-Z12rIEybnyvjZd3JctWEFO86kmHZonJMxnQG6HrfgLFeTwIK6wsY-4PKy7LSaqAD3iJEqDxf2JVzH6t5Aj5cneE7Af9KkyxdLRTwpToy3oqVFRaMPLFs";

const ceraveCatalog = [
  {
    id: "cerave-moisturizing-cream",
    slug: "cerave-moisturizing-cream",
    brand: "cerave",
    brandLabel: "CERAVE",
    line: "Moisturizers",
    category: "Face Moisturizer",
    type: "Moisturizer",
    concerns: ["Dry Skin", "Sensitive Skin"],
    name: "Moisturizing Cream",
    subtitle: "Barrier-repair moisturizer for dry to very dry skin.",
    priceFrom: 1250,
    priceRD: 1250,
    rating: 4.8,
    reviews: 4200,
    image:
      "https://placehold.co/600x700/f8fafc/111827?text=CeraVe+Moisturizing+Cream",
    sizes: [
      { label: "340G", priceUSD: 1250 },
      { label: "454G", priceUSD: 1650 },
    ],
    defaultSize: "340G",
  },
  {
    id: "cerave-hydrating-cleanser",
    slug: "cerave-hydrating-facial-cleanser",
    brand: "cerave",
    brandLabel: "CERAVE",
    line: "Cleansers",
    category: "Face Wash",
    type: "Cleanser",
    concerns: ["Dry Skin", "Sensitive Skin"],
    name: "Hydrating Facial Cleanser",
    subtitle: "Cream cleanser for normal to dry skin.",
    priceFrom: 950,
    priceRD: 950,
    rating: 4.7,
    reviews: 3800,
    image:
      "https://placehold.co/600x700/f8fafc/111827?text=CeraVe+Hydrating+Cleanser",
    sizes: [
      { label: "236ML", priceUSD: 950 },
      { label: "473ML", priceUSD: 1450 },
    ],
    defaultSize: "236ML",
  },
  {
    id: "cerave-hyaluronic-serum",
    slug: "cerave-hyaluronic-acid-serum",
    brand: "cerave",
    brandLabel: "CERAVE",
    line: "Serums",
    category: "Face Serum",
    type: "Serum",
    concerns: ["Dry Skin", "Dehydrated Skin"],
    name: "Hyaluronic Acid Serum",
    subtitle: "Hydrating anti-aging serum with hyaluronic acid and vitamin B5.",
    priceFrom: 2400,
    priceRD: 2400,
    rating: 4.6,
    reviews: 1500,
    image:
      "https://placehold.co/600x700/f8fafc/111827?text=CeraVe+HA+Serum",
    sizes: [{ label: "30ML", priceUSD: 2400 }],
    defaultSize: "30ML",
  },
  {
    id: "cerave-mineral-sunscreen",
    slug: "cerave-mineral-sunscreen-spf-50",
    brand: "cerave",
    brandLabel: "CERAVE",
    line: "Sunscreens",
    category: "Face Sunscreen",
    type: "Sunscreen",
    concerns: ["UV Protection", "Sensitive Skin"],
    name: "Mineral Sunscreen SPF 50",
    subtitle: "Lightweight mineral sunscreen for daily UV protection.",
    priceFrom: 950,
    priceRD: 950,
    rating: 4.5,
    reviews: 900,
    image:
      "https://placehold.co/600x700/f8fafc/111827?text=CeraVe+Mineral+Sunscreen",
    sizes: [{ label: "75ML", priceUSD: 950 }],
    defaultSize: "75ML",
  },
];

const allProducts = computed(() => [
  ...lrpCatalog.map((p) => ({ ...p, brand: p.brand || "larocheposay" })),
  ...ceraveCatalog,
]);

const activeBrand = ref("larocheposay");
const activeBrandLabel = computed(() =>
  activeBrand.value === "larocheposay" ? "La Roche-Posay" : "CeraVe"
);

const search = ref("");
const sortBy = ref("best");
const selectedLines = ref([]);
const selectedConcerns = ref([]);
const selectedTypes = ref([]);
const selectedSize = reactive({});
const cartCount = ref(0);

const productsMenuOpen = ref(false);
const profilePanelOpen = ref(false);
const searchOverlayOpen = ref(false);
const searchInputRef = ref(null);

const brandProducts = computed(() =>
  allProducts.value.filter((p) => p.brand === activeBrand.value)
);

const availableLines = computed(() =>
  [...new Set(brandProducts.value.map((p) => p.line).filter(Boolean))].sort()
);

const availableConcerns = computed(() =>
  [...new Set(brandProducts.value.flatMap((p) => p.concerns || []))].sort()
);

const availableTypes = computed(() =>
  [...new Set(brandProducts.value.map((p) => p.type).filter(Boolean))].sort()
);

const filteredProducts = computed(() => {
  const q = search.value.toLowerCase();

  return brandProducts.value.filter((p) => {
    const haystack =
      `${p.name} ${p.subtitle || ""} ${p.line || ""} ${p.type || ""} ${p.category || ""} ${(p.concerns || []).join(" ")}`
        .toLowerCase();

    if (q && !haystack.includes(q)) return false;
    if (selectedLines.value.length && !selectedLines.value.includes(p.line)) return false;

    if (
      selectedConcerns.value.length &&
      !selectedConcerns.value.some((c) => p.concerns?.includes(c))
    ) {
      return false;
    }

    if (selectedTypes.value.length && !selectedTypes.value.includes(p.type)) {
      return false;
    }

    return true;
  });
});

const sortedProducts = computed(() => {
  const arr = [...filteredProducts.value];

  switch (sortBy.value) {
    case "az":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "za":
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case "priceAsc":
      return arr.sort((a, b) => selectedPrice(a) - selectedPrice(b));
    case "priceDesc":
      return arr.sort((a, b) => selectedPrice(b) - selectedPrice(a));
    default:
      return arr.sort((a, b) => Number(b.reviews || 0) - Number(a.reviews || 0));
  }
});

const quickResults = computed(() => {
  const q = search.value.trim().toLowerCase();
  const pool = brandProducts.value;

  if (!q) return pool.slice(0, 4);

  return pool
    .filter((p) => {
      const hay = `${p.name} ${p.subtitle || ""} ${p.line || ""} ${p.type || ""} ${p.category || ""}`.toLowerCase();
      return hay.includes(q);
    })
    .slice(0, 4);
});

const hoverFace = computed(() =>
  uniqueExisting([
    "Face Wash",
    "Face Moisturizer",
    "Face Serum",
    "Face Toner",
    "Eye Care",
    "Lip Balms",
  ])
);

const hoverSunscreen = computed(() =>
  uniqueExisting([
    "Face Sunscreen",
    "Mineral Sunscreen",
    "Body Sunscreen",
    "Tinted Sunscreen",
  ])
);

const hoverBody = computed(() =>
  uniqueExisting([
    "Body Lotion",
    "Body Wash",
    "Cleansing Oil",
    "Hand Cream",
    "Healing Body Spray",
  ])
);

const hoverConcerns = computed(() =>
  availableConcerns.value.filter((c) =>
    [
      "Acne Prone Skin",
      "Fine Lines & Wrinkles",
      "Eczema",
      "Dry Skin",
      "Dark Spots",
      "Oiliness",
      "Sensitive Skin",
      "Dehydrated Skin",
    ].includes(c)
  )
);

const hoverLines = computed(() => availableLines.value);

const popularSearches = computed(() => {
  return activeBrand.value === "larocheposay"
    ? ["sunscreen", "cicaplast", "moisturizer", "b5", "effaclar"]
    : ["moisturizer", "cleanser", "serum", "sunscreen", "cream"];
});

const searchCategories = computed(() => {
  return activeBrand.value === "larocheposay"
    ? ["Toleriane", "Serums", "Moisturizers", "Sunscreens"]
    : ["Cleansers", "Serums", "Moisturizers", "Sunscreens"];
});

function uniqueExisting(items) {
  const existing = items.filter((label) => {
    const low = label.toLowerCase();
    return brandProducts.value.some((p) => {
      const cat = (p.category || "").toLowerCase();
      const type = (p.type || "").toLowerCase();
      const line = (p.line || "").toLowerCase();
      const name = (p.name || "").toLowerCase();
      return (
        cat.includes(low) ||
        type.includes(low) ||
        line.includes(low) ||
        name.includes(low)
      );
    });
  });

  return [...new Set(existing)];
}

function selectedPrice(product) {
  const size = product.sizes?.find((s) => s.label === selectedSize[product.id]);
  return size?.priceUSD ?? product.priceUSD ?? product.priceFrom ?? 0;
}

function formatRD(value) {
  return new Intl.NumberFormat("es-DO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function updateCartCount() {
  cartCount.value = getCartCount();
}

function addToCart(product) {
  addItemToCart(product, {
    size: selectedSize[product.id] || product.defaultSize || product.sizes?.[0]?.label,
    qty: 1,
    priceUSD: selectedPrice(product),
    mode: "one-time",
  });
  updateCartCount();
}

function openProduct(slug) {
  searchOverlayOpen.value = false;
  router.push(`/producto/${slug}`);
}

function resetFilters() {
  search.value = "";
  selectedLines.value = [];
  selectedConcerns.value = [];
  selectedTypes.value = [];
  sortBy.value = "best";
}

function setBrand(brand) {
  activeBrand.value = brand;
  resetFilters();
  brandProducts.value.forEach((p) => {
    if (p.sizes?.length && !selectedSize[p.id]) {
      selectedSize[p.id] = p.defaultSize || p.sizes[0].label;
    }
  });
  productsMenuOpen.value = false;
}

function setLineFilter(line) {
  resetFilters();
  selectedLines.value = [line];
  productsMenuOpen.value = false;
}

function setConcernFilter(concern) {
  resetFilters();
  selectedConcerns.value = [concern];
  productsMenuOpen.value = false;
}

function applySearch(term) {
  resetFilters();
  search.value = term;
  productsMenuOpen.value = false;
  searchOverlayOpen.value = false;
}

function showBestSellers() {
  sortBy.value = "best";
  searchOverlayOpen.value = false;
  productsMenuOpen.value = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toggleSearchOverlay() {
  searchOverlayOpen.value = !searchOverlayOpen.value;
  profilePanelOpen.value = false;
  productsMenuOpen.value = false;

  if (searchOverlayOpen.value) {
    nextTick(() => {
      searchInputRef.value?.focus();
    });
  }
}

function closeOverlays() {
  productsMenuOpen.value = false;
  profilePanelOpen.value = false;
}

function normalizeConcernLabel(value) {
  const map = {
    "Acne Prone Skin": "Acne Prone",
    "Fine Lines & Wrinkles": "Anti-Aging",
    Oiliness: "Oily Skin",
  };
  return map[value] || value;
}

function shortenName(name) {
  if (name.length <= 24) return name;
  return `${name.slice(0, 24)}...`;
}

onMounted(() => {
  brandProducts.value.forEach((p) => {
    if (p.sizes?.length && !selectedSize[p.id]) {
      selectedSize[p.id] = p.defaultSize || p.sizes[0].label;
    }
  });

  updateCartCount();
  window.addEventListener("storage", updateCartCount);
});

onBeforeUnmount(() => {
  window.removeEventListener("storage", updateCartCount);
});
</script>

<style scoped>
.shop-page,
.shop-layout,
.search-overlay,
.search-overlay__box {
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

.shop-page {
  min-height: 100vh;
  background: #ffffff;
  color: #111827;
}

.container {
  width: min(100%, 1440px);
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
}

.top-promos {
  background: #63b6cb;
  color: white;
  border-bottom: 1px solid #dbe3e8;
  display: grid;
  grid-template-columns: 1fr;
  padding: 12px 24px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .08em;
  text-align: center;
  font-weight: 700;
}

.shop-header {
  position: sticky;
  top: 0;
  z-index: 90;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  overflow: visible;
}

.header-main {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  position: relative;
  overflow: visible;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}

.brand-text {
  font-size: 18px;
  font-weight: 800;
  color: #07579b;
  line-height: 1;
  white-space: nowrap;
}

.brand-accent {
  color: #76b82a;
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex-wrap: nowrap;
  overflow: visible;
}

.nav-link {
  background: transparent;
  border: none;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .02em;
  cursor: pointer;
  color: #111827;
  white-space: nowrap;
  padding: 4px 6px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  position: relative;
  cursor: pointer;
  color: #07579b;
  display: grid;
  place-items: center;
}

.icon-btn .material-symbols-outlined {
  font-size: 24px;
}

.cart-badge {
  position: absolute;
  right: 0;
  top: 2px;
  min-width: 16px;
  height: 16px;
  border-radius: 999px;
  background: #111827;
  color: white;
  font-size: 10px;
  display: grid;
  place-items: center;
}

.nav-hover-wrap {
  position: static;
  overflow: visible;
}

.products-hover-panel {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: min(1280px, calc(100vw - 32px));
  max-width: calc(100vw - 32px);
  background: #f7f7f7;
  border: 1px solid #d8dee5;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  padding: 22px 24px;
  z-index: 999;
  overflow-x: auto;
}

.hover-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(150px, 1fr));
  gap: 22px;
  min-width: 980px;
}

.hover-col h4 {
  margin: 0 0 12px;
  font-size: 12px;
  letter-spacing: .03em;
}

.hover-col button {
  display: block;
  border: none;
  background: transparent;
  padding: 0;
  margin-bottom: 12px;
  text-align: left;
  color: #334155;
  cursor: pointer;
  font-size: 13px;
  line-height: 1.2;
}

.hover-col button:hover {
  text-decoration: underline;
}

.profile-wrap {
  position: relative;
}

.profile-panel {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  width: 180px;
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
  z-index: 120;
  padding: 10px;
  display: grid;
  gap: 8px;
}

.profile-panel button {
  border: none;
  background: #fff;
  text-align: left;
  padding: 10px 12px;
  cursor: pointer;
  font-size: 14px;
}

.profile-panel button:hover {
  background: #f8fafc;
}

.search-overlay {
  position: fixed;
  inset: 0;
  background: rgba(244, 248, 251, 0.92);
  z-index: 200;
}

.search-overlay__box {
  width: 100%;
  height: 100%;
  background: #eef4f8;
}

.search-overlay__top {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  border-bottom: 1px solid #d7e1e8;
  background: white;
}

.search-tabs {
  display: flex;
  align-items: center;
  gap: 26px;
  padding: 0 18px;
}

.close-search {
  min-width: 170px;
  border: none;
  border-left: 1px solid #d7e1e8;
  background: #dfeff5;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  cursor: pointer;
}

.search-overlay__input-row {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 14px;
  align-items: center;
  padding: 18px 18px 14px;
}

.search-title {
  font-size: 34px;
  line-height: 1.05;
  color: #4b5563;
  font-weight: 300;
}

.search-overlay__input {
  width: 100%;
  height: 64px;
  border: 2px solid #4f83ff;
  background: white;
  padding: 0 16px;
  font-size: 28px;
  color: #6b7280;
  font-weight: 600;
}

.search-overlay__content {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 280px;
  gap: 18px;
  padding: 14px 18px 20px;
}

.search-left__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.search-left__header h3 {
  margin: 0;
  font-size: 18px;
}

.view-all-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  text-decoration: underline;
}

.best-matches-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.best-match-card {
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 12px;
  border: none;
  background: rgba(255,255,255,0.4);
  text-align: left;
  cursor: pointer;
  padding: 14px;
  min-width: 0;
}

.best-match-card img {
  width: 110px;
  height: 110px;
  object-fit: contain;
  background: white;
}

.best-match-card__info h4 {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 900;
  line-height: 1.1;
}

.best-match-card__info p {
  margin: 0 0 8px;
  color: #475569;
  font-size: 13px;
  line-height: 1.35;
}

.mini-stars {
  margin-bottom: 8px;
  color: #2196f3;
  letter-spacing: 1px;
}

.best-match-card__info strong {
  font-size: 16px;
}

.search-right {
  display: grid;
  gap: 18px;
}

.search-side-box {
  background: white;
  border: 1px solid #dbe3ea;
  padding: 18px 20px;
}

.search-side-box h4 {
  margin: 0 0 14px;
  font-size: 13px;
}

.search-side-box button {
  display: block;
  border: none;
  background: transparent;
  padding: 0;
  margin-bottom: 14px;
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  color: #374151;
}

.search-empty {
  grid-column: 1 / -1;
  padding: 20px;
  background: white;
  color: #6b7280;
}

.shop-layout {
  padding-bottom: 40px;
}

.breadcrumb-row {
  padding: 20px 0 10px;
}

.crumbs {
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: #6b7280;
}

.crumb.active {
  color: #111827;
}

.hero-title {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 24px;
  padding: 8px 0 22px;
}

.hero-title h1 {
  margin: 0;
  font-size: 34px;
  letter-spacing: -.02em;
}

.hero-title p {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 15px;
}

.title-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.product-count {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.sort-select {
  height: 42px;
  border: 1px solid #d1d5db;
  padding: 0 12px;
  background: #fff;
}

.brand-switch-row {
  display: flex;
  gap: 10px;
  margin-bottom: 22px;
}

.brand-switch {
  height: 40px;
  padding: 0 16px;
  border: 1px solid #d1d5db;
  background: white;
  cursor: pointer;
  font-weight: 700;
}

.brand-switch.active {
  border-color: #00a3e0;
  color: #00a3e0;
}

.content-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 28px;
}

.filters {
  position: sticky;
  top: 120px;
  align-self: start;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  padding-right: 6px;
  scrollbar-width: thin;
  scrollbar-color: rgba(100, 116, 139, 0.5) transparent;
}

.filters::-webkit-scrollbar {
  width: 8px;
}

.filters::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.5);
  border-radius: 999px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.filters-header h3 {
  margin: 0;
  font-size: 16px;
}

.filters-header button {
  border: none;
  background: transparent;
  color: #2563eb;
  cursor: pointer;
}

.filter-box {
  border: 1px solid #e5e7eb;
  padding: 16px;
  margin-bottom: 14px;
  background: #fff;
}

.filter-box h4 {
  margin: 0 0 12px;
  font-size: 13px;
  letter-spacing: .04em;
}

.filter-box input[type="text"] {
  width: 100%;
  height: 42px;
  border: 1px solid #d1d5db;
  padding: 0 12px;
}

.scroll-checks {
  max-height: 210px;
  overflow-y: auto;
  padding-right: 6px;
}

.scroll-checks::-webkit-scrollbar {
  width: 7px;
}

.scroll-checks::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.45);
  border-radius: 999px;
}

.check-row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  font-size: 14px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.product-card {
  border: 1px solid #e5e7eb;
  background: white;
}

.card-image-wrap {
  background: #f8fafc;
  padding: 24px;
  cursor: pointer;
}

.card-image {
  width: 100%;
  height: 240px;
  object-fit: contain;
  display: block;
}

.card-body {
  padding: 18px;
}

.brand-line {
  margin: 0 0 6px;
  font-size: 11px;
  letter-spacing: .06em;
  color: #6b7280;
}

.product-name {
  margin: 0 0 8px;
  font-size: 17px;
  line-height: 1.2;
  cursor: pointer;
}

.product-subtitle {
  margin: 0 0 12px;
  color: #4b5563;
  font-size: 13px;
  min-height: 38px;
}

.rating-row {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 13px;
  margin-bottom: 14px;
}

.stars {
  color: #111827;
  letter-spacing: 1px;
}

.reviews {
  color: #6b7280;
}

.size-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.size-row select {
  min-width: 130px;
  height: 40px;
  border: 1px solid #d1d5db;
  padding: 0 10px;
}

.card-bottom {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.price {
  font-size: 20px;
}

.action-row {
  display: flex;
  gap: 10px;
}

.outline-btn,
.primary-btn {
  flex: 1;
  height: 44px;
  cursor: pointer;
  font-weight: 700;
}

.outline-btn {
  border: 1px solid #111827;
  background: white;
}

.primary-btn {
  border: 1px solid #009fe3;
  background: #009fe3;
  color: white;
}

.empty-state {
  grid-column: 1 / -1;
  border: 1px dashed #d1d5db;
  padding: 30px;
  text-align: center;
  color: #6b7280;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1250px) {
  .hover-grid {
    grid-template-columns: repeat(4, minmax(150px, 1fr));
    min-width: 780px;
  }
}

@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .best-matches-grid {
    grid-template-columns: 1fr 1fr;
  }

  .search-overlay__input-row {
    grid-template-columns: 1fr;
  }

  .search-title {
    font-size: 28px;
  }

  .products-hover-panel {
    width: min(980px, calc(100vw - 28px));
  }
}

@media (max-width: 1000px) {
  .desktop-nav {
    display: none;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    position: static;
    max-height: none;
  }

  .search-overlay__content {
    grid-template-columns: 1fr;
  }

  .header-main {
    height: 68px;
  }

  .brand-text {
    font-size: 16px;
  }

  .products-hover-panel {
    width: min(94vw, 94vw);
  }

  .hover-grid {
    grid-template-columns: repeat(3, minmax(150px, 1fr));
    min-width: 680px;
  }
}

@media (max-width: 700px) {
  .container {
    padding: 0 14px;
  }

  .hero-title {
    flex-direction: column;
    align-items: start;
  }

  .products-grid,
  .best-matches-grid {
    grid-template-columns: 1fr;
  }

  .search-overlay__input {
    height: 54px;
    font-size: 22px;
  }

  .search-tabs {
    display: none;
  }

  .close-search {
    min-width: 110px;
  }

  .search-title {
    font-size: 22px;
  }

  .brand-switch-row {
    flex-wrap: wrap;
  }

  .products-hover-panel {
    width: calc(100vw - 20px);
    max-width: calc(100vw - 20px);
    padding: 18px 16px;
  }

  .hover-grid {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
    min-width: 0;
    gap: 18px;
  }
}
</style>
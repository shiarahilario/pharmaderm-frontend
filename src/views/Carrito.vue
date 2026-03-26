<template>
  <div class="cart-page">
    <header class="cart-header container">
      <button class="back-btn" @click="$router.back()">← Back</button>
      <h1>Your Cart</h1>
      <p>{{ cart.length }} item(s)</p>
    </header>

    <main class="container cart-layout">
      <section class="cart-items">
        <article
          v-for="(item, index) in cart"
          :key="`${item.id}-${item.size}-${index}`"
          class="cart-item"
        >
          <img :src="item.image" :alt="item.name" class="cart-item__img" />

          <div class="cart-item__body">
            <h3>{{ item.name }}</h3>
            <p class="muted">Size: {{ item.size }}</p>
            <p class="muted">
              Purchase: {{ item.mode === "autoship" ? "Replenish & Save" : "One-time" }}
            </p>
            <strong>${{ money(item.priceUSD) }}</strong>
          </div>

          <div class="cart-item__actions">
            <div class="qty-box">
              <button @click="decreaseQty(index)">−</button>
              <span>{{ item.qty }}</span>
              <button @click="increaseQty(index)">+</button>
            </div>

            <button class="remove-btn" @click="removeItem(index)">
              Remove
            </button>
          </div>
        </article>

        <div v-if="!cart.length" class="empty">
          <p>Your cart is empty.</p>
          <button class="shop-btn" @click="$router.push('/tienda')">
            Continue Shopping
          </button>
        </div>
      </section>

      <aside class="summary" v-if="cart.length">
        <h2>Order Summary</h2>

        <div class="summary-row">
          <span>Subtotal</span>
          <strong>${{ money(subtotal) }}</strong>
        </div>

        <div class="summary-row">
          <span>Estimated shipping</span>
          <strong>{{ subtotal >= 45 ? "Free" : "$5.99" }}</strong>
        </div>

        <div class="summary-row total">
          <span>Total</span>
          <strong>${{ money(total) }}</strong>
        </div>

        <button class="checkout-btn">Proceed to Checkout</button>
        <button class="clear-btn" @click="clearAll">Clear Cart</button>
      </aside>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import {
  clearCart,
  getCart,
  removeCartItem,
  updateCartItemQty,
} from "../utils/cart";
import { money } from "../data/lrpCatalog";

const cart = ref([]);

const loadCart = () => {
  cart.value = getCart();
};

onMounted(() => {
  loadCart();
  window.addEventListener("storage", loadCart);
});

const subtotal = computed(() =>
  cart.value.reduce(
    (acc, item) => acc + Number(item.priceUSD || 0) * Number(item.qty || 0),
    0
  )
);

const shipping = computed(() => (subtotal.value >= 45 ? 0 : 5.99));
const total = computed(() => subtotal.value + shipping.value);

const increaseQty = (index) => {
  const item = cart.value[index];
  updateCartItemQty(index, Number(item.qty || 1) + 1);
  loadCart();
};

const decreaseQty = (index) => {
  const item = cart.value[index];
  updateCartItemQty(index, Math.max(1, Number(item.qty || 1) - 1));
  loadCart();
};

const removeItem = (index) => {
  removeCartItem(index);
  loadCart();
};

const clearAll = () => {
  clearCart();
  loadCart();
};
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background: #fff;
  color: #111827;
  font-family: Arial, Helvetica, sans-serif;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.cart-header {
  padding: 30px 24px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.back-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  margin-bottom: 10px;
  color: #374151;
}

.cart-header h1 {
  margin: 0;
  font-size: 34px;
}

.cart-header p {
  margin: 8px 0 0;
  color: #6b7280;
}

.cart-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 28px;
  padding: 28px 24px 40px;
}

.cart-items {
  display: grid;
  gap: 16px;
}

.cart-item {
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 18px;
  border: 1px solid #e5e7eb;
  padding: 16px;
}

.cart-item__img {
  width: 100%;
  height: 140px;
  object-fit: contain;
  background: #f8fafc;
}

.cart-item__body h3 {
  margin: 0 0 8px;
  font-size: 20px;
}

.muted {
  margin: 0 0 6px;
  color: #6b7280;
}

.cart-item__actions {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-between;
}

.qty-box {
  width: 120px;
  height: 42px;
  border: 1px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.qty-box button {
  width: 36px;
  height: 100%;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
}

.remove-btn {
  border: none;
  background: transparent;
  color: #b91c1c;
  cursor: pointer;
}

.summary {
  border: 1px solid #e5e7eb;
  padding: 20px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.summary h2 {
  margin: 0 0 18px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
}

.summary-row.total {
  padding-top: 14px;
  border-top: 1px solid #e5e7eb;
  font-size: 18px;
}

.checkout-btn,
.clear-btn,
.shop-btn {
  width: 100%;
  height: 46px;
  cursor: pointer;
  font-weight: 700;
  margin-top: 12px;
}

.checkout-btn {
  background: #00a3e0;
  color: white;
  border: 1px solid #00a3e0;
}

.clear-btn,
.shop-btn {
  background: white;
  border: 1px solid #111827;
}

.empty {
  border: 1px dashed #d1d5db;
  padding: 40px;
  text-align: center;
}

@media (max-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 1fr;
  }

  .cart-item__actions {
    align-items: start;
    gap: 12px;
  }
}
</style>
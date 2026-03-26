const CART_KEY = "pharmaderm_cart";

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event("storage"));
}

export function getCartCount() {
  return getCart().reduce((acc, item) => acc + Number(item.qty || 0), 0);
}

export function addItemToCart(product, options = {}) {
  const cart = getCart();

  const size =
    options.size ||
    product.defaultSize ||
    product.sizes?.[0]?.label ||
    "Default";

  const qty = Number(options.qty || 1);

  const priceUSD =
    options.priceUSD ??
    product.sizes?.find((s) => s.label === size)?.priceUSD ??
    product.priceUSD ??
    product.priceFrom ??
    0;

  const mode = options.mode || "one-time";

  const existing = cart.find(
    (item) => item.id === product.id && item.size === size && item.mode === mode
  );

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      size,
      qty,
      mode,
      priceUSD,
    });
  }

  saveCart(cart);
}

export function removeCartItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

export function updateCartItemQty(index, qty) {
  const cart = getCart();

  if (!cart[index]) return;

  const safeQty = Math.max(1, Number(qty || 1));
  cart[index].qty = safeQty;
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}
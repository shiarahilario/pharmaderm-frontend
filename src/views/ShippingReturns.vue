<template>
  <div class="shipping-page">

    <section class="shipping-hero">
      <div class="hero-inner">
        <p class="hero-eyebrow">CUSTOMER SERVICE</p>
        <h1>Shipping &amp; Returns</h1>
        <p class="hero-sub">Everything you need to know about delivery, costs and our return policy.</p>
      </div>
    </section>

    <section class="shipping-body">
      <div class="shipping-container">

        <!-- Quick info cards -->
        <div class="shipping-cards">
          <div class="ship-card">
            <span class="material-symbols-outlined card-icon">local_shipping</span>
            <h3>Fast Delivery</h3>
            <p>1–5 business days depending on your location in the Dominican Republic.</p>
          </div>
          <div class="ship-card">
            <span class="material-symbols-outlined card-icon">redeem</span>
            <h3>Free Shipping</h3>
            <p>Orders over RD$3,000 ship for free to any eligible address.</p>
          </div>
          <div class="ship-card">
            <span class="material-symbols-outlined card-icon">assignment_return</span>
            <h3>Easy Returns</h3>
            <p>Unopened products can be returned within 7 days of receipt.</p>
          </div>
        </div>

        <!-- Shipping sections -->
        <div v-for="section in sections" :key="section.id" :id="section.id" class="shipping-section">
          <h2>{{ section.title }}</h2>
          <div v-for="(block, i) in section.content" :key="i">
            <h4 v-if="block.subtitle">{{ block.subtitle }}</h4>
            <p v-if="block.text">{{ block.text }}</p>
            <ul v-if="block.list">
              <li v-for="item in block.list" :key="item">{{ item }}</li>
            </ul>
            <div v-if="block.table" class="cost-table">
              <div v-for="row in block.table" :key="row.zone" class="cost-row" :class="{ 'cost-row--free': row.free }">
                <span class="cost-zone">{{ row.zone }}</span>
                <span class="cost-time">{{ row.time }}</span>
                <span class="cost-price" :class="{ 'free-label': row.free }">{{ row.price }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA: track order -->
        <div class="shipping-cta">
          <div class="cta-text">
            <h3>Track Your Order</h3>
            <p>Already placed an order? Log in to view your order status and delivery details in real time.</p>
          </div>
          <RouterLink to="/pedidos" class="cta-btn">View My Orders</RouterLink>
        </div>

        <!-- Contact box -->
        <div class="shipping-help">
          <span class="material-symbols-outlined help-icon">support_agent</span>
          <div>
            <h4>Need help with a shipment or return?</h4>
            <p>Contact our team at <a href="mailto:soporte@pharmadermrd.com">soporte@pharmadermrd.com</a> or visit our <RouterLink to="/contact">Contact page</RouterLink>. We respond within one business day.</p>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const sections = [
  {
    id: 'delivery-areas',
    title: 'Delivery Areas',
    content: [
      {
        text: 'PharmaDerm currently delivers to addresses throughout the Dominican Republic. At checkout, enter your city to calculate the applicable shipping cost. We do not currently offer international shipping.',
      },
    ],
  },
  {
    id: 'shipping-costs',
    title: 'Shipping Costs & Estimated Times',
    content: [
      {
        text: 'Shipping fees are calculated based on your delivery city:',
        table: [
          { zone: 'Santiago', time: '1–2 business days', price: 'RD$150' },
          { zone: 'Santo Domingo / Distrito Nacional', time: '2–3 business days', price: 'RD$200' },
          { zone: 'Other regions', time: '3–5 business days', price: 'RD$300' },
          { zone: 'Orders over RD$3,000 — any zone', time: 'Standard delivery', price: 'FREE', free: true },
        ],
      },
    ],
  },
  {
    id: 'free-shipping',
    title: 'Free Shipping Policy',
    content: [
      {
        text: 'Free shipping is automatically applied to all orders with a product subtotal of RD$3,000 or more. The discount is shown at checkout before you confirm your order.',
      },
      {
        text: 'Free shipping applies to all delivery zones within the Dominican Republic and is not combinable with other promotional shipping discounts unless explicitly stated.',
      },
    ],
  },
  {
    id: 'order-tracking',
    title: 'Order Tracking',
    content: [
      {
        text: 'Once your order is confirmed, you will receive an email with your order number and summary. You can check your order status at any time by logging in and visiting My Orders.',
      },
      {
        text: 'If you have not received your order within the estimated delivery window, please contact us at soporte@pharmadermrd.com with your order number.',
      },
    ],
  },
  {
    id: 'return-eligibility',
    title: 'Return Eligibility',
    content: [
      {
        text: 'We accept returns under the following conditions:',
        list: [
          'The product is unopened, sealed and in its original packaging.',
          'The return is requested within 7 calendar days of the delivery date.',
          'The product was not purchased during a final sale or clearance promotion.',
        ],
      },
      {
        subtitle: 'Products that cannot be returned',
        list: [
          'Opened or used skincare products, for hygiene and safety reasons.',
          'Products that have been damaged by the customer after delivery.',
          'Gift cards or promotional credits.',
        ],
      },
    ],
  },
  {
    id: 'return-process',
    title: 'Return Process',
    content: [
      {
        text: 'To initiate a return, follow these steps:',
        list: [
          'Contact us at soporte@pharmadermrd.com with your order number and the reason for the return.',
          'Our team will review your request and respond within one business day.',
          'If approved, you will receive instructions for returning the product.',
          'Once we receive and inspect the return, a refund will be processed within 5–7 business days to your original payment method.',
        ],
      },
    ],
  },
  {
    id: 'damaged-orders',
    title: 'Damaged or Incorrect Orders',
    content: [
      {
        text: 'If you received a damaged, defective or incorrect product, please contact us within 48 hours of delivery at soporte@pharmadermrd.com. Include your order number and photos of the issue.',
      },
      {
        text: 'We will arrange a replacement or issue a full refund at no additional cost to you.',
      },
    ],
  },
]
</script>

<style scoped>
.shipping-page { min-height: 100vh; background: #f8fafc; }

.shipping-hero {
  background: linear-gradient(135deg, #004e92 0%, #16a6e2 100%);
  padding: 4rem 1.5rem 3.5rem;
  text-align: center;
  color: white;
}
.hero-inner { max-width: 680px; margin: 0 auto; }
.hero-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: .14em; opacity: .7; margin: 0 0 .6rem; text-transform: uppercase; }
.shipping-hero h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; margin: 0 0 1rem; }
.hero-sub { font-size: 1.05rem; opacity: .85; margin: 0; line-height: 1.6; }

.shipping-body { padding: 3rem 1.5rem 5rem; }
.shipping-container { max-width: 860px; margin: 0 auto; }

/* Quick cards */
.shipping-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 3rem;
}
.ship-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}
.card-icon { font-size: 32px; color: #16a6e2; display: block; margin-bottom: .75rem; }
.ship-card h3 { font-size: .95rem; font-weight: 800; color: #111827; margin: 0 0 .4rem; }
.ship-card p { font-size: .88rem; color: #6b7280; margin: 0; line-height: 1.55; }

/* Sections */
.shipping-section { margin-bottom: 2.5rem; scroll-margin-top: 120px; }
.shipping-section h2 {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 1rem;
  padding-bottom: .5rem;
  border-bottom: 2px solid #e0f4ff;
}
.shipping-section h4 { font-size: .9rem; font-weight: 700; color: #004e92; margin: 1rem 0 .35rem; }
.shipping-section p { font-size: .93rem; color: #4b5563; line-height: 1.75; margin: 0 0 .75rem; }
.shipping-section ul { padding-left: 1.4rem; margin: 0 0 .75rem; }
.shipping-section li { font-size: .93rem; color: #4b5563; line-height: 1.7; margin-bottom: .35rem; }

/* Cost table */
.cost-table { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; margin: 1rem 0; }
.cost-row {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 12px;
  padding: .9rem 1.2rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: .93rem;
  align-items: center;
}
.cost-row:last-child { border-bottom: none; }
.cost-row--free { background: #f0fdf4; }
.cost-zone { font-weight: 600; color: #111827; }
.cost-time { color: #6b7280; font-size: .88rem; }
.cost-price { font-weight: 800; color: #004e92; text-align: right; white-space: nowrap; }
.free-label { color: #16a34a; }

/* CTA */
.shipping-cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  background: linear-gradient(135deg, #004e92 0%, #16a6e2 100%);
  border-radius: 14px;
  padding: 1.75rem 2rem;
  color: white;
  margin: 2.5rem 0;
  flex-wrap: wrap;
}
.cta-text h3 { font-size: 1.1rem; font-weight: 800; margin: 0 0 .35rem; }
.cta-text p { font-size: .9rem; opacity: .88; margin: 0; }
.cta-btn {
  display: inline-block;
  padding: .75rem 1.75rem;
  background: white;
  color: #004e92;
  font-weight: 800;
  font-size: .88rem;
  border-radius: 999px;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  transition: opacity .15s;
}
.cta-btn:hover { opacity: .9; }

/* Help box */
.shipping-help {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
}
.help-icon { font-size: 28px; color: #16a6e2; flex-shrink: 0; }
.shipping-help h4 { font-size: .93rem; font-weight: 700; color: #0f172a; margin: 0 0 .35rem; }
.shipping-help p { font-size: .9rem; color: #374151; margin: 0; line-height: 1.55; }
.shipping-help a { color: #004e92; }

@media (max-width: 680px) {
  .shipping-cards { grid-template-columns: 1fr; }
  .cost-row { grid-template-columns: 1fr 1fr; }
  .cost-time { display: none; }
  .shipping-cta { flex-direction: column; align-items: flex-start; }
}
</style>

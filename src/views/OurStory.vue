<template>
  <div class="story-page">

    <!-- Hero -->
    <section class="story-hero">
      <div class="container">
        <p class="eyebrow">OUR STORY</p>
        <h1>Reliable, accessible<br>and personalized<br>dermatological care</h1>
        <p class="hero-sub">PharmaDerm was created to bring quality dermatological products and real guidance closer to those who need them, without complications or unnecessary costs.</p>
        <div class="hero-actions">
          <button class="hero-cta" @click="router.push('/quiz')">Analyze my skin</button>
          <button class="hero-ghost" @click="router.push('/tienda')">View products</button>
        </div>
      </div>
    </section>

    <!-- Who we are -->
    <section class="about-section">
      <div class="container about-grid">
        <div class="about-text">
          <p class="eyebrow blue">WHO WE ARE</p>
          <h2>A dermatology-focused small business committed to your skin</h2>
          <p>PharmaDerm is a private small business dedicated to selling and distributing dermatological and skincare products. Our main focus is offering reliable, original and high-quality products, especially from recognized brands such as CeraVe and La Roche-Posay.</p>
          <p>We do more than sell products. We also provide basic guidance, recommendations by skin type and post-purchase follow-up so every customer can find what they truly need.</p>
          <p>We operate from <strong>Santiago de los Caballeros</strong>, with plans to expand nationwide through digital sales and shipping.</p>
        </div>
        <div class="about-highlights">
          <div v-for="h in highlights" :key="h.label" class="highlight-card">
            <div class="highlight-icon" :style="`background: ${h.color}`">
              <span v-html="h.svg"></span>
            </div>
            <strong>{{ h.label }}</strong>
            <p>{{ h.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission and Vision -->
    <section class="mission-section">
      <div class="container">
        <div class="mv-grid">
          <div class="mv-card mission">
            <p class="mv-label">MISSION</p>
            <h3>Why do we exist?</h3>
            <p>To offer quality, accessible and reliable dermatological products focused on skin care, health and well-being through responsible, efficient and personalized service supported by digital tools, basic guidance and organized internal processes that meet customer needs.</p>
          </div>
          <div class="mv-card vision">
            <p class="mv-label">VISION</p>
            <h3>Where are we going?</h3>
            <p>To progressively establish PharmaDerm as a dermatology-focused small business recognized for product quality, personalized care, service innovation and commitment to complete skin care, building a stable and competitive presence in the local market.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="values-section">
      <div class="container">
        <div class="section-heading center">
          <p class="eyebrow blue">WHAT DEFINES US</p>
          <h2>Our Values</h2>
          <p>These principles guide every decision, recommendation and interaction with our customers.</p>
        </div>
        <div class="values-grid">
          <div v-for="value in values" :key="value.title" class="value-card">
            <div class="value-dot" :style="`background: ${value.color}`"></div>
            <h3>{{ value.title }}</h3>
            <p>{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What makes us different -->
    <section class="diff-section">
      <div class="container diff-grid">
        <div>
          <p class="eyebrow blue">WHAT MAKES US DIFFERENT</p>
          <h2>More than a product store</h2>
          <p>PharmaDerm organizes its catalog by skin need, not just by brand. This makes shopping easier and reduces confusion. Our model includes:</p>
        </div>
        <div class="diff-list">
          <div v-for="d in differentiators" :key="d" class="diff-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#004e92" width="20" height="20"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            <span>{{ d }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Modelo de negocio -->
    <section class="model-section">
      <div class="container">
        <div class="section-heading center">
          <p class="eyebrow blue">HOW WE WORK</p>
          <h2>Our Digital Model</h2>
          <p>PharmaDerm starts as a digital store, bringing products directly to customers.</p>
        </div>
        <div class="model-steps">
          <div v-for="(step, i) in modelSteps" :key="step.title" class="model-step">
            <div class="step-number">{{ i + 1 }}</div>
            <h4>{{ step.title }}</h4>
            <p>{{ step.desc }}</p>
          </div>
        </div>
        <div class="channels-row">
          <span v-for="ch in channels" :key="ch" class="channel-chip">{{ ch }}</span>
        </div>
      </div>
    </section>

    <!-- Who we serve -->
    <section class="impact-section">
      <div class="container">
        <div class="section-heading center">
          <p class="eyebrow blue">WHO WE SERVE</p>
          <h2>Our Customers</h2>
          <p>PharmaDerm serves people who want to care for their skin with reliable products but do not always know where to start.</p>
        </div>
        <div class="impact-grid">
          <div v-for="segment in segments" :key="segment.title" class="impact-card">
            <div class="impact-badge" :style="`background: ${segment.color}`">{{ segment.initial }}</div>
            <h4>{{ segment.title }}</h4>
            <p>{{ segment.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Marcas -->
    <section class="brands-section">
      <div class="container">
        <div class="section-heading center">
          <p class="eyebrow blue">BRANDS WE WORK WITH</p>
          <h2>Recognized Dermatological Quality</h2>
          <p>We work exclusively with brands that have validated formulas and proven dermatological backing.</p>
        </div>
        <div class="brands-grid">
          <div v-for="brand in brands" :key="brand.name" class="brand-card">
            <div class="brand-logo" :style="`background: ${brand.color}`">{{ brand.initials }}</div>
            <h3>{{ brand.name }}</h3>
            <p>{{ brand.description }}</p>
            <div class="brand-tags">
              <span v-for="tag in brand.tags" :key="tag" class="brand-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Future outlook -->
    <section class="future-section">
      <div class="container future-grid">
        <div>
          <p class="eyebrow light">FUTURE OUTLOOK</p>
          <h2>Where We Are Headed</h2>
          <p>PharmaDerm is in its early stages and is working to grow in a solid and sustainable way. Our outlook includes:</p>
        </div>
        <div class="future-list">
          <div v-for="f in futureGoals" :key="f" class="future-item">
            <div class="future-dot"></div>
            <span>{{ f }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="story-cta">
      <div class="container">
        <h2>Start Your Routine Today</h2>
        <p>Complete the skin analysis, receive your personalized routine and access the right products for you.</p>
        <div class="cta-buttons">
          <button class="btn-primary" @click="router.push('/quiz')">Analyze my skin</button>
          <button class="btn-ghost" @click="router.push('/diagnostics')">Consult a specialist</button>
          <button class="btn-ghost" @click="router.push('/tienda')">View products</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const SVG_CHECK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>'
const SVG_HEART = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
const SVG_STAR  = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>'
const SVG_TRUCK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>'

const highlights = [
  { color: 'linear-gradient(135deg,#004e92,#5dbcd2)', svg: SVG_CHECK, label: 'Original products', desc: 'Only recognized brands with proven dermatological backing.' },
  { color: 'linear-gradient(135deg,#2d6a4f,#95d5b2)', svg: SVG_HEART, label: 'Personalized service', desc: 'Guidance before and after purchase based on your skin type.' },
  { color: 'linear-gradient(135deg,#9b2226,#e9c46a)', svg: SVG_STAR, label: 'Guaranteed quality', desc: 'We select safe and reliable products for each need.' },
  { color: 'linear-gradient(135deg,#023e8a,#0096c7)', svg: SVG_TRUCK, label: 'Home delivery', desc: 'We deliver in Santiago and are working toward nationwide shipping.' },
]

const values = [
  { title: 'Responsibility', color: '#004e92', description: 'We act with care when selecting, selling and recommending products related to skin health.' },
  { title: 'Quality', color: '#2d6a4f', description: 'We prioritize safe, original and reliable products from recognized dermatological brands.' },
  { title: 'Ethics', color: '#7b2d8b', description: 'We operate with transparency, honesty and respect for customers, suppliers and collaborators.' },
  { title: 'Customer commitment', color: '#9b2226', description: 'We provide close, clear and personalized attention before and after purchase.' },
  { title: 'Innovation', color: '#023e8a', description: 'We integrate digital tools, educational marketing and personalized recommendations to improve the customer experience.' },
  { title: 'Service', color: '#f77f00', description: 'We promote friendly, professional and efficient care that builds trust and loyalty.' },
  { title: 'Sustainability', color: '#2b9348', description: 'We develop responsible actions for the community and environment through education and conscious consumption.' },
]

const differentiators = [
  'Catalog organized by skin need, not only by brand',
  'Personalized skin analysis for each customer',
  'Basic guidance included: we do more than sell products',
  'Post-purchase follow-up to support results',
  'Educational marketing about real skin care',
  'Routine bundles built by skin type',
  'Only original products from dermatology-backed brands',
]

const modelSteps = [
  { title: 'Digital attraction', desc: 'Social media, educational posts, testimonials and promotions on Instagram, TikTok and WhatsApp Business.' },
  { title: 'Initial consultation', desc: 'The customer contacts us through WhatsApp or direct message and receives basic guidance by skin type and need.' },
  { title: 'Recommendation and sale', desc: 'Availability, price, payment method and address are confirmed. The order is prepared with secure packaging.' },
  { title: 'Delivery and follow-up', desc: 'Home delivery with basic usage instructions and post-purchase follow-up to support results.' },
]

const channels = ['Instagram', 'TikTok', 'WhatsApp Business', 'Digital catalog', 'Home delivery', 'Santiago de los Caballeros']

const segments = [
  { initial: 'Y', color: 'linear-gradient(135deg,#004e92,#5dbcd2)', title: 'Young people with acne', desc: 'Teens and young adults with excess oil, comedones or questions about basic routines.' },
  { initial: 'A', color: 'linear-gradient(135deg,#2d6a4f,#95d5b2)', title: 'Adults focused on prevention', desc: 'People interested in hydration, sun protection and preventive daily care.' },
  { initial: 'S', color: 'linear-gradient(135deg,#7b2d8b,#c77dff)', title: 'Sensitive skin', desc: 'Customers with irritated skin, a compromised barrier or frequent reactions to generic products.' },
  { initial: 'D', color: 'linear-gradient(135deg,#9b2226,#e9c46a)', title: 'Dark spots and uneven tone', desc: 'Adults interested in hyperpigmentation, sun spots and photoaging.' },
  { initial: 'H', color: 'linear-gradient(135deg,#f77f00,#fcbf49)', title: 'Hormonal changes', desc: 'Women in hormonal stages such as perimenopause or menopause who need routine adjustments.' },
  { initial: 'O', color: 'linear-gradient(135deg,#023e8a,#0096c7)', title: 'Original and reliable products', desc: 'Customers who want original dermatological products without depending only on large pharmacies.' },
]

const brands = [
  {
    name: 'La Roche-Posay',
    initials: 'LRP',
    color: '#004e92',
    description: 'A French dermocosmetic brand developed with dermatologists and recognized worldwide for formulas for sensitive skin, acne, dark spots and sun protection.',
    tags: ['SPF', 'Sensitive skin', 'Acne', 'Dark spots'],
  },
  {
    name: 'CeraVe',
    initials: 'CV',
    color: '#2d6a4f',
    description: 'Developed with dermatologists to restore and maintain the skin barrier using essential ceramides. Recommended for dry, sensitive and compromised skin.',
    tags: ['Barrier repair', 'Hydration', 'Accessible', 'Gentle'],
  },
]

const futureGoals = [
  'Expand inventory with new recognized dermatological brands',
  'Strengthen digital presence and educational marketing',
  'Build strategic partnerships with authorized suppliers',
  'Enable nationwide shipping to all provinces in the Dominican Republic',
  'Develop a physical service point when demand supports it',
  'Expand social responsibility programs focused on responsible skin care education',
]

</script>

<style scoped>
.story-page { background: #f8fafc; min-height: 100vh; }
.container { width: min(1280px, 92%); margin: 0 auto; }
.eyebrow { font-size: 0.75rem; letter-spacing: 0.22em; font-weight: 700; text-transform: uppercase; margin: 0 0 0.8rem; }
.eyebrow.blue { color: #004e92; }
.eyebrow.light { color: rgba(255,255,255,0.75); }

/* Hero */
.story-hero { background: linear-gradient(135deg,#004e92,#5dbcd2); padding: 6rem 0 5rem; color: white; }
.story-hero h1 { font-size: clamp(2.2rem, 5.5vw, 4.5rem); font-weight: 800; line-height: 1.1; margin: 0.5rem 0 1.2rem; }
.hero-sub { font-size: 1.1rem; max-width: 600px; line-height: 1.75; opacity: 0.92; margin: 0 0 2rem; }
.hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }
.hero-cta { background: white; color: #004e92; border: none; padding: 1rem 2rem; font-weight: 800; font-size: 1rem; cursor: pointer; border-radius: 999px; }
.hero-cta:hover { background: #eef5fd; }
.hero-ghost { background: transparent; color: white; border: 2px solid rgba(255,255,255,0.6); padding: 1rem 2rem; font-weight: 800; font-size: 1rem; cursor: pointer; border-radius: 999px; }
.hero-ghost:hover { background: rgba(255,255,255,0.1); }

/* About */
.about-section { padding: 5rem 0; background: white; }
.about-grid { display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 4rem; align-items: start; }
.about-text h2 { font-size: clamp(1.6rem, 2.8vw, 2.6rem); font-weight: 800; color: #0f172a; margin: 0.5rem 0 1.2rem; line-height: 1.2; }
.about-text p { color: #475569; line-height: 1.75; margin-bottom: 1rem; }
.about-highlights { display: grid; gap: 1rem; }
.highlight-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; }
.highlight-icon { width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; margin-bottom: 0.25rem; }
.highlight-card strong { font-size: 0.95rem; font-weight: 800; color: #0f172a; }
.highlight-card p { font-size: 0.83rem; color: #64748b; line-height: 1.55; margin: 0; }

/* Mission / Vision */
.mission-section { padding: 4rem 0; }
.mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.mv-card { border-radius: 24px; padding: 2.5rem; }
.mv-card.mission { background: linear-gradient(135deg,#004e92,#0077b6); color: white; }
.mv-card.vision { background: linear-gradient(135deg,#2d6a4f,#40916c); color: white; }
.mv-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; opacity: 0.8; margin: 0 0 0.5rem; }
.mv-card h3 { font-size: 1.3rem; font-weight: 800; margin: 0 0 1rem; }
.mv-card p { line-height: 1.75; opacity: 0.92; margin: 0; font-size: 0.95rem; }

/* Values */
.values-section { padding: 5rem 0; background: white; }
.section-heading { margin-bottom: 2rem; }
.section-heading.center { text-align: center; max-width: 700px; margin: 0 auto 2.5rem; }
.section-heading h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 800; color: #0f172a; margin: 0.3rem 0 0; }
.section-heading p { color: #64748b; margin: 0.6rem 0 0; line-height: 1.65; }
.values-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; }
.value-card { border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; transition: transform 0.2s, box-shadow 0.2s; }
.value-card:hover { transform: translateY(-4px); box-shadow: 0 14px 30px rgba(0,0,0,.08); }
.value-dot { width: 12px; height: 12px; border-radius: 50%; margin-bottom: 1rem; }
.value-card h3 { font-size: 1rem; font-weight: 800; color: #0f172a; margin: 0 0 0.5rem; }
.value-card p { font-size: 0.86rem; color: #64748b; line-height: 1.65; margin: 0; }

/* Diferenciadores */
.diff-section { padding: 5rem 0; }
.diff-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
.diff-grid h2 { font-size: clamp(1.6rem, 2.8vw, 2.4rem); font-weight: 800; color: #0f172a; margin: 0.5rem 0 1rem; }
.diff-grid > div:first-child > p { color: #64748b; line-height: 1.7; margin: 0; }
.diff-list { display: grid; gap: 0.75rem; }
.diff-item { display: flex; align-items: flex-start; gap: 0.75rem; background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.85rem 1rem; }
.diff-item svg { flex-shrink: 0; margin-top: 2px; }
.diff-item span { font-size: 0.9rem; color: #334155; line-height: 1.5; }

/* Modelo */
.model-section { padding: 5rem 0; background: white; }
.model-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.2rem; margin-bottom: 2rem; }
.model-step { text-align: center; padding: 1.5rem 1rem; }
.step-number { width: 44px; height: 44px; background: #004e92; color: white; font-size: 1.2rem; font-weight: 800; border-radius: 50%; display: grid; place-items: center; margin: 0 auto 1rem; }
.model-step h4 { font-size: 0.95rem; font-weight: 800; color: #0f172a; margin: 0 0 0.5rem; }
.model-step p { font-size: 0.84rem; color: #64748b; line-height: 1.6; margin: 0; }
.channels-row { display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; }
.channel-chip { background: #eef6ff; color: #004e92; font-size: 0.82rem; font-weight: 700; padding: 0.4rem 0.9rem; border-radius: 999px; }

/* Impact */
.impact-section { padding: 5rem 0; }
.impact-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.2rem; }
.impact-card { background: white; border: 1px solid #e2e8f0; border-radius: 20px; padding: 1.5rem; }
.impact-badge { width: 48px; height: 48px; border-radius: 14px; color: white; font-size: 1.3rem; font-weight: 900; display: grid; place-items: center; margin-bottom: 0.75rem; }
.impact-card h4 { font-size: 0.95rem; font-weight: 800; color: #0f172a; margin: 0 0 0.4rem; }
.impact-card p { font-size: 0.84rem; color: #64748b; line-height: 1.6; margin: 0; }

/* Brands */
.brands-section { padding: 5rem 0; background: white; }
.brands-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; max-width: 800px; margin: 0 auto; }
.brand-card { border: 1px solid #e2e8f0; border-radius: 24px; padding: 2rem; text-align: center; }
.brand-logo { width: 72px; height: 72px; color: white; font-size: 1.3rem; font-weight: 800; border-radius: 20px; display: grid; place-items: center; margin: 0 auto 1rem; }
.brand-card h3 { font-size: 1.2rem; font-weight: 800; color: #0f172a; margin: 0 0 0.6rem; }
.brand-card p { font-size: 0.9rem; color: #64748b; line-height: 1.65; margin: 0 0 1rem; }
.brand-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
.brand-tag { font-size: 0.72rem; font-weight: 700; background: #eef6ff; color: #004e92; padding: 0.25rem 0.6rem; border-radius: 999px; }

/* Future outlook */
.future-section { padding: 5rem 0; background: linear-gradient(135deg,#004e92,#183a6b); color: white; }
.future-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
.future-grid h2 { font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 800; color: white; margin: 0.5rem 0 1.2rem; }
.future-grid > div:first-child > p { color: rgba(255,255,255,0.85); line-height: 1.75; margin: 0; }
.future-list { display: grid; gap: 0.85rem; }
.future-item { display: flex; align-items: flex-start; gap: 0.75rem; }
.future-dot { width: 10px; height: 10px; background: #5dbcd2; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
.future-item span { font-size: 0.92rem; color: rgba(255,255,255,0.88); line-height: 1.6; }

/* CTA */
.story-cta { padding: 5rem 0; text-align: center; background: #f8fafc; }
.story-cta h2 { font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 800; color: #0f172a; margin: 0 0 1rem; }
.story-cta p { color: #64748b; font-size: 1.1rem; margin: 0 0 2rem; }
.cta-buttons { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
.btn-primary { background: #004e92; color: white; border: none; padding: 1rem 2rem; font-weight: 800; cursor: pointer; border-radius: 999px; font-size: 1rem; }
.btn-primary:hover { background: #003b71; }
.btn-ghost { background: transparent; color: #004e92; border: 2px solid #004e92; padding: 1rem 2rem; font-weight: 800; cursor: pointer; border-radius: 999px; font-size: 1rem; }
.btn-ghost:hover { background: #eef5fd; }

/* Responsive */
@media (max-width: 1100px) {
  .about-grid, .mv-grid, .diff-grid, .future-grid { grid-template-columns: 1fr; gap: 2rem; }
  .values-grid { grid-template-columns: repeat(2, 1fr); }
  .model-steps { grid-template-columns: repeat(2, 1fr); }
  .impact-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .values-grid, .brands-grid, .impact-grid { grid-template-columns: 1fr; }
  .model-steps { grid-template-columns: 1fr; }
}
</style>

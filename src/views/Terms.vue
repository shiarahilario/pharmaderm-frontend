<template>
  <div class="policy-page">

    <section class="policy-hero">
      <div class="hero-inner">
        <p class="hero-eyebrow">LEGAL</p>
        <h1>Terms &amp; Conditions</h1>
        <p class="hero-sub">Last updated: May 2026</p>
      </div>
    </section>

    <section class="policy-body">
      <div class="policy-container">

        <p class="policy-intro">
          Please read these Terms and Conditions carefully before using PharmaDerm's website and services. By accessing or using our platform, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services.
        </p>

        <div v-for="section in sections" :key="section.id" :id="section.id" class="policy-section">
          <h2>{{ section.title }}</h2>
          <div v-for="(block, i) in section.content" :key="i">
            <h4 v-if="block.subtitle">{{ block.subtitle }}</h4>
            <p v-if="block.text">{{ block.text }}</p>
            <ul v-if="block.list">
              <li v-for="item in block.list" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <div class="policy-contact">
          <h2>Contact Information</h2>
          <p>If you have questions about these Terms and Conditions, please contact us:</p>
          <p><strong>Email:</strong> <a href="mailto:soporte@pharmadermrd.com">soporte@pharmadermrd.com</a></p>
          <p><strong>Location:</strong> Santiago, Dominican Republic</p>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
const sections = [
  {
    id: 'use-of-site',
    title: '1. Use of the Site',
    content: [
      {
        text: 'PharmaDerm grants you a limited, non-exclusive, non-transferable license to access and use our website for personal, non-commercial purposes. You agree not to:',
        list: [
          'Use the site for any unlawful purpose or in violation of applicable regulations',
          'Attempt to gain unauthorized access to any part of our platform or systems',
          'Transmit any harmful, offensive or disruptive content',
          'Interfere with the security or proper functioning of the site',
          'Use automated tools to scrape, crawl or extract data from the site without permission',
        ],
      },
    ],
  },
  {
    id: 'user-accounts',
    title: '2. User Accounts',
    content: [
      {
        text: 'To access certain features of our platform, including placing orders and booking appointments, you must create an account. You are responsible for:',
        list: [
          'Providing accurate and up-to-date registration information',
          'Maintaining the confidentiality of your account password',
          'All activities that occur under your account',
          'Notifying us immediately if you suspect unauthorized use of your account',
        ],
      },
      {
        text: 'We reserve the right to suspend or terminate accounts that violate these terms or that engage in fraudulent activity.',
      },
    ],
  },
  {
    id: 'product-information',
    title: '3. Product Information',
    content: [
      {
        text: 'We strive to provide accurate product descriptions, images and pricing information. However, we do not warrant that product descriptions or other content on our site are completely accurate, complete or error-free.',
      },
      {
        text: 'Product availability is subject to change. In the event that a product is unavailable after your order is placed, we will notify you and offer an alternative or a full refund.',
      },
      {
        subtitle: 'Medical Disclaimer',
        text: 'The skincare information, product recommendations, skin analysis results and routine suggestions provided on our platform are for informational purposes only. They do not constitute medical advice and do not replace consultation with a qualified dermatologist or healthcare professional.',
      },
    ],
  },
  {
    id: 'orders-payments',
    title: '4. Orders and Payments',
    content: [
      {
        text: 'By placing an order through PharmaDerm, you represent that you are authorized to use the payment method provided. All orders are subject to acceptance and availability.',
      },
      {
        text: 'Prices are displayed in Dominican Pesos (DOP) or US Dollars (USD) based on your regional settings. We reserve the right to modify prices at any time, but price changes will not affect orders already confirmed.',
      },
      {
        text: 'We accept the following payment methods:',
        list: [
          'Credit and debit cards (Visa, Mastercard)',
          'Bank transfers to our registered accounts',
          'Cash on delivery (for eligible areas)',
        ],
      },
      {
        text: 'Payment transactions are processed securely. PharmaDerm does not store full payment card details on its servers.',
      },
    ],
  },
  {
    id: 'appointments',
    title: '5. Appointments and Professional Services',
    content: [
      {
        text: 'PharmaDerm provides a platform to book consultations with dermatologists and skincare specialists. By booking an appointment, you agree to:',
        list: [
          'Provide accurate health and contact information',
          'Attend your appointment at the scheduled time or cancel with reasonable notice',
          'Understand that appointment availability is managed by each specialist independently',
        ],
      },
      {
        text: 'PharmaDerm acts as an intermediary platform connecting patients with professionals. The professional relationship and medical advice are between you and the dermatologist. PharmaDerm is not liable for the outcomes of professional consultations.',
      },
    ],
  },
  {
    id: 'intellectual-property',
    title: '6. Intellectual Property',
    content: [
      {
        text: 'All content on this website, including but not limited to text, graphics, logos, icons, images, video content, routines and software, is the property of PharmaDerm or its content suppliers and is protected by applicable intellectual property laws.',
      },
      {
        text: 'You may not reproduce, distribute, transmit, create derivative works from or commercially exploit any content on this site without prior written permission from PharmaDerm.',
      },
    ],
  },
  {
    id: 'liability',
    title: '7. Limitation of Liability',
    content: [
      {
        text: 'To the maximum extent permitted by law, PharmaDerm and its directors, employees and partners shall not be liable for any indirect, incidental, special or consequential damages arising from your use of our platform or services, including:',
        list: [
          'Loss of data or business interruption',
          'Inaccuracies in product recommendations or skin analysis results',
          'Outcomes of dermatological consultations',
          'Delays or errors in order fulfillment',
        ],
      },
      {
        text: 'Our total liability in connection with any claim arising from these terms shall not exceed the amount you paid for the specific product or service giving rise to the claim.',
      },
    ],
  },
  {
    id: 'shipping-returns',
    title: '8. Shipping and Returns',
    content: [
      {
        text: 'Our shipping costs, delivery times and return eligibility are detailed on our Shipping and Returns page. By placing an order, you agree to the shipping and return policies currently in effect.',
      },
    ],
  },
  {
    id: 'changes',
    title: '9. Changes to These Terms',
    content: [
      {
        text: 'We reserve the right to modify these Terms and Conditions at any time. Significant changes will be communicated via email or a prominent notice on our website. Continued use of our services after changes take effect constitutes your acceptance of the revised terms.',
      },
    ],
  },
]
</script>

<style scoped>
.policy-page { min-height: 100vh; background: #f8fafc; }

.policy-hero {
  background: linear-gradient(135deg, #004e92 0%, #16a6e2 100%);
  padding: 4rem 1.5rem 3.5rem;
  text-align: center;
  color: white;
}
.hero-inner { max-width: 680px; margin: 0 auto; }
.hero-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: .14em; opacity: .7; margin: 0 0 .6rem; text-transform: uppercase; }
.policy-hero h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; margin: 0 0 .75rem; }
.hero-sub { font-size: 1rem; opacity: .75; margin: 0; }

.policy-body { padding: 3rem 1.5rem 5rem; }
.policy-container { max-width: 820px; margin: 0 auto; }

.policy-intro {
  font-size: .97rem;
  color: #374151;
  line-height: 1.8;
  margin: 0 0 2rem;
  padding: 1.5rem;
  background: white;
  border-left: 4px solid #16a6e2;
  border-radius: 0 8px 8px 0;
}

.policy-section { margin-bottom: 2.5rem; scroll-margin-top: 120px; }
.policy-section h2 {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 1rem;
  padding-bottom: .5rem;
  border-bottom: 2px solid #e0f4ff;
}
.policy-section h4 { font-size: .9rem; font-weight: 700; color: #004e92; margin: 1rem 0 .35rem; }
.policy-section p { font-size: .93rem; color: #4b5563; line-height: 1.75; margin: 0 0 .75rem; }
.policy-section ul { padding-left: 1.4rem; margin: 0 0 .75rem; }
.policy-section li { font-size: .93rem; color: #4b5563; line-height: 1.7; margin-bottom: .35rem; }

.policy-contact {
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  margin-top: 1rem;
}
.policy-contact h2 { font-size: 1rem; font-weight: 800; color: #004e92; margin: 0 0 .75rem; }
.policy-contact p { font-size: .93rem; color: #374151; margin: 0 0 .4rem; }
.policy-contact a { color: #004e92; }
</style>

<template>
  <div class="policy-page">

    <section class="policy-hero">
      <div class="hero-inner">
        <p class="hero-eyebrow">LEGAL</p>
        <h1>Privacy Policy</h1>
        <p class="hero-sub">Last updated: May 2026</p>
      </div>
    </section>

    <section class="policy-body">
      <div class="policy-container">

        <p class="policy-intro">
          PharmaDerm ("we", "our" or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use and protect your personal information when you use our website and services, including our online store, dermatological appointment booking system and skin analysis tools.
        </p>

        <div class="policy-toc">
          <h3>Contents</h3>
          <ol>
            <li v-for="section in sections" :key="section.id">
              <a :href="'#' + section.id">{{ section.title }}</a>
            </li>
          </ol>
        </div>

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
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or how we handle your data, please contact us:</p>
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
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: [
      {
        subtitle: 'Account Information',
        text: 'When you create an account, we collect your first and last name, email address, phone number and date of birth. This information is required to provide you with our services.',
      },
      {
        subtitle: 'Order Information',
        text: 'When you place an order, we collect your shipping address, contact details and payment method information. Note that payment card details are processed securely and are not stored on our servers.',
      },
      {
        subtitle: 'Appointment Information',
        text: 'When you book a dermatological appointment, we collect information about the type of consultation, your reason for the visit and any notes you provide.',
      },
      {
        subtitle: 'Skin Analysis Data',
        text: 'When you use our skin analysis tools, we collect your responses to the skin questionnaire, including skin type, concerns and lifestyle preferences. This data is used solely to generate personalized product and routine recommendations.',
      },
      {
        subtitle: 'Technical Information',
        text: 'We automatically collect certain technical information when you visit our site, including your IP address, browser type, device type and pages visited. This helps us improve our services and ensure security.',
      },
    ],
  },
  {
    id: 'how-we-use',
    title: '2. How We Use Your Information',
    content: [
      {
        text: 'We use the information we collect to:',
        list: [
          'Create and manage your account',
          'Process and fulfill your orders',
          'Send order confirmation and shipping updates',
          'Manage and confirm your appointments',
          'Generate personalized skincare recommendations and routines',
          'Send promotional communications if you have opted in',
          'Improve and personalize your experience on our platform',
          'Comply with applicable laws and regulations',
          'Prevent fraud and maintain the security of our services',
        ],
      },
    ],
  },
  {
    id: 'cookies',
    title: '3. Cookies and Tracking Technologies',
    content: [
      {
        text: 'We use cookies and similar tracking technologies to enhance your experience on our site. Cookies are small text files stored on your device that help us recognize you on future visits and maintain your session.',
      },
      {
        text: 'We use the following types of cookies:',
        list: [
          'Essential cookies: Required for the site to function, including authentication and shopping cart functionality.',
          'Preference cookies: Remember your settings and preferences for future visits.',
          'Analytics cookies: Help us understand how visitors use our site so we can improve it.',
        ],
      },
      {
        text: 'You can control cookies through your browser settings. Disabling essential cookies may affect the functionality of our services.',
      },
    ],
  },
  {
    id: 'data-sharing',
    title: '4. Data Sharing',
    content: [
      {
        text: 'We do not sell your personal data. We may share your information in the following limited circumstances:',
        list: [
          'With service providers who assist in operating our platform (e.g., payment processors, email delivery services, cloud infrastructure), under strict confidentiality obligations.',
          'With dermatologists and healthcare professionals in connection with your appointment bookings.',
          'If required by law, regulation or legal process.',
          'In the event of a business merger or acquisition, with appropriate notice provided to you.',
        ],
      },
    ],
  },
  {
    id: 'data-protection',
    title: '5. Data Protection',
    content: [
      {
        text: 'We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure or destruction. These measures include encrypted data transmission (HTTPS), secure storage via Supabase infrastructure, and access controls.',
      },
      {
        text: 'While we take data security seriously, no transmission over the internet is completely secure. We encourage you to use strong, unique passwords for your account.',
      },
    ],
  },
  {
    id: 'your-rights',
    title: '6. Your Rights',
    content: [
      {
        text: 'You have the following rights with respect to your personal data:',
        list: [
          'Access: Request a copy of the personal data we hold about you.',
          'Correction: Request that we correct inaccurate or incomplete information.',
          'Deletion: Request that we delete your account and associated data.',
          'Opt-out: Unsubscribe from marketing communications at any time.',
          'Portability: Request your data in a portable format where applicable.',
        ],
      },
      {
        text: 'To exercise any of these rights, please contact us at soporte@pharmadermrd.com.',
      },
    ],
  },
  {
    id: 'retention',
    title: '7. Data Retention',
    content: [
      {
        text: 'We retain your personal data for as long as your account is active or as necessary to provide our services. Order and appointment records may be retained for up to 5 years for legal and accounting purposes. Skin analysis data is retained for as long as you have an active account.',
      },
    ],
  },
  {
    id: 'changes',
    title: '8. Changes to This Policy',
    content: [
      {
        text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or applicable regulations. When we make significant changes, we will notify you by email or by displaying a notice on our website. We encourage you to review this policy periodically.',
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

.policy-toc {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem 2rem;
  margin-bottom: 2.5rem;
}
.policy-toc h3 { font-size: .8rem; font-weight: 800; text-transform: uppercase; letter-spacing: .1em; color: #6b7280; margin: 0 0 .75rem; }
.policy-toc ol { margin: 0; padding-left: 1.2rem; }
.policy-toc li { margin-bottom: .35rem; }
.policy-toc a { font-size: .9rem; color: #004e92; text-decoration: none; }
.policy-toc a:hover { text-decoration: underline; }

.policy-section {
  margin-bottom: 2.5rem;
  scroll-margin-top: 120px;
}
.policy-section h2 {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 1rem;
  padding-bottom: .5rem;
  border-bottom: 2px solid #e0f4ff;
}
.policy-section h4 {
  font-size: .9rem;
  font-weight: 700;
  color: #004e92;
  margin: 1rem 0 .35rem;
}
.policy-section p {
  font-size: .93rem;
  color: #4b5563;
  line-height: 1.75;
  margin: 0 0 .75rem;
}
.policy-section ul {
  padding-left: 1.4rem;
  margin: 0 0 .75rem;
}
.policy-section li {
  font-size: .93rem;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: .35rem;
}

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

<template>
  <div class="access-page">

    <section class="access-hero">
      <div class="hero-inner">
        <p class="hero-eyebrow">INCLUSION</p>
        <h1>Accessibility</h1>
        <p class="hero-sub">PharmaDerm is committed to making our digital services accessible to everyone.</p>
      </div>
    </section>

    <section class="access-body">
      <div class="access-container">

        <p class="access-intro">
          We believe that everyone deserves access to quality skincare information and services, regardless of ability. This page outlines our commitment to digital accessibility and how we are working to improve the experience for all users.
        </p>

        <div v-for="section in sections" :key="section.id" :id="section.id" class="access-section">
          <h2>{{ section.title }}</h2>
          <div v-for="(block, i) in section.content" :key="i">
            <h4 v-if="block.subtitle">{{ block.subtitle }}</h4>
            <p v-if="block.text">{{ block.text }}</p>
            <ul v-if="block.list">
              <li v-for="item in block.list" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <div class="access-contact">
          <span class="material-symbols-outlined contact-icon">accessibility_new</span>
          <div>
            <h3>Accessibility Feedback</h3>
            <p>We welcome your feedback on the accessibility of PharmaDerm. If you encounter any barriers or have suggestions for improvement, please contact us:</p>
            <p><strong>Email:</strong> <a href="mailto:soporte@pharmadermrd.com">soporte@pharmadermrd.com</a></p>
            <p>We aim to respond to accessibility inquiries within two business days.</p>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
const sections = [
  {
    id: 'commitment',
    title: 'Our Accessibility Commitment',
    content: [
      {
        text: 'PharmaDerm is committed to ensuring digital accessibility for people with disabilities. We are continually working to improve the user experience for everyone and apply relevant accessibility standards to our platform.',
      },
      {
        text: 'Our goal is to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA, as outlined by the World Wide Web Consortium (W3C). These guidelines explain how to make web content more accessible to people with disabilities.',
      },
    ],
  },
  {
    id: 'measures',
    title: 'Measures We Take',
    content: [
      {
        text: 'To support accessibility, PharmaDerm takes the following measures:',
        list: [
          'Include accessibility as part of our mission and product development process.',
          'Provide training and guidance to our development team on accessibility best practices.',
          'Use semantic HTML to support screen readers and assistive technologies.',
          'Ensure sufficient color contrast ratios across all visual elements.',
          'Provide text alternatives for non-text content such as images and icons.',
          'Design all interactive elements to be keyboard-navigable.',
          'Test our interface across popular assistive technologies including screen readers.',
          'Review and improve accessibility as part of each product update cycle.',
        ],
      },
    ],
  },
  {
    id: 'compatibility',
    title: 'Compatibility',
    content: [
      {
        text: 'PharmaDerm is designed to be compatible with the following assistive technologies and browsers:',
        list: [
          'Screen readers: NVDA (Windows), VoiceOver (macOS and iOS), TalkBack (Android)',
          'Browsers: Google Chrome, Mozilla Firefox, Safari, Microsoft Edge (latest versions)',
          'Operating systems: Windows 10+, macOS 12+, iOS 15+, Android 10+',
        ],
      },
      {
        text: 'For the best experience, we recommend using the latest version of your preferred browser with up-to-date assistive software.',
      },
    ],
  },
  {
    id: 'known-issues',
    title: 'Known Limitations',
    content: [
      {
        text: 'While we strive to meet accessibility standards, some areas of our platform are still being improved. Known limitations include:',
        list: [
          'Some older product images may lack detailed alt text descriptions — we are in the process of updating these.',
          'Certain animated elements in the hero banner may move without a pause control — we intend to add a motion control option in a future update.',
          'The skin analysis quiz includes visual-only elements that we are working to make fully accessible.',
        ],
      },
      {
        text: 'If you encounter issues not listed here, please report them using the contact information below.',
      },
    ],
  },
  {
    id: 'improvements',
    title: 'Ongoing Improvements',
    content: [
      {
        text: 'Accessibility is an ongoing effort at PharmaDerm. We conduct regular audits of our platform and prioritize accessibility improvements in our development roadmap. We are committed to:',
        list: [
          'Conducting accessibility reviews with each major release.',
          'Responding to user-reported accessibility issues promptly.',
          'Consulting with users with disabilities to better understand real-world needs.',
          'Staying current with evolving accessibility standards and best practices.',
        ],
      },
    ],
  },
  {
    id: 'third-party',
    title: 'Third-Party Content',
    content: [
      {
        text: 'Some content on our platform is provided by third-party services (such as payment processors and mapping tools). While we make every effort to work with accessible third-party providers, we cannot fully control the accessibility of externally hosted content.',
      },
    ],
  },
]
</script>

<style scoped>
.access-page { min-height: 100vh; background: #f8fafc; }

.access-hero {
  background: linear-gradient(135deg, #004e92 0%, #16a6e2 100%);
  padding: 4rem 1.5rem 3.5rem;
  text-align: center;
  color: white;
}
.hero-inner { max-width: 680px; margin: 0 auto; }
.hero-eyebrow { font-size: 11px; font-weight: 800; letter-spacing: .14em; opacity: .7; margin: 0 0 .6rem; text-transform: uppercase; }
.access-hero h1 { font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 800; margin: 0 0 1rem; }
.hero-sub { font-size: 1.05rem; opacity: .85; margin: 0; line-height: 1.6; }

.access-body { padding: 3rem 1.5rem 5rem; }
.access-container { max-width: 820px; margin: 0 auto; }

.access-intro {
  font-size: .97rem;
  color: #374151;
  line-height: 1.8;
  margin: 0 0 2rem;
  padding: 1.5rem;
  background: white;
  border-left: 4px solid #16a6e2;
  border-radius: 0 8px 8px 0;
}

.access-section { margin-bottom: 2.5rem; scroll-margin-top: 120px; }
.access-section h2 {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 1rem;
  padding-bottom: .5rem;
  border-bottom: 2px solid #e0f4ff;
}
.access-section h4 { font-size: .9rem; font-weight: 700; color: #004e92; margin: 1rem 0 .35rem; }
.access-section p { font-size: .93rem; color: #4b5563; line-height: 1.75; margin: 0 0 .75rem; }
.access-section ul { padding-left: 1.4rem; margin: 0 0 .75rem; }
.access-section li { font-size: .93rem; color: #4b5563; line-height: 1.7; margin-bottom: .35rem; }

.access-contact {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 14px;
  padding: 1.5rem 1.75rem;
  margin-top: 1rem;
}
.contact-icon { font-size: 36px; color: #16a6e2; flex-shrink: 0; }
.access-contact h3 { font-size: 1rem; font-weight: 800; color: #004e92; margin: 0 0 .5rem; }
.access-contact p { font-size: .9rem; color: #374151; margin: 0 0 .4rem; line-height: 1.6; }
.access-contact a { color: #004e92; }
</style>

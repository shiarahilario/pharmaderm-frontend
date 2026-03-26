<template>
  <div class="confirmation-page">
    <header class="shop-header">
      <div class="top-promos">
        <div>YOUR APPOINTMENT HAS BEEN SUCCESSFULLY SCHEDULED</div>
      </div>

      <div class="header-main container">
        <div class="brand" @click="$router.push('/inicio')">
          <img :src="logoSrc" alt="PharmaDerm" class="logo" />
          <span class="brand-text">PharmaDerm<span class="brand-accent">RD</span></span>
        </div>

        <nav class="desktop-nav">
          <button class="nav-link" @click="$router.push('/inicio')">HOME</button>
          <button class="nav-link" @click="$router.push('/tienda')">SHOP</button>
          <button class="nav-link" @click="$router.push('/diagnostics')">DIAGNOSTICS</button>
          <button class="nav-link" @click="$router.push('/perfil')">PROFILE</button>
        </nav>
      </div>
    </header>

    <section class="hero-section">
      <div class="container hero-inner">
        <div class="success-icon">✓</div>
        <p class="eyebrow">CONFIRMATION</p>
        <h1>Your dermatology appointment is confirmed</h1>
        <p class="hero-text">
          We saved your case details, selected dermatologist and consultation preferences.
          You can now continue browsing your recommended skincare routine.
        </p>
      </div>
    </section>

    <section class="content-section">
      <div class="container confirmation-layout">
        <div class="confirmation-card">
          <h2>Appointment Details</h2>

          <div class="detail-row">
            <span>Confirmation code</span>
            <strong>{{ appointment.confirmationCode || "Pending" }}</strong>
          </div>

          <div class="detail-row">
            <span>Status</span>
            <strong>{{ appointment.status || "Confirmed" }}</strong>
          </div>

          <div class="detail-row">
            <span>Dermatologist</span>
            <strong>{{ appointment.doctor?.name || "Not available" }}</strong>
          </div>

          <div class="detail-row">
            <span>Specialty</span>
            <strong>{{ appointment.doctor?.specialty || "Not available" }}</strong>
          </div>

          <div class="detail-row">
            <span>Appointment type</span>
            <strong>{{ appointment.diagnostics?.appointmentType || "Not specified" }}</strong>
          </div>

          <div class="detail-row">
            <span>Date</span>
            <strong>{{ appointment.diagnostics?.date || "Not specified" }}</strong>
          </div>

          <div class="detail-row">
            <span>Time</span>
            <strong>{{ appointment.diagnostics?.time || "Not specified" }}</strong>
          </div>

          <div class="detail-row">
            <span>Main concern</span>
            <strong>{{ mainConcern }}</strong>
          </div>
        </div>

        <div class="side-column">
          <div class="mini-card">
            <h3>What happens next?</h3>
            <ul>
              <li>Your case remains saved in your PharmaDerm profile.</li>
              <li>Your dermatologist can review your submitted details.</li>
              <li>You can continue shopping based on your skin profile.</li>
            </ul>
          </div>

          <div class="mini-card">
            <h3>Suggested next action</h3>
            <p>Explore products aligned with your current skin concerns and routine focus.</p>
            <button class="primary-btn full" @click="$router.push('/tienda')">
              Shop recommended care
            </button>
          </div>

          <div class="mini-card">
            <h3>Need to adjust your case?</h3>
            <p>You can return to Diagnostics to modify your case details and consultation preferences.</p>
            <button class="ghost-btn full" @click="$router.push('/diagnostics')">
              Back to Diagnostics
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AppointmentConfirmation",
  data() {
    return {
      logoSrc: "/images/pharmaderm-logo.png",
      appointment: {}
    };
  },
  computed: {
    mainConcern() {
      return this.appointment.quizSummary?.concerns?.[0] || "Skin texture";
    }
  },
  mounted() {
    const saved = localStorage.getItem("pharmadermAppointment");
    if (saved) {
      try {
        this.appointment = JSON.parse(saved);
      } catch (error) {
        console.error("Error loading appointment:", error);
      }
    }
  }
};
</script>

<style scoped>
.confirmation-page {
  min-height: 100vh;
  background: #f7f8fb;
  color: #133b63;
  font-family: "Inter", "Segoe UI", sans-serif;
}

.container {
  width: min(1200px, 92%);
  margin: 0 auto;
}

.shop-header {
  background: rgba(255, 255, 255, 0.94);
  border-bottom: 1px solid rgba(19, 59, 99, 0.08);
}

.top-promos {
  background: #133b63;
  color: white;
  text-align: center;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  padding: 0.75rem 1rem;
}

.header-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 78px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
}

.logo {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.brand-text {
  font-size: 1.25rem;
  font-weight: 700;
}

.brand-accent {
  color: #84b6f4;
}

.desktop-nav {
  display: flex;
  gap: 1.2rem;
}

.nav-link {
  background: transparent;
  border: none;
  color: #133b63;
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;
}

.hero-section {
  padding: 4rem 0 2.5rem;
  text-align: center;
  background: linear-gradient(135deg, rgba(233, 242, 252, 0.95), rgba(247, 248, 251, 0.98));
}

.success-icon {
  width: 86px;
  height: 86px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 auto 1.2rem;
  background: linear-gradient(135deg, #133b63, #4d82bc);
  color: white;
  font-size: 2rem;
  font-weight: 700;
}

.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: #4c79aa;
  margin-bottom: 0.9rem;
}

.hero-inner h1 {
  margin: 0 0 1rem;
  font-size: clamp(2rem, 4vw, 3.5rem);
  letter-spacing: -0.03em;
}

.hero-text {
  max-width: 700px;
  margin: 0 auto;
  color: #5f748f;
  line-height: 1.8;
  font-size: 1.05rem;
}

.content-section {
  padding: 3rem 0 4rem;
}

.confirmation-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.4rem;
}

.confirmation-card,
.mini-card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(19, 59, 99, 0.08);
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(19, 59, 99, 0.06);
}

.confirmation-card {
  padding: 1.6rem;
}

.confirmation-card h2,
.mini-card h3 {
  margin-top: 0;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(19, 59, 99, 0.08);
}

.detail-row span {
  color: #6c829a;
}

.side-column {
  display: grid;
  gap: 1rem;
}

.mini-card {
  padding: 1.4rem;
}

.mini-card p,
.mini-card li {
  color: #5f748f;
  line-height: 1.7;
}

.primary-btn,
.ghost-btn {
  border: none;
  border-radius: 999px;
  padding: 0.95rem 1.25rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s ease;
}

.primary-btn {
  background: linear-gradient(135deg, #133b63, #4d82bc);
  color: white;
}

.ghost-btn {
  background: white;
  color: #133b63;
  border: 1px solid rgba(19, 59, 99, 0.12);
}

.full {
  width: 100%;
}

@media (max-width: 950px) {
  .confirmation-layout {
    grid-template-columns: 1fr;
  }

  .desktop-nav {
    display: none;
  }
}
</style>
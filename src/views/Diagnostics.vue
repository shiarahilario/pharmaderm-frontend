<template>
  <div class="diagnostics-page" @click="closeMenus">
    <header class="shop-header">
      <div class="top-promos">
        <div>FREE SHIPPING ON ORDERS OVER RD$3,000 • PHARMADERM SKINCARE EXPERIENCE</div>
      </div>

      <div class="header-main container">
        <div class="brand" @click="$router.push('/inicio')">
          <img :src="logoSrc" alt="PharmaDerm" class="logo" />
          <span class="brand-text">
            PharmaDerm<span class="brand-accent">RD</span>
          </span>
        </div>

        <nav class="desktop-nav">
          <button class="nav-link" @click="$router.push('/inicio')">HOME</button>
          <button class="nav-link" @click="$router.push('/tienda')">SHOP</button>
          <button class="nav-link active" @click="$router.push('/diagnostics')">DIAGNOSTICS</button>
          <button class="nav-link" @click="$router.push('/quiz')">SKIN QUIZ</button>
          <button class="nav-link" @click="$router.push('/perfil')">PROFILE</button>
        </nav>

        <div class="header-actions">
          <button class="icon-btn" @click.stop="searchOpen = !searchOpen">
            <span class="material-symbols-outlined">search</span>
          </button>

          <button class="icon-btn" @click.stop="profileOpen = !profileOpen">
            <span class="material-symbols-outlined">person</span>
          </button>

          <button class="icon-btn" @click="$router.push('/carrito')">
            <span class="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>

        <transition name="fade">
          <div v-if="searchOpen" class="search-popover" @click.stop>
            <div class="search-box">
              <span class="material-symbols-outlined">search</span>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search products, skin concerns, routines..."
              />
            </div>
          </div>
        </transition>

        <transition name="fade">
          <div v-if="profileOpen" class="profile-popover" @click.stop>
            <h4>Your PharmaDerm space</h4>
            <p>Review your skin case, appointments and personalized routine.</p>
            <button class="ghost-btn" @click="$router.push('/login')">Sign In</button>
            <button class="primary-btn small" @click="$router.push('/perfil')">View Profile</button>
          </div>
        </transition>
      </div>
    </header>

    <section class="diagnostics-hero">
      <div class="container diagnostics-hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">SKIN DIAGNOSTICS</p>
          <h1>Refine your skin profile before booking care</h1>
          <p class="hero-text">
            Your quiz already created an initial skin profile. Now you can add more symptoms,
            upload reference photos, review your analysis and book the right dermatologist.
          </p>

          <div class="hero-actions">
            <button class="primary-btn" @click="scrollToSection('detailsSection')">
              Continue diagnosis
            </button>
            <button class="ghost-btn" @click="scrollToSection('bookingSection')">
              Book appointment
            </button>
          </div>
        </div>

        <div class="hero-card">
          <div class="status-row">
            <span class="result-badge">{{ caseStatus }}</span>
            <span class="progress-pill">{{ completionProgress }}% complete</span>
          </div>

          <h3>Case Snapshot</h3>

          <div class="summary-list">
            <div class="summary-item">
              <span class="label">Skin type</span>
              <strong>{{ formattedSkinType }}</strong>
            </div>
            <div class="summary-item">
              <span class="label">Sensitivity</span>
              <strong>{{ formattedSensitivity }}</strong>
            </div>
            <div class="summary-item">
              <span class="label">Priority concern</span>
              <strong>{{ mainConcern }}</strong>
            </div>
            <div class="summary-item">
              <span class="label">Suggested consultation</span>
              <strong>{{ suggestedAppointmentType }}</strong>
            </div>
          </div>

          <p class="hero-card-note">
            PharmaDerm Diagnostics is a guided skincare tool and does not replace a dermatologist’s diagnosis.
          </p>
        </div>
      </div>
    </section>

    <section class="section-light">
      <div class="container">
        <div class="section-heading center">
          <p class="eyebrow">YOUR PROGRESS</p>
          <h2>From quiz to dermatologist support</h2>
          <p>Your experience is organized step by step so it feels guided and premium.</p>
        </div>

        <div class="timeline-grid">
          <div class="timeline-step completed">
            <div class="timeline-icon">✓</div>
            <h4>Quiz completed</h4>
            <p>Your initial skin profile was generated from the quiz.</p>
          </div>

          <div class="timeline-step" :class="{ completed: detailsCompleted }">
            <div class="timeline-icon">{{ detailsCompleted ? '✓' : '2' }}</div>
            <h4>Diagnostics completed</h4>
            <p>Add more symptoms, priorities and case details.</p>
          </div>

          <div class="timeline-step" :class="{ completed: !!selectedDoctor }">
            <div class="timeline-icon">{{ selectedDoctor ? '✓' : '3' }}</div>
            <h4>Doctor selected</h4>
            <p>Choose the dermatologist that best matches your case.</p>
          </div>

          <div class="timeline-step" :class="{ completed: bookingReady }">
            <div class="timeline-icon">{{ bookingReady ? '✓' : '4' }}</div>
            <h4>Appointment booked</h4>
            <p>Confirm your consultation and save your skin case.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-white">
      <div class="container">
        <div class="section-heading center">
          <p class="eyebrow">QUIZ OVERVIEW</p>
          <h2>Your initial skin profile</h2>
          <p>These values were brought in from your quiz and are now the base for diagnostics.</p>
        </div>

        <div class="quiz-summary-grid">
          <div class="summary-card">
            <h4>Skin Type</h4>
            <p>{{ formattedSkinType }}</p>
          </div>

          <div class="summary-card">
            <h4>Sensitivity</h4>
            <p>{{ formattedSensitivity }}</p>
          </div>

          <div class="summary-card">
            <h4>Main Concern</h4>
            <p>{{ mainConcern }}</p>
          </div>

          <div class="summary-card">
            <h4>Routine Focus</h4>
            <p>{{ quizSummary.routineFocus || 'Barrier support and personalized care' }}</p>
          </div>
        </div>

        <div class="case-overview-grid">
          <div v-if="casePhoto" class="selfie-card">
            <h3>Quiz Reference Selfie</h3>
            <img :src="casePhoto" alt="Quiz selfie" class="case-photo-preview" />
          </div>

          <div class="metrics-card">
            <h3>Quiz Analysis Metrics</h3>

            <div v-if="quizMetrics.length" class="metric-list">
              <div
                v-for="metric in quizMetrics"
                :key="metric.key"
                class="metric-item"
              >
                <div class="metric-head">
                  <span>{{ metric.label }}</span>
                  <strong>{{ Number(metric.score).toFixed(1) }}/10</strong>
                </div>
                <div class="metric-bar">
                  <div
                    class="metric-fill"
                    :style="{ width: ((metric.score / 10) * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>

            <p v-else class="muted-text">
              Quiz metrics will appear here once they are generated and saved from the quiz.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-light" ref="detailsSection">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">STEP 1</p>
          <h2>Tell us more about your skin today</h2>
          <p>Add details the quiz did not fully capture so your case feels more complete.</p>
        </div>

        <div class="details-layout">
          <div class="form-card">
            <label class="field-label">Describe what you are experiencing</label>
            <textarea
              v-model="form.description"
              rows="6"
              placeholder="Example: I have small bumps on my cheeks, visible pores around the nose, some redness and occasional tightness after cleansing."
            ></textarea>

            <div class="form-grid two">
              <div>
                <label class="field-label">How long has this been happening?</label>
                <select v-model="form.duration">
                  <option value="">Select an option</option>
                  <option>Just recently</option>
                  <option>1–2 weeks</option>
                  <option>1 month</option>
                  <option>Several months</option>
                  <option>More than a year</option>
                </select>
              </div>

              <div>
                <label class="field-label">How urgent does it feel?</label>
                <select v-model="form.urgency">
                  <option value="">Select urgency</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <label class="field-label">Symptoms</label>
            <div class="chips-grid">
              <button
                v-for="symptom in symptomsOptions"
                :key="symptom"
                class="chip"
                :class="{ active: form.symptoms.includes(symptom) }"
                @click.prevent="toggleArrayItem(form.symptoms, symptom)"
              >
                {{ symptom }}
              </button>
            </div>

            <label class="field-label">Affected areas</label>
            <div class="chips-grid">
              <button
                v-for="area in areaOptions"
                :key="area"
                class="chip"
                :class="{ active: form.areas.includes(area) }"
                @click.prevent="toggleArrayItem(form.areas, area)"
              >
                {{ area }}
              </button>
            </div>

            <label class="field-label">Top priorities</label>
            <div class="chips-grid">
              <button
                v-for="priority in priorityOptions"
                :key="priority"
                class="chip"
                :class="{ active: form.priorities.includes(priority) }"
                @click.prevent="toggleArrayItem(form.priorities, priority)"
              >
                {{ priority }}
              </button>
            </div>

            <div class="form-grid two">
              <div>
                <label class="field-label">Current routine complexity</label>
                <select v-model="form.routineLevel">
                  <option value="">Select an option</option>
                  <option>Very simple</option>
                  <option>Basic</option>
                  <option>Moderate</option>
                  <option>Complex</option>
                </select>
              </div>

              <div>
                <label class="field-label">Have you seen a dermatologist before?</label>
                <select v-model="form.previousConsult">
                  <option value="">Select an option</option>
                  <option>No</option>
                  <option>Yes, recently</option>
                  <option>Yes, a while ago</option>
                </select>
              </div>
            </div>
          </div>

          <div class="insight-card">
            <h3>Smart Diagnostic Insight</h3>
            <p class="insight-copy">
              Based on your quiz result and added information, your current case appears to be:
            </p>

            <div class="insight-box">
              <strong>{{ generatedInsight.title }}</strong>
              <p>{{ generatedInsight.text }}</p>
            </div>

            <div class="mini-points">
              <div>
                <span>Suggested next step</span>
                <strong>{{ generatedInsight.nextStep }}</strong>
              </div>
              <div>
                <span>Best appointment type</span>
                <strong>{{ suggestedAppointmentType }}</strong>
              </div>
              <div>
                <span>Care priority</span>
                <strong>{{ generatedInsight.priority }}</strong>
              </div>
            </div>

            <button class="primary-btn full" @click="saveDiagnosticCase">
              Save my diagnostic case
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="section-white">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">STEP 2</p>
          <h2>Add more reference photos</h2>
          <p>These images help provide more visual context before the appointment.</p>
        </div>

        <div class="upload-card">
          <label class="upload-zone">
            <input type="file" accept="image/*" multiple @change="handleImages" hidden />
            <span class="material-symbols-outlined upload-icon">add_photo_alternate</span>
            <strong>Upload additional skin photos</strong>
            <small>Front view, side view, or close-up of the affected area</small>
          </label>

          <div v-if="imagePreviews.length" class="preview-grid">
            <div v-for="(image, index) in imagePreviews" :key="index" class="preview-item">
              <img :src="image" alt="Uploaded preview" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-light">
      <div class="container">
        <div class="section-heading center">
          <p class="eyebrow">TEMPORARY CARE DIRECTION</p>
          <h2>Your pre-consultation routine focus</h2>
          <p>This is a transitional recommendation based on the quiz and your current diagnostic details.</p>
        </div>

        <div class="routine-grid">
          <div class="routine-card">
            <h3>Morning Routine</h3>
            <ul>
              <li v-for="(item, index) in recommendedRoutine.morning" :key="'m' + index">
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="routine-card">
            <h3>Night Routine</h3>
            <ul>
              <li v-for="(item, index) in recommendedRoutine.night" :key="'n' + index">
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="routine-card">
            <h3>Prioritize</h3>
            <ul>
              <li v-for="(item, index) in recommendedRoutine.prioritize" :key="'p' + index">
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="routine-card">
            <h3>Avoid For Now</h3>
            <ul>
              <li v-for="(item, index) in recommendedRoutine.avoid" :key="'a' + index">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section-white">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">STEP 3</p>
          <h2>Choose your dermatologist</h2>
          <p>Select the dermatologist that best fits your concerns and preferred consultation type.</p>
        </div>

        <div class="doctors-grid">
          <article
            v-for="doctor in filteredDoctors"
            :key="doctor.id"
            class="doctor-card"
            :class="{ selected: selectedDoctor && selectedDoctor.id === doctor.id }"
          >
            <img :src="doctor.image" :alt="doctor.name" class="doctor-image" />

            <div class="doctor-body">
              <div class="doctor-topline">
                <span class="doctor-tag">{{ doctor.mode }}</span>
                <span class="doctor-rating">★ {{ doctor.rating }}</span>
              </div>

              <h3>{{ doctor.name }}</h3>
              <p class="doctor-specialty">{{ doctor.specialty }}</p>
              <p class="doctor-description">{{ doctor.description }}</p>

              <div class="doctor-meta">
                <span>{{ doctor.location }}</span>
                <span>{{ doctor.availability }}</span>
              </div>

              <button class="primary-btn full" @click="selectDoctor(doctor)">
                {{ selectedDoctor && selectedDoctor.id === doctor.id ? "Selected" : "Choose dermatologist" }}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section-light" ref="bookingSection">
      <div class="container booking-layout">
        <div class="booking-card">
          <div class="section-heading">
            <p class="eyebrow">STEP 4</p>
            <h2>Book your appointment</h2>
            <p>Finalize your case and save the consultation details.</p>
          </div>

          <div class="form-grid two">
            <div>
              <label class="field-label">Appointment type</label>
              <select v-model="form.appointmentType">
                <option value="">Select type</option>
                <option>Virtual</option>
                <option>In person</option>
              </select>
            </div>

            <div>
              <label class="field-label">Preferred date</label>
              <input v-model="form.date" type="date" />
            </div>
          </div>

          <div class="form-grid two">
            <div>
              <label class="field-label">Preferred time</label>
              <select v-model="form.time">
                <option value="">Select time</option>
                <option>9:00 AM</option>
                <option>10:30 AM</option>
                <option>12:00 PM</option>
                <option>2:00 PM</option>
                <option>4:30 PM</option>
              </select>
            </div>

            <div>
              <label class="field-label">Consult reason</label>
              <input
                v-model="form.reason"
                type="text"
                placeholder="Example: Persistent bumps, pores and redness"
              />
            </div>
          </div>

          <label class="field-label">Additional notes</label>
          <textarea
            v-model="form.notes"
            rows="4"
            placeholder="Add anything else the dermatologist should know."
          ></textarea>

          <button class="primary-btn full big" @click="confirmBooking">
            Confirm Appointment
          </button>
        </div>

        <aside class="booking-summary">
          <h3>Your Consultation Summary</h3>

          <div class="summary-block">
            <span>Selected dermatologist</span>
            <strong>{{ selectedDoctor ? selectedDoctor.name : "Not selected yet" }}</strong>
          </div>

          <div class="summary-block">
            <span>Main concern</span>
            <strong>{{ mainConcern }}</strong>
          </div>

          <div class="summary-block">
            <span>Skin type</span>
            <strong>{{ formattedSkinType }}</strong>
          </div>

          <div class="summary-block">
            <span>Urgency</span>
            <strong>{{ form.urgency || "Not specified" }}</strong>
          </div>

          <div class="summary-block">
            <span>Uploaded photos</span>
            <strong>{{ imagePreviews.length + (casePhoto ? 1 : 0) }} file(s)</strong>
          </div>

          <div class="summary-block">
            <span>Case status</span>
            <strong>{{ caseStatus }}</strong>
          </div>

          <div class="summary-note">
            Once confirmed, this case can later be used for appointment history, routine refinement and product recommendations.
          </div>
        </aside>
      </div>
    </section>

    <section class="section-white disclaimer-section">
      <div class="container">
        <div class="disclaimer-box">
          <h3>Important notice</h3>
          <p>
            PharmaDerm Diagnostics offers guided skincare insights based on quiz responses,
            image references and user-reported symptoms. It does not replace diagnosis,
            treatment or medical advice from a licensed dermatologist.
          </p>
        </div>
      </div>
    </section>

    <section class="final-cta">
      <div class="container final-cta-inner">
        <div>
          <p class="eyebrow light">PHARMADERM CARE</p>
          <h2>Care designed around your skin profile</h2>
          <p>
            Build your case, connect with experts and refine your skincare experience in one place.
          </p>
        </div>

        <button class="light-btn" @click="$router.push('/tienda')">Shop your routine</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "DiagnosticsView",
  data() {
    return {
      logoSrc: "/images/pharmaderm-logo.png",
      searchOpen: false,
      profileOpen: false,
      searchQuery: "",
      imagePreviews: [],
      selectedDoctor: null,
      casePhoto: "",
      quizSummary: {
        age: null,
        skinType: "",
        sensitivity: "",
        sensitivityLevel: 1,
        concerns: [],
        routineFocus: "",
        primaryConcern: "",
        summaryMetrics: [],
        fullMetrics: [],
        photoMeta: {},
        hasSelfie: false,
        selfie: ""
      },
      form: {
        description: "",
        duration: "",
        urgency: "",
        symptoms: [],
        areas: [],
        priorities: [],
        routineLevel: "",
        previousConsult: "",
        appointmentType: "",
        date: "",
        time: "",
        reason: "",
        notes: ""
      },
      symptomsOptions: [
        "Redness",
        "Itching",
        "Dry patches",
        "Flaking",
        "Acne",
        "Burning sensation",
        "Oiliness",
        "Tightness",
        "Texture",
        "Dark spots"
      ],
      areaOptions: [
        "Forehead",
        "Cheeks",
        "Nose",
        "Chin",
        "Jawline",
        "Around eyes",
        "Neck",
        "Back",
        "Chest"
      ],
      priorityOptions: [
        "Acne control",
        "Barrier repair",
        "Hydration",
        "Texture smoothing",
        "Dark spots",
        "Sensitivity",
        "Pore appearance",
        "Redness relief"
      ],
      doctors: [
        {
          id: 1,
          name: "Dr. Elena Martínez",
          specialty: "Acne, pores and sensitive skin",
          mode: "Virtual",
          rating: "4.9",
          location: "Santo Domingo, DR",
          availability: "Next available: Tomorrow",
          description: "Ideal for oily, acne-prone or reactive skin needing guided treatment and follow-up.",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80"
        },
        {
          id: 2,
          name: "Dr. Camila Reyes",
          specialty: "Barrier recovery, dehydration and discoloration",
          mode: "In person",
          rating: "4.8",
          location: "Santiago, DR",
          availability: "Next available: Friday",
          description: "Focused on calming skin, rebuilding comfort and improving uneven texture or tone.",
          image: "https://images.unsplash.com/photo-1594824475317-d0c8f4b7d0d4?auto=format&fit=crop&w=900&q=80"
        },
        {
          id: 3,
          name: "Dr. Laura Fernández",
          specialty: "Comprehensive dermatology care",
          mode: "Virtual & In person",
          rating: "5.0",
          location: "Santo Domingo, DR",
          availability: "Next available: Today",
          description: "Best for users wanting a complete skin review with flexibility for follow-up visits.",
          image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=900&q=80"
        }
      ]
    };
  },

  computed: {
    formattedSkinType() {
      const map = {
        seca: "Dry skin",
        normal: "Normal skin",
        mixta: "Combination skin",
        grasa: "Oily skin"
      };
      return map[this.quizSummary.skinType] || this.quizSummary.skinType || "Combination skin";
    },

    formattedSensitivity() {
      const raw = (this.quizSummary.sensitivity || "").toLowerCase();
      const map = {
        "ninguna sensibilidad": "No sensitivity",
        "baja sensibilidad": "Low sensitivity",
        "sensibilidad media": "Medium sensitivity",
        "sensibilidad alta": "High sensitivity"
      };
      return map[raw] || this.quizSummary.sensitivity || "Medium sensitivity";
    },

    quizMetrics() {
      return this.quizSummary.fullMetrics && this.quizSummary.fullMetrics.length
        ? this.quizSummary.fullMetrics
        : this.quizSummary.summaryMetrics || [];
    },

    mainConcern() {
      if (this.quizSummary.concerns && this.quizSummary.concerns.length) return this.quizSummary.concerns[0];
      if (this.form.priorities.length) return this.form.priorities[0];
      return "Luminosity";
    },

    detailsCompleted() {
      return !!(
        this.form.description &&
        this.form.duration &&
        this.form.urgency &&
        this.form.symptoms.length &&
        this.form.areas.length
      );
    },

    bookingReady() {
      return !!(
        this.selectedDoctor &&
        this.form.appointmentType &&
        this.form.date &&
        this.form.time
      );
    },

    completionProgress() {
      let progress = 25;
      if (this.detailsCompleted) progress += 30;
      if (this.imagePreviews.length) progress += 15;
      if (this.selectedDoctor) progress += 15;
      if (this.bookingReady) progress += 15;
      return progress;
    },

    caseStatus() {
      if (this.bookingReady) return "Appointment ready";
      if (this.selectedDoctor) return "Doctor selected";
      if (this.detailsCompleted) return "Under review";
      return "New case";
    },

    suggestedAppointmentType() {
      const needsInPerson =
        this.form.urgency === "High" ||
        this.form.symptoms.includes("Burning sensation") ||
        this.form.symptoms.includes("Flaking");

      return needsInPerson ? "In person consultation" : "Virtual consultation";
    },

    generatedInsight() {
      const concern = this.mainConcern;
      const urgent = this.form.urgency === "High";
      const primaryKey = this.quizSummary.primaryConcern;

      if (urgent) {
        return {
          title: "Priority skin evaluation recommended",
          text: `Your answers suggest that ${concern.toLowerCase()} may need prompt professional evaluation, especially if symptoms are persistent or worsening.`,
          nextStep: "Book an in-person dermatologist visit",
          priority: "High"
        };
      }

      if (primaryKey === "poros" || this.form.symptoms.includes("Acne") || this.form.priorities.includes("Acne control")) {
        return {
          title: "Breakout-prone, texture-focused profile",
          text: "Your profile points toward oil balance, pore care and dermatologist-guided support if congestion or bumps persist.",
          nextStep: "Start with a virtual consultation",
          priority: "Medium"
        };
      }

      if (primaryKey === "deshidratacion" || primaryKey === "sensibilidad" || this.form.priorities.includes("Barrier repair")) {
        return {
          title: "Barrier-focused recovery profile",
          text: "Your skin appears to need hydration, comfort and a calmer routine before stronger active steps are considered.",
          nextStep: "Review routine and consider a specialist consult",
          priority: "Medium"
        };
      }

      if (primaryKey === "manchas") {
        return {
          title: "Tone and discoloration refinement profile",
          text: "Your skin case suggests focusing on tone support, gentle consistency and strong sun protection habits.",
          nextStep: "Book a dermatologist review if discoloration persists",
          priority: "Medium"
        };
      }

      if (primaryKey === "arrugas") {
        return {
          title: "Texture and early aging support profile",
          text: "Your skin profile may benefit from hydration, gradual renewal support and professional guidance for long-term care.",
          nextStep: "Consider a guided dermatology consultation",
          priority: "Low to medium"
        };
      }

      return {
        title: "Personalized skin refinement recommended",
        text: "Your case appears suitable for targeted routine optimization and a consultation if you want more tailored care.",
        nextStep: "Book a virtual consultation",
        priority: "Low to medium"
      };
    },

    recommendedRoutine() {
      const primary = this.quizSummary.primaryConcern;

      if (primary === "deshidratacion" || primary === "sensibilidad") {
        return {
          morning: [
            "Use a gentle non-stripping cleanser",
            "Apply a hydrating or soothing serum",
            "Seal with a barrier-support moisturizer and sunscreen"
          ],
          night: [
            "Cleanse gently without over-washing",
            "Use a simple repairing treatment step",
            "Finish with a rich or supportive moisturizer"
          ],
          prioritize: ["Ceramides", "Hyaluronic acid", "Panthenol", "Niacinamide"],
          avoid: ["Harsh exfoliation", "Too many actives together", "Strong fragrance"]
        };
      }

      if (primary === "poros") {
        return {
          morning: [
            "Use a balancing cleanser for combination or oily skin",
            "Apply a lightweight hydrating layer",
            "Finish with oil-friendly sunscreen"
          ],
          night: [
            "Cleanse without stripping the skin",
            "Use a clarifying or texture-supporting step",
            "Apply a non-comedogenic moisturizer"
          ],
          prioritize: ["Niacinamide", "Salicylic acid", "Ceramides", "Light hydration"],
          avoid: ["Aggressive scrubs", "Over-cleansing", "Very heavy pore-clogging textures"]
        };
      }

      if (primary === "manchas" || primary === "luminosidad") {
        return {
          morning: [
            "Use a gentle cleanser",
            "Apply a brightening or antioxidant-support step",
            "Finish with daily sunscreen"
          ],
          night: [
            "Cleanse gently",
            "Use a tone-supporting serum if tolerated",
            "Apply a barrier-friendly moisturizer"
          ],
          prioritize: ["Vitamin C", "Niacinamide", "Sunscreen", "Barrier support"],
          avoid: ["Skipping SPF", "Too many exfoliants at once", "Picking at the skin"]
        };
      }

      if (primary === "arrugas") {
        return {
          morning: [
            "Use a gentle cleanser",
            "Apply hydration and antioxidant support",
            "Use broad-spectrum sunscreen daily"
          ],
          night: [
            "Cleanse gently",
            "Use a smoothing or renewing step if tolerated",
            "Seal with moisturizer"
          ],
          prioritize: ["Retinoid support", "Peptides", "Ceramides", "Sunscreen"],
          avoid: ["Over-irritating combinations", "Skipping moisturizer", "Inconsistent SPF use"]
        };
      }

      return {
        morning: [
          "Use a gentle cleanser",
          "Apply a balancing serum",
          "Finish with moisturizer and sunscreen"
        ],
        night: [
          "Cleanse gently",
          "Use a targeted treatment if tolerated",
          "Apply a barrier-support moisturizer"
        ],
        prioritize: ["Niacinamide", "Ceramides", "Hydration", "Consistency"],
        avoid: ["Over-exfoliation", "Too many new products at once", "Skipping sunscreen"]
      };
    },

    filteredDoctors() {
      if (!this.form.appointmentType) return this.doctors;

      if (this.form.appointmentType === "Virtual") {
        return this.doctors.filter(
          (doctor) => doctor.mode === "Virtual" || doctor.mode === "Virtual & In person"
        );
      }

      if (this.form.appointmentType === "In person") {
        return this.doctors.filter(
          (doctor) => doctor.mode === "In person" || doctor.mode === "Virtual & In person"
        );
      }

      return this.doctors;
    }
  },

  mounted() {
    this.loadQuizSummary();
    this.loadSavedDiagnosticCase();
  },

  methods: {
    closeMenus() {
      this.searchOpen = false;
      this.profileOpen = false;
    },

    toggleArrayItem(arr, value) {
      const index = arr.indexOf(value);
      if (index === -1) arr.push(value);
      else arr.splice(index, 1);
    },

    handleImages(event) {
      const files = Array.from(event.target.files || []);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },

    selectDoctor(doctor) {
      this.selectedDoctor = doctor;

      if (!this.form.appointmentType) {
        if (doctor.mode === "Virtual") this.form.appointmentType = "Virtual";
        else if (doctor.mode === "In person") this.form.appointmentType = "In person";
      }
    },

    scrollToSection(refName) {
      const el = this.$refs[refName];
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },

    saveDiagnosticCase() {
      const payload = {
        quizSummary: this.quizSummary,
        form: this.form,
        imagePreviews: this.imagePreviews,
        selectedDoctor: this.selectedDoctor,
        casePhoto: this.casePhoto,
        savedAt: new Date().toISOString()
      };

      localStorage.setItem("pharmadermDiagnosticCase", JSON.stringify(payload));
      alert("Your diagnostic case has been saved.");
    },

    confirmBooking() {
      if (!this.selectedDoctor) {
        alert("Please select a dermatologist first.");
        return;
      }

      if (!this.form.appointmentType || !this.form.date || !this.form.time) {
        alert("Please complete appointment type, date and time.");
        return;
      }

      const appointmentPayload = {
        doctor: this.selectedDoctor,
        quizSummary: this.quizSummary,
        diagnostics: this.form,
        uploadedImages: this.imagePreviews,
        casePhoto: this.casePhoto,
        status: "Confirmed",
        confirmationCode: "PH-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
        createdAt: new Date().toISOString()
      };

      localStorage.setItem("pharmadermAppointment", JSON.stringify(appointmentPayload));
      localStorage.setItem(
        "pharmadermDiagnosticCase",
        JSON.stringify({
          quizSummary: this.quizSummary,
          form: this.form,
          imagePreviews: this.imagePreviews,
          selectedDoctor: this.selectedDoctor,
          casePhoto: this.casePhoto,
          savedAt: new Date().toISOString(),
          status: "Appointment booked"
        })
      );

      this.$router.push("/appointment-confirmation");
    },

    loadQuizSummary() {
      const savedQuiz = localStorage.getItem("pharmadermQuizResults");

      if (savedQuiz) {
        try {
          this.quizSummary = JSON.parse(savedQuiz);
          this.casePhoto = this.quizSummary.selfie || "";
        } catch (error) {
          console.error("Error loading quiz results:", error);
        }
      }

      const query = this.$route.query;

      if (query.skinType || query.sensitivity || query.concerns) {
        this.quizSummary = {
          ...this.quizSummary,
          skinType: query.skinType || this.quizSummary.skinType,
          sensitivity: query.sensitivity || this.quizSummary.sensitivity,
          concerns: query.concerns
            ? String(query.concerns).split(",")
            : this.quizSummary.concerns,
          routineFocus: query.routineFocus || this.quizSummary.routineFocus
        };
      }
    },

    loadSavedDiagnosticCase() {
      const savedCase = localStorage.getItem("pharmadermDiagnosticCase");
      if (!savedCase) return;

      try {
        const parsed = JSON.parse(savedCase);
        if (parsed.form) this.form = { ...this.form, ...parsed.form };
        if (parsed.imagePreviews) this.imagePreviews = parsed.imagePreviews;
        if (parsed.selectedDoctor) this.selectedDoctor = parsed.selectedDoctor;
      } catch (error) {
        console.error("Error loading saved diagnostic case:", error);
      }
    }
  }
};
</script>

<style scoped>
.diagnostics-page {
  min-height: 100vh;
  background: #f7f8fb;
  color: #133b63;
  font-family: "Inter", "Segoe UI", sans-serif;
}

.container {
  width: min(1280px, 92%);
  margin: 0 auto;
}

.shop-header {
  position: sticky;
  top: 0;
  z-index: 60;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(19, 59, 99, 0.08);
}

.top-promos {
  background: #133b63;
  color: #fff;
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
  position: relative;
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
  color: #133b63;
}

.brand-accent {
  color: #84b6f4;
}

.desktop-nav {
  display: flex;
  align-items: center;
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
  transition: 0.25s ease;
}

.nav-link:hover,
.nav-link.active {
  color: #4d82bc;
}

.header-actions {
  display: flex;
  gap: 0.35rem;
}

.icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 999px;
  border: 1px solid rgba(19, 59, 99, 0.12);
  background: #fff;
  color: #133b63;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: 0.25s ease;
}

.icon-btn:hover {
  background: #eef4fb;
  transform: translateY(-1px);
}

.search-popover,
.profile-popover {
  position: absolute;
  top: 92px;
  right: 0;
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 24px 50px rgba(19, 59, 99, 0.12);
  border: 1px solid rgba(19, 59, 99, 0.08);
}

.search-popover {
  width: 340px;
  padding: 1rem;
}

.profile-popover {
  width: 290px;
  padding: 1.2rem;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f6f9fd;
  border-radius: 16px;
  padding: 0.85rem 1rem;
}

.search-box input {
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  font-size: 0.95rem;
  color: #133b63;
}

.profile-popover h4 {
  margin: 0 0 0.45rem;
}

.profile-popover p {
  margin: 0 0 1rem;
  color: #5b7090;
  line-height: 1.5;
}

.diagnostics-hero {
  padding: 3.5rem 0 2.5rem;
  background: linear-gradient(135deg, rgba(233, 242, 252, 0.95), rgba(247, 248, 251, 0.98));
}

.diagnostics-hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  align-items: center;
}

.eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: #4c79aa;
  margin-bottom: 0.9rem;
}

.eyebrow.light {
  color: rgba(255, 255, 255, 0.78);
}

.hero-copy h1 {
  font-size: clamp(2.2rem, 4vw, 4rem);
  line-height: 1;
  margin: 0 0 1rem;
  letter-spacing: -0.03em;
}

.hero-text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: #4f6582;
  max-width: 680px;
}

.hero-actions {
  display: flex;
  gap: 0.9rem;
  margin-top: 1.8rem;
  flex-wrap: wrap;
}

.hero-card,
.form-card,
.insight-card,
.upload-card,
.booking-card,
.booking-summary,
.summary-card,
.doctor-card,
.timeline-step,
.routine-card,
.disclaimer-box,
.selfie-card,
.metrics-card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(19, 59, 99, 0.08);
  border-radius: 28px;
  box-shadow: 0 18px 40px rgba(19, 59, 99, 0.06);
}

.hero-card,
.form-card,
.insight-card,
.upload-card,
.booking-card,
.booking-summary,
.summary-card,
.timeline-step,
.routine-card,
.disclaimer-box,
.selfie-card,
.metrics-card {
  padding: 1.5rem;
}

.status-row {
  display: flex;
  justify-content: space-between;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-bottom: 0.8rem;
}

.result-badge,
.progress-pill {
  display: inline-flex;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: #e8f1fb;
  color: #215487;
  font-size: 0.82rem;
  font-weight: 700;
}

.summary-list {
  display: grid;
  gap: 0.85rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(19, 59, 99, 0.08);
}

.summary-item .label {
  color: #6a7f99;
}

.hero-card-note {
  margin-top: 1rem;
  color: #6a7f99;
  font-size: 0.92rem;
  line-height: 1.6;
}

.section-light {
  padding: 4rem 0;
  background: #f4f7fb;
}

.section-white {
  padding: 4rem 0;
  background: #ffffff;
}

.section-heading {
  margin-bottom: 2rem;
}

.section-heading.center {
  text-align: center;
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 2.5rem;
}

.section-heading h2 {
  margin: 0 0 0.8rem;
  font-size: clamp(1.8rem, 3vw, 2.8rem);
  letter-spacing: -0.03em;
}

.section-heading p {
  margin: 0;
  color: #5f748f;
  line-height: 1.75;
}

.timeline-grid,
.quiz-summary-grid,
.routine-grid {
  display: grid;
  gap: 1.2rem;
}

.timeline-grid {
  grid-template-columns: repeat(4, 1fr);
}

.quiz-summary-grid {
  grid-template-columns: repeat(4, 1fr);
}

.routine-grid {
  grid-template-columns: repeat(4, 1fr);
}

.timeline-step.completed {
  border-color: #84b6f4;
  box-shadow: 0 20px 44px rgba(77, 130, 188, 0.12);
}

.timeline-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #eaf3fd;
  color: #215487;
  display: grid;
  place-items: center;
  font-weight: 700;
  margin-bottom: 1rem;
}

.summary-card p,
.timeline-step p {
  margin: 0;
  color: #58708c;
  line-height: 1.7;
}

.case-overview-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 1.2rem;
  margin-top: 1.2rem;
}

.case-photo-preview {
  width: 100%;
  max-height: 420px;
  object-fit: cover;
  border-radius: 20px;
}

.metric-list {
  display: grid;
  gap: 0.9rem;
}

.metric-item {
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(19, 59, 99, 0.08);
}

.metric-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.55rem;
  color: #214f7d;
}

.metric-bar {
  height: 8px;
  border-radius: 999px;
  background: #eaf0f7;
  overflow: hidden;
}

.metric-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #4d82bc, #84b6f4);
}

.muted-text {
  color: #6c829a;
  line-height: 1.7;
}

.details-layout,
.booking-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.4rem;
}

.form-grid {
  display: grid;
  gap: 1rem;
}

.form-grid.two {
  grid-template-columns: repeat(2, 1fr);
}

.field-label {
  display: block;
  margin: 1rem 0 0.55rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #234d77;
}

textarea,
select,
input[type="text"],
input[type="date"] {
  width: 100%;
  border: 1px solid rgba(19, 59, 99, 0.12);
  background: #fbfdff;
  color: #133b63;
  border-radius: 16px;
  padding: 0.95rem 1rem;
  font-size: 0.96rem;
  outline: none;
  transition: 0.25s ease;
  box-sizing: border-box;
}

textarea:focus,
select:focus,
input:focus {
  border-color: #7da9d8;
  box-shadow: 0 0 0 4px rgba(125, 169, 216, 0.14);
}

.chips-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 0.2rem;
}

.chip {
  padding: 0.75rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(19, 59, 99, 0.12);
  background: #fff;
  color: #214f7d;
  cursor: pointer;
  transition: 0.25s ease;
  font-weight: 600;
}

.chip:hover,
.chip.active {
  background: #eaf3fd;
  border-color: #7aa7d6;
}

.insight-copy {
  color: #5d728d;
  line-height: 1.7;
}

.insight-box {
  margin: 1rem 0 1.2rem;
  padding: 1rem 1.1rem;
  border-radius: 18px;
  background: #f5f9fe;
  border: 1px solid rgba(19, 59, 99, 0.08);
}

.insight-box p {
  margin: 0.45rem 0 0;
  color: #5e7390;
  line-height: 1.7;
}

.mini-points {
  display: grid;
  gap: 0.9rem;
  margin-bottom: 1rem;
}

.mini-points div {
  padding: 0.9rem 1rem;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid rgba(19, 59, 99, 0.08);
}

.mini-points span {
  display: block;
  color: #6a8099;
  font-size: 0.88rem;
  margin-bottom: 0.2rem;
}

.upload-zone {
  min-height: 180px;
  border: 2px dashed rgba(19, 59, 99, 0.16);
  border-radius: 24px;
  display: grid;
  place-items: center;
  text-align: center;
  gap: 0.3rem;
  padding: 1.5rem;
  background: linear-gradient(180deg, #fbfdff, #f3f8fd);
  cursor: pointer;
}

.upload-icon {
  font-size: 2.5rem;
  color: #6d9dcf;
}

.preview-grid {
  margin-top: 1.2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.preview-item {
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  border: 1px solid rgba(19, 59, 99, 0.08);
}

.preview-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.doctors-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.3rem;
}

.doctor-card {
  overflow: hidden;
  transition: 0.25s ease;
}

.doctor-card:hover {
  transform: translateY(-4px);
}

.doctor-card.selected {
  border-color: #84b6f4;
  box-shadow: 0 20px 48px rgba(91, 135, 191, 0.16);
}

.doctor-image {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.doctor-body {
  padding: 1.2rem;
}

.doctor-topline {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.doctor-tag,
.doctor-rating {
  font-size: 0.8rem;
  font-weight: 700;
  color: #2b5a89;
  background: #eef5fd;
  padding: 0.4rem 0.65rem;
  border-radius: 999px;
}

.doctor-specialty {
  color: #486684;
  font-weight: 600;
  margin: 0.3rem 0 0.7rem;
}

.doctor-description {
  color: #657b97;
  line-height: 1.7;
  min-height: 82px;
}

.doctor-meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: #6a819c;
  font-size: 0.92rem;
  margin-bottom: 1rem;
}

.summary-block {
  padding: 0.95rem 0;
  border-bottom: 1px solid rgba(19, 59, 99, 0.08);
}

.summary-block span {
  display: block;
  color: #6c829a;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.summary-note {
  margin-top: 1.2rem;
  padding: 1rem;
  border-radius: 18px;
  background: #f3f8fd;
  color: #5f7590;
  line-height: 1.7;
}

.disclaimer-section {
  padding-top: 1rem;
}

.disclaimer-box p {
  margin: 0;
  color: #5f748f;
  line-height: 1.75;
}

.final-cta {
  padding: 4rem 0;
  background: linear-gradient(135deg, #123a62, #3d6e9f);
  color: #fff;
}

.final-cta-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.primary-btn,
.ghost-btn,
.light-btn {
  border: none;
  border-radius: 999px;
  padding: 0.9rem 1.35rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.25s ease;
}

.primary-btn {
  background: linear-gradient(135deg, #133b63, #4d82bc);
  color: #fff;
  box-shadow: 0 14px 28px rgba(19, 59, 99, 0.18);
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 34px rgba(19, 59, 99, 0.24);
}

.ghost-btn {
  background: #fff;
  color: #133b63;
  border: 1px solid rgba(19, 59, 99, 0.12);
}

.ghost-btn:hover {
  background: #eef5fd;
}

.light-btn {
  background: #fff;
  color: #133b63;
}

.full {
  width: 100%;
}

.big {
  margin-top: 1.2rem;
  padding: 1rem 1.3rem;
}

.small {
  margin-top: 0.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.22s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 1100px) {
  .diagnostics-hero-grid,
  .details-layout,
  .booking-layout,
  .quiz-summary-grid,
  .doctors-grid,
  .timeline-grid,
  .routine-grid,
  .case-overview-grid {
    grid-template-columns: 1fr;
  }

  .preview-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .desktop-nav {
    display: none;
  }
}

@media (max-width: 700px) {
  .form-grid.two,
  .final-cta-inner {
    grid-template-columns: 1fr;
    display: grid;
  }

  .hero-copy h1 {
    font-size: 2.35rem;
  }

  .preview-grid {
    grid-template-columns: 1fr 1fr;
  }

  .search-popover,
  .profile-popover {
    width: min(92vw, 340px);
  }
}
</style>
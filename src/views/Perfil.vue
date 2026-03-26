<template>
  <div
    class="min-h-screen pb-[120px]"
    :class="[{ 'pd-dark': isDark }, 'pd-root']"
  >
    <!-- HEADER -->
    <header class="sticky top-0 z-50 pd-surface pd-border-b">
      <div class="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="p-2 rounded-full pd-hover"
            aria-label="Volver"
            @click="goBack"
          >
            <span class="material-symbols-outlined pd-icon">arrow_back</span>
          </button>

          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwGk1ZsXrDiVM1y4eYkFkLAVJyj3SEQtwpa9gS41xgybM4JsMSUQU1bAYKb4aviIWmG2GtMVM1nQrg4rTEm3bi80sHtcf-M6xSUCR2ua9YOhGfPNVmoJhBG1zcuzQq8mODOnwTQihKFT5tQ_dy8FM8IC-Z12rIEybnyvjZd3JctWEFO86kmHZonJMxnQG6HrfgLFeTwIK6wsY-4PKy7LSaqAD3iJEqDxf2JVzH6t5Aj5cneE7Af9KkyxdLRTwpToy3oqVFRaMPLFs"
            class="h-9 w-9 rounded-lg shadow-sm object-cover"
            alt="PharmaDerm Logo"
          />

          <div>
            <h1 class="text-lg font-bold tracking-tight pd-brand">
              PharmaDerm<span class="pd-accent">RD</span>
            </h1>
            <p class="text-xs pd-muted -mt-0.5">Mi perfil</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <button
            type="button"
            class="p-2 rounded-full pd-hover"
            aria-label="Modo nocturno"
            @click="toggleDark"
          >
            <span class="material-symbols-outlined pd-icon">
              {{ isDark ? "light_mode" : "dark_mode" }}
            </span>
          </button>

          <button
            type="button"
            class="p-2 rounded-full pd-hover relative"
            aria-label="Carrito"
            @click="router.push('/carrito')"
          >
            <span class="material-symbols-outlined pd-icon">shopping_bag</span>
            <span v-if="cartCount > 0" class="pd-badge">{{ cartCount }}</span>
          </button>
        </div>
      </div>

      <div class="pd-banner">
        <p class="text-center text-white text-[11px] font-semibold uppercase tracking-widest py-2">
          Account Center • PharmaDerm RD
        </p>
      </div>
    </header>

    <!-- MAIN -->
    <main class="max-w-[1200px] mx-auto px-6 py-8">
      <!-- HERO PERFIL -->
      <section class="pd-hero rounded-[28px] overflow-hidden shadow-xl relative">
        <div class="grid lg:grid-cols-[1.15fr_0.85fr] gap-6 px-6 sm:px-10 py-8 sm:py-10 text-white">
          <div class="flex flex-col justify-center">
            <span class="text-xs uppercase tracking-[0.25em] opacity-80">
              Welcome back
            </span>

            <h2 class="text-3xl sm:text-4xl font-extrabold mt-3 leading-tight">
              Hola, {{ displayName }}
            </h2>

            <p class="mt-4 text-white/90 text-sm sm:text-base max-w-2xl">
              Administra tu cuenta, revisa tus pedidos, consulta tus citas dermatológicas
              y accede rápidamente a tu rutina personalizada.
            </p>

            <div class="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                class="pd-cta px-6 py-3 rounded-full font-bold shadow-lg transition"
                @click="router.push('/diagnostics')"
              >
                Reservar cita
              </button>

              <button
                type="button"
                class="pd-ghost-white px-6 py-3 rounded-full font-bold transition"
                @click="router.push('/tienda')"
              >
                Ver tienda
              </button>
            </div>
          </div>

          <div class="pd-card rounded-[24px] p-5 sm:p-6 text-slate-900 shadow-xl self-start">
            <div class="flex items-start gap-4">
              <div class="pd-profile-avatar-wrap">
                <img
                  v-if="currentUser.avatar"
                  :src="currentUser.avatar"
                  alt="Avatar"
                  class="pd-profile-avatar"
                />
                <div v-else class="pd-profile-avatar pd-profile-avatar-fallback">
                  {{ currentInitial }}
                </div>
              </div>

              <div class="min-w-0 flex-1">
                <p class="text-xs uppercase tracking-[0.2em] pd-muted font-bold">
                  Cuenta principal
                </p>
                <h3 class="text-xl font-extrabold mt-1 text-slate-900">
                  {{ displayName }}
                </h3>
                <p class="text-sm text-slate-500 break-all mt-1">
                  {{ currentUser.email || "Sin correo registrado" }}
                </p>

                <div class="mt-4 flex flex-wrap gap-2">
                  <span class="pd-chip-inline">Perfil activo</span>
                  <span class="pd-chip-inline">Skin Care Member</span>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 mt-6">
              <button type="button" class="pd-soft-btn" @click="router.push('/diagnostics')">
                <span class="material-symbols-outlined">clinical_notes</span>
                <span>Mis citas</span>
              </button>

              <button type="button" class="pd-soft-btn" @click="router.push('/quiz')">
                <span class="material-symbols-outlined">dermatology</span>
                <span>Mi rutina</span>
              </button>

              <button type="button" class="pd-soft-btn" @click="router.push('/tienda')">
                <span class="material-symbols-outlined">inventory_2</span>
                <span>Pedidos</span>
              </button>

              <button type="button" class="pd-soft-btn" @click="toggleEditMode">
                <span class="material-symbols-outlined">edit</span>
                <span>{{ editMode ? "Cerrar edición" : "Editar" }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- RESUMEN -->
      <section class="mt-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <article class="pd-card pd-border rounded-2xl p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[11px] uppercase tracking-widest pd-muted font-bold">Pedidos</p>
                <h3 class="text-2xl font-extrabold mt-2">{{ summary.orders }}</h3>
              </div>
              <div class="pd-stat-icon">
                <span class="material-symbols-outlined">package_2</span>
              </div>
            </div>
          </article>

          <article class="pd-card pd-border rounded-2xl p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[11px] uppercase tracking-widest pd-muted font-bold">Citas</p>
                <h3 class="text-2xl font-extrabold mt-2">{{ summary.appointments }}</h3>
              </div>
              <div class="pd-stat-icon">
                <span class="material-symbols-outlined">calendar_month</span>
              </div>
            </div>
          </article>

          <article class="pd-card pd-border rounded-2xl p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[11px] uppercase tracking-widest pd-muted font-bold">Favoritos</p>
                <h3 class="text-2xl font-extrabold mt-2">{{ summary.favorites }}</h3>
              </div>
              <div class="pd-stat-icon">
                <span class="material-symbols-outlined">favorite</span>
              </div>
            </div>
          </article>

          <article class="pd-card pd-border rounded-2xl p-5 shadow-sm">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[11px] uppercase tracking-widest pd-muted font-bold">Rutina</p>
                <h3 class="text-2xl font-extrabold mt-2">{{ summary.routines }}</h3>
              </div>
              <div class="pd-stat-icon">
                <span class="material-symbols-outlined">spa</span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- CONTENIDO -->
      <section class="mt-10 grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-6">
        <!-- COLUMNA IZQUIERDA -->
        <div class="space-y-6">
          <!-- DATOS PERSONALES -->
          <article class="pd-card pd-border rounded-2xl p-6 shadow-sm">
            <div class="flex items-center justify-between gap-4 mb-5 flex-wrap">
              <div>
                <p class="text-[11px] uppercase tracking-widest pd-muted font-bold">Perfil</p>
                <h3 class="font-bold text-xl mt-1">Mis datos</h3>
              </div>

              <button
                type="button"
                class="pd-outline-btn"
                @click="toggleEditMode"
              >
                {{ editMode ? "Cancelar edición" : "Editar información" }}
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="pd-field">
                <span>Nombre completo</span>
                <input
                  v-model="editableUser.name"
                  type="text"
                  :disabled="!editMode"
                  placeholder="Tu nombre"
                />
              </label>

              <label class="pd-field">
                <span>Correo electrónico</span>
                <input
                  v-model="editableUser.email"
                  type="email"
                  :disabled="!editMode"
                  placeholder="correo@ejemplo.com"
                />
              </label>

              <label class="pd-field">
                <span>Teléfono</span>
                <input
                  v-model="editableUser.phone"
                  type="text"
                  :disabled="!editMode"
                  placeholder="(809) 000-0000"
                />
              </label>

              <label class="pd-field">
                <span>Edad</span>
                <input
                  v-model="editableUser.age"
                  type="text"
                  :disabled="!editMode"
                  placeholder="18"
                />
              </label>
            </div>

            <div class="mt-4">
              <label class="pd-field">
                <span>Dirección</span>
                <input
                  v-model="editableUser.address"
                  type="text"
                  :disabled="!editMode"
                  placeholder="Dirección"
                />
              </label>
            </div>

            <div v-if="editMode" class="flex flex-wrap gap-3 mt-5">
              <label class="pd-secondary-btn cursor-pointer inline-flex items-center justify-center">
                Cambiar foto
                <input type="file" accept="image/*" class="hidden" @change="handleAvatarUpload" />
              </label>

              <button type="button" class="pd-primary-btn" @click="saveProfile">
                Guardar cambios
              </button>

              <button type="button" class="pd-secondary-btn" @click="resetEditableUser">
                Restablecer
              </button>
            </div>
          </article>

          <!-- PEDIDOS -->
          <article class="pd-card pd-border rounded-2xl p-6 shadow-sm">
            <div class="flex items-center justify-between gap-4 mb-5">
              <div>
                <p class="text-[11px] uppercase tracking-widest pd-muted font-bold">Compras</p>
                <h3 class="font-bold text-xl mt-1">Pedidos recientes</h3>
              </div>

              <button type="button" class="pd-outline-btn" @click="router.push('/tienda')">
                Ir a tienda
              </button>
            </div>

            <div class="space-y-3">
              <div
                v-for="order in recentOrders"
                :key="order.id"
                class="pd-list-row"
              >
                <div>
                  <h4 class="font-semibold">{{ order.title }}</h4>
                  <p class="text-sm pd-muted">{{ order.date }}</p>
                </div>

                <div class="text-right">
                  <p class="font-bold pd-price">RD${{ formatPrice(order.total) }}</p>
                  <p class="text-sm" :class="order.statusClass">{{ order.status }}</p>
                </div>
              </div>

              <div v-if="recentOrders.length === 0" class="pd-empty-box">
                Aún no tienes pedidos ni productos en el carrito.
              </div>
            </div>
          </article>

          <!-- CITAS -->
          <article class="pd-card pd-border rounded-2xl p-6 shadow-sm">
            <div class="flex items-center justify-between gap-4 mb-5">
              <div>
                <p class="text-[11px] uppercase tracking-widest pd-muted font-bold">Dermatología</p>
                <h3 class="font-bold text-xl mt-1">Próximas citas</h3>
              </div>

              <button type="button" class="pd-outline-btn" @click="router.push('/diagnostics')">
                Agendar
              </button>
            </div>

            <div class="space-y-3">
              <div
                v-for="appointment in appointments"
                :key="appointment.id"
                class="pd-list-row"
              >
                <div>
                  <h4 class="font-semibold">{{ appointment.title }}</h4>
                  <p class="text-sm pd-muted">{{ appointment.date }}</p>
                </div>

                <div class="text-right">
                  <p class="font-semibold">{{ appointment.mode }}</p>
                  <p class="text-sm pd-link font-semibold">{{ appointment.doctor }}</p>
                </div>
              </div>

              <div v-if="appointments.length === 0" class="pd-empty-box">
                No hay citas programadas por ahora.
              </div>
            </div>
          </article>
        </div>

        <!-- COLUMNA DERECHA -->
        <div class="space-y-6">
          <!-- RUTINA -->
          <article class="pd-card pd-border rounded-2xl p-6 shadow-sm">
            <p class="text-[11px] uppercase tracking-widest pd-muted font-bold">Skin profile</p>
            <h3 class="font-bold text-xl mt-1">Mi rutina</h3>

            <div v-if="quizResult && routineSteps.length" class="mt-5 space-y-3">
              <div
                v-for="step in routineSteps"
                :key="step.id"
                class="pd-routine-item"
              >
                <div class="pd-routine-icon">
                  <span class="material-symbols-outlined">{{ step.icon || "spa" }}</span>
                </div>

                <div class="min-w-0">
                  <h4 class="font-semibold">{{ step.title }}</h4>
                  <p class="text-sm pd-muted">{{ step.desc }}</p>
                </div>
              </div>
            </div>

            <div v-else class="pd-empty-box mt-5">
              Aún no has realizado tu rutina personalizada.
            </div>

            <button
              type="button"
              class="mt-5 w-full py-3 rounded-xl pd-primary text-white font-bold shadow-lg"
              @click="router.push('/quiz')"
            >
              {{ quizResult ? "Ver o actualizar rutina" : "Hacer rutina" }}
            </button>
          </article>

          <!-- DIAGNOSTICO -->
          <article class="pd-card pd-border rounded-2xl p-6 shadow-sm">
            <p class="text-[11px] uppercase tracking-widest pd-muted font-bold">Diagnostics</p>
            <h3 class="font-bold text-xl mt-1">Mi diagnóstico</h3>

            <div v-if="diagnosticResult" class="mt-5 pd-list-row">
              <div>
                <h4 class="font-semibold">
                  {{ diagnosticResult.title || "Diagnóstico realizado" }}
                </h4>
                <p class="text-sm pd-muted">
                  {{ diagnosticResult.summary || "Resultado disponible en tu perfil." }}
                </p>
              </div>
            </div>

            <div v-else class="pd-empty-box mt-5">
              Aún no has realizado un diagnóstico.
            </div>

            <button
              type="button"
              class="mt-5 w-full py-3 rounded-xl pd-primary text-white font-bold shadow-lg"
              @click="router.push('/diagnostics')"
            >
              {{ diagnosticResult ? "Ver o actualizar diagnóstico" : "Hacer diagnóstico" }}
            </button>
          </article>

          <!-- ATAJOS -->
          <article class="pd-card pd-border rounded-2xl p-6 shadow-sm">
            <p class="text-[11px] uppercase tracking-widest pd-muted font-bold">Accesos rápidos</p>
            <h3 class="font-bold text-xl mt-1">Tu panel</h3>

            <div class="grid grid-cols-1 gap-3 mt-5">
              <button type="button" class="pd-shortcut" @click="router.push('/tienda')">
                <span class="material-symbols-outlined">favorite</span>
                <span>Ver favoritos</span>
              </button>

              <button type="button" class="pd-shortcut" @click="router.push('/carrito')">
                <span class="material-symbols-outlined">shopping_cart</span>
                <span>Ir al carrito</span>
              </button>

              <button type="button" class="pd-shortcut" @click="router.push('/diagnostics')">
                <span class="material-symbols-outlined">stethoscope</span>
                <span>Consultar especialista</span>
              </button>

              <button type="button" class="pd-shortcut" @click="logout">
                <span class="material-symbols-outlined">logout</span>
                <span>Cerrar sesión</span>
              </button>
            </div>
          </article>
        </div>
      </section>
    </main>

    <!-- BOTTOM NAV -->
    <nav class="fixed bottom-0 left-0 right-0 pd-surface pd-border-t px-6 py-3 flex justify-between items-center z-50">
      <RouterLink to="/inicio" class="pd-navitem" :class="{ active: isActive('/inicio') }" aria-label="Home">
        <span class="material-symbols-outlined">home</span>
        <p>Home</p>
      </RouterLink>

      <RouterLink to="/tienda" class="pd-navitem" :class="{ active: isActive('/tienda') }" aria-label="Shop">
        <span class="material-symbols-outlined">grid_view</span>
        <p>Shop</p>
      </RouterLink>

      <RouterLink to="/diagnostics" class="pd-navcenter" :class="{ active: isActive('/diagnostics') }" aria-label="Diagnostics">
        <div class="pd-fab">
          <span class="material-symbols-outlined">stethoscope</span>
        </div>
        <p>Diagnostics</p>
      </RouterLink>

      <button
        type="button"
        class="pd-navitem pd-nav-button"
        :class="{ active: isActive('/quiz') || isActive('/diagnostics') }"
        aria-label="Routine"
        @click="router.push('/quiz')"
      >
        <span class="material-symbols-outlined">local_hospital</span>
        <p>Routine</p>
      </button>

      <RouterLink to="/perfil" class="pd-navitem" :class="{ active: isActive('/perfil') }" aria-label="Profile">
        <span class="material-symbols-outlined">person</span>
        <p>Profile</p>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";

const route = useRoute();
const router = useRouter();

const isDark = ref(false);
const editMode = ref(false);

const defaultUser = {
  name: "",
  email: "",
  avatar: "",
  phone: "",
  age: "",
  address: "",
};

const currentUser = ref({ ...defaultUser });
const editableUser = ref({ ...defaultUser });

const recentOrders = ref([]);
const appointments = ref([]);
const routineSteps = ref([]);
const quizResult = ref(null);
const diagnosticResult = ref(null);

const displayName = computed(() => {
  return currentUser.value.name?.trim() || "Usuario";
});

const currentInitial = computed(() => {
  return (displayName.value || "U").charAt(0).toUpperCase();
});

const cartCount = computed(() => {
  try {
    const cart = JSON.parse(localStorage.getItem("pharmaderm_cart") || "[]");
    return cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  } catch {
    return 0;
  }
});

const summary = computed(() => ({
  orders: recentOrders.value.length,
  appointments: appointments.value.length,
  favorites: getFavoritesCount(),
  routines: quizResult.value ? 1 : 0,
}));

onMounted(() => {
  const saved = localStorage.getItem("pharmaderm_dark");
  isDark.value = saved === "1";

  loadUserSession();
  loadOrdersFromCart();
  loadAppointments();
  loadQuizResult();
  loadDiagnosticResult();
});

const isActive = (path) => route.path === path;

const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("pharmaderm_dark", isDark.value ? "1" : "0");
};

const goBack = () => {
  router.push("/inicio");
};

const formatPrice = (n) => {
  return Number(n || 0).toLocaleString("en-US");
};

const loadUserSession = () => {
  try {
    const savedUser = JSON.parse(localStorage.getItem("pharmaderm_user") || "null");

    if (savedUser) {
      currentUser.value = {
        name: savedUser.name || "",
        email: savedUser.email || "",
        avatar: savedUser.avatar || "",
        phone: savedUser.phone || "",
        age: savedUser.age || "",
        address: savedUser.address || "",
      };
    } else {
      currentUser.value = { ...defaultUser };
    }

    editableUser.value = { ...currentUser.value };
  } catch {
    currentUser.value = { ...defaultUser };
    editableUser.value = { ...defaultUser };
  }
};

const loadOrdersFromCart = () => {
  try {
    const cart = JSON.parse(localStorage.getItem("pharmaderm_cart") || "[]");

    if (Array.isArray(cart) && cart.length > 0) {
      recentOrders.value = cart.map((item, index) => ({
        id: `cart-${index}`,
        title: item.name || "Producto",
        date: "En carrito",
        total: (item.priceRD || 0) * (item.quantity || 1),
        status: "Pendiente",
        statusClass: "text-amber-600 font-semibold",
      }));
    } else {
      recentOrders.value = [];
    }
  } catch {
    recentOrders.value = [];
  }
};

const loadAppointments = () => {
  try {
    const savedAppointment = JSON.parse(
      localStorage.getItem("pharmaderm_appointment") || "null"
    );

    if (savedAppointment) {
      appointments.value = [
        {
          id: "saved-appointment",
          title: savedAppointment.service || "Consulta dermatológica",
          date: savedAppointment.dateTime || "Fecha pendiente",
          mode: savedAppointment.mode || "Presencial",
          doctor: savedAppointment.doctor || "Especialista PharmaDerm",
        },
      ];
    } else {
      appointments.value = [];
    }
  } catch {
    appointments.value = [];
  }
};

const loadQuizResult = () => {
  try {
    const savedQuiz = JSON.parse(localStorage.getItem("pharmaderm_quiz_result") || "null");
    quizResult.value = savedQuiz;

    if (savedQuiz?.routineSteps && Array.isArray(savedQuiz.routineSteps)) {
      routineSteps.value = savedQuiz.routineSteps;
    } else {
      routineSteps.value = [];
    }
  } catch {
    quizResult.value = null;
    routineSteps.value = [];
  }
};

const loadDiagnosticResult = () => {
  try {
    diagnosticResult.value = JSON.parse(
      localStorage.getItem("pharmaderm_diagnostic_result") || "null"
    );
  } catch {
    diagnosticResult.value = null;
  }
};

const getFavoritesCount = () => {
  try {
    const favs = JSON.parse(localStorage.getItem("pharmaderm_favorites") || "[]");
    return Array.isArray(favs) ? favs.length : 0;
  } catch {
    return 0;
  }
};

const toggleEditMode = () => {
  if (editMode.value) {
    editableUser.value = { ...currentUser.value };
  }
  editMode.value = !editMode.value;
};

const resetEditableUser = () => {
  editableUser.value = { ...currentUser.value };
};

const handleAvatarUpload = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    editableUser.value.avatar = reader.result;
  };
  reader.readAsDataURL(file);
};

const saveProfile = () => {
  currentUser.value = {
    ...currentUser.value,
    ...editableUser.value,
  };

  localStorage.setItem("pharmaderm_user", JSON.stringify(currentUser.value));
  editMode.value = false;
};

const logout = () => {
  localStorage.removeItem("pharmaderm_session");
  router.push("/login");
};
</script>

<style scoped>
.pd-root {
  --bg: #f8fafc;
  --text: #0f172a;
  --muted: #64748b;
  --surface: rgba(255, 255, 255, 0.92);
  --card: #ffffff;
  --soft: #f1f5f9;
  --border: #e2e8f0;
  --brand: #004e92;
  --link: #5dbcd2;
  --accent: #76b82a;
  --banner: #5dbcd2;
  --price: #004e92;
  --cta-bg: #ffffff;
  --cta-text: #004e92;
  --primary: #004e92;
  --nav-inactive: #94a3b8;
  --nav-active: #004e92;
  --fab: #004e92;
  --fab-ring: #f8fafc;
}

.pd-dark.pd-root {
  --bg: #0b1220;
  --text: #e5e7eb;
  --muted: #9aa7ba;
  --surface: rgba(10, 18, 32, 0.92);
  --card: #0f1a2e;
  --soft: #0a162a;
  --border: #1c2b44;
  --brand: #8cc7ff;
  --link: #66d6ff;
  --accent: #9be15d;
  --banner: #0f3a57;
  --price: #cfe9ff;
  --cta-bg: #0f1a2e;
  --cta-text: #cfe9ff;
  --primary: #183a6b;
  --nav-inactive: #6f8099;
  --nav-active: #66d6ff;
  --fab: #1f4b86;
  --fab-ring: #0b1220;
}

.pd-root {
  background: var(--bg);
  color: var(--text);
}

.pd-muted { color: var(--muted); }

.pd-surface {
  background: var(--surface);
  backdrop-filter: blur(10px);
}

.pd-card { background: var(--card); }
.pd-border { border: 1px solid var(--border); }
.pd-border-t { border-top: 1px solid var(--border); }
.pd-border-b { border-bottom: 1px solid var(--border); }

.pd-hover:hover { background: rgba(148, 163, 184, 0.18); }
.pd-dark .pd-hover:hover { background: rgba(255, 255, 255, 0.06); }

.pd-brand { color: var(--brand); }
.pd-accent { color: var(--accent); }
.pd-icon { color: var(--brand); }
.pd-banner { background: var(--banner); }
.pd-link { color: var(--link); }
.pd-price { color: var(--price); }
.pd-primary { background: var(--primary); }

.pd-hero {
  background: linear-gradient(135deg, var(--brand), var(--link));
}
.pd-dark .pd-hero {
  background: linear-gradient(135deg, #102a4d, #0f3a57);
}

.pd-cta {
  background: var(--cta-bg);
  color: var(--cta-text);
}
.pd-cta:hover { filter: brightness(0.98); }

.pd-ghost-white {
  border: 1px solid rgba(255,255,255,0.42);
  color: #fff;
  background: rgba(255,255,255,0.08);
}
.pd-ghost-white:hover {
  background: rgba(255,255,255,0.14);
}

.pd-profile-avatar-wrap {
  flex-shrink: 0;
}

.pd-profile-avatar {
  width: 92px;
  height: 92px;
  border-radius: 999px;
  object-fit: cover;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.12);
}

.pd-profile-avatar-fallback {
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, var(--brand), var(--link));
  color: white;
  font-size: 28px;
  font-weight: 900;
}

.pd-chip-inline {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: #eef6ff;
  color: #0f4c81;
  font-size: 12px;
  font-weight: 700;
}

.pd-dark .pd-chip-inline {
  background: rgba(102, 214, 255, 0.14);
  color: #b7ebff;
}

.pd-soft-btn {
  border: 1px solid var(--border);
  background: var(--soft);
  border-radius: 16px;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  color: var(--text);
}

.pd-stat-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--link) 10%, white);
  color: var(--brand);
}

.pd-dark .pd-stat-icon {
  background: rgba(102, 214, 255, 0.12);
  color: #9adbff;
}

.pd-outline-btn {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text);
  padding: 10px 14px;
  border-radius: 999px;
  font-weight: 700;
}

.pd-primary-btn {
  border: none;
  background: var(--primary);
  color: #fff;
  padding: 12px 18px;
  border-radius: 12px;
  font-weight: 700;
}

.pd-secondary-btn {
  border: 1px solid var(--border);
  background: var(--soft);
  color: var(--text);
  padding: 12px 18px;
  border-radius: 12px;
  font-weight: 700;
}

.pd-field {
  display: grid;
  gap: 8px;
}

.pd-field span {
  font-size: 13px;
  font-weight: 700;
  color: var(--muted);
}

.pd-field input {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--soft);
  color: var(--text);
  padding: 14px 16px;
  outline: none;
}

.pd-field input:disabled {
  opacity: 0.9;
  cursor: default;
}

.pd-list-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 16px 18px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: color-mix(in srgb, var(--soft) 85%, white);
}

.pd-dark .pd-list-row {
  background: color-mix(in srgb, var(--soft) 80%, transparent);
}

.pd-empty-box {
  padding: 24px;
  border: 1px dashed var(--border);
  border-radius: 18px;
  color: var(--muted);
  font-weight: 700;
  text-align: center;
}

.pd-routine-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px;
  border-radius: 18px;
  background: color-mix(in srgb, var(--soft) 85%, white);
  border: 1px solid var(--border);
}

.pd-routine-icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--link) 12%, white);
  color: var(--brand);
  flex-shrink: 0;
}

.pd-shortcut {
  width: 100%;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--soft) 88%, white);
  color: var(--text);
  border-radius: 16px;
  padding: 15px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
}

.pd-badge {
  position: absolute;
  top: 0;
  right: -2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: 800;
  display: grid;
  place-items: center;
}

.pd-navitem,
.pd-navcenter {
  text-decoration: none;
  color: var(--nav-inactive);
  display: grid;
  place-items: center;
  gap: 4px;
  min-width: 64px;
  user-select: none;
}

.pd-nav-button {
  background: transparent;
  border: none;
  cursor: pointer;
}

.pd-navitem span,
.pd-navcenter span {
  font-size: 26px;
}

.pd-navitem p,
.pd-navcenter p {
  font-size: 12px;
  margin: 0;
}

.pd-navitem.active,
.pd-navcenter.active {
  color: var(--nav-active);
}

.pd-navcenter {
  margin-top: -18px;
}

.pd-fab {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  background: var(--fab);
  color: #fff;
  display: grid;
  place-items: center;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
  border: 4px solid var(--fab-ring);
}

@media (max-width: 900px) {
  .pd-list-row {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 720px) {
  .pd-profile-avatar {
    width: 78px;
    height: 78px;
  }
}
</style>
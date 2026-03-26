import { createRouter, createWebHistory } from "vue-router";

// Auth
import Login from "../views/login.vue";
import Registro from "../views/Registro.vue";
import Olvide from "../views/olvide.vue";

// Main
import Inicio from "../views/Inicio.vue";

// Extras
import Quiz from "../views/Quiz.vue";
import Coleccion from "../views/Coleccion.vue";
import Tienda from "../views/Tienda.vue";
import ProductoDetalle from "../views/ProductoDetalle.vue";
import Perfil from "../views/Perfil.vue";
import Carrito from "../views/Carrito.vue";
import Diagnostics from "../views/Diagnostics.vue";
import AppointmentConfirmation from "../views/AppointmentConfirmation.vue";

const routes = [
  { path: "/", redirect: "/login" },

  // públicas
  { path: "/login", name: "Login", component: Login, meta: { public: true } },
  { path: "/registro", name: "Registro", component: Registro, meta: { public: true } },
  { path: "/olvide", name: "Olvide", component: Olvide, meta: { public: true } },

  // protegidas
  { path: "/inicio", name: "Inicio", component: Inicio },
  { path: "/quiz", name: "Quiz", component: Quiz },
  { path: "/coleccion", name: "Coleccion", component: Coleccion },
  { path: "/diagnostics", name: "Diagnostics", component: Diagnostics },
  {
    path: "/appointment-confirmation",
    name: "AppointmentConfirmation",
    component: AppointmentConfirmation,
  },
  { path: "/tienda", name: "Tienda", component: Tienda },
  {
    path: "/producto/:slug",
    name: "ProductoDetalle",
    component: ProductoDetalle,
  },
  { path: "/perfil", name: "Perfil", component: Perfil },
  { path: "/carrito", name: "Carrito", component: Carrito },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const session = JSON.parse(localStorage.getItem("pharmaderm_session") || "null");
  const isAuthenticated = !!session?.isLoggedIn;

  if (!to.meta.public && !isAuthenticated) {
    return next("/login");
  }

  if ((to.path === "/login" || to.path === "/registro") && isAuthenticated) {
    return next("/inicio");
  }

  next();
});

export default router;
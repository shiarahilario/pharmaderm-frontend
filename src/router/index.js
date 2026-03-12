import { createRouter, createWebHistory } from "vue-router";

// Auth
import Login from "../views/login.vue";
import Registro from "../views/Registro.vue";
import Olvide from "../views/olvide.vue";

// Main
import Inicio from "../views/Inicio.vue";

// Extras (placeholders por ahora)
import Quiz from "../views/Quiz.vue";
import Coleccion from "../views/Coleccion.vue";
import Tienda from "../views/Tienda.vue";
import Perfil from "../views/Perfil.vue";
import Carrito from "../views/Carrito.vue";

const routes = [
  { path: "/", redirect: "/login" },

  // Autenticación
  { path: "/login", name: "Login", component: Login },
  { path: "/registro", name: "Registro", component: Registro },
  { path: "/olvide", name: "Olvide", component: Olvide },

  // Inicio
  { path: "/inicio", name: "Inicio", component: Inicio },

  // Flujo nuevo (banner + quiz)
  { path: "/quiz", name: "Quiz", component: Quiz },
  { path: "/coleccion", name: "Coleccion", component: Coleccion },

  // Navegación inferior / header
  { path: "/tienda", name: "Tienda", component: Tienda },
  { path: "/perfil", name: "Perfil", component: Perfil },
  { path: "/carrito", name: "Carrito", component: Carrito },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

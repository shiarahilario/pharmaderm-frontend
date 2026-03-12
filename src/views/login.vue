<template>
  <div
    class="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden"
  >
    <!-- Fondo -->
    <div class="absolute inset-0 h-full w-full">
      <div
        class="w-full h-full bg-center bg-no-repeat bg-cover aspect-auto"
        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2Rs3gLpz6hSpao11yuzIi-FP4Qad3nx8XKcT3g4uPZarCasEuW6FwliPMFmPy1ESe8gZRN9zr_56RY88oo0w1vwd6O3A5SoI0UgvWHwo2Jjo6siNfs7b75gnzfXEpAyto203eQgXN9GLvVT3p6MQU4Rl2DfxpLM7UNJG3BKYX7j7BJLQziwJQT7PIiJ-IYCzA6pvgqcHfhYB8vvJMr1_UaHWkZzrwgKx86vpj73k3qq1Z4C3toiWEusADTSh79FReQLf7V8q1zlU"); opacity: 0.1;'
      ></div>
    </div>

    <div class="relative flex w-full flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div class="w-full max-w-sm mx-auto flex flex-col items-center">

        <!-- Logo -->
        <div class="mb-4 flex justify-center">
          <svg
            class="h-12 text-brand-dark-blue dark:text-brand-light-blue"
            fill="currentColor"
            viewBox="0 0 200 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g transform="translate(40, 0)">
              <path
                d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z"
              />
              <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z" />
              <text x="30" y="18" font-family="Manrope, sans-serif" font-size="14" font-weight="800">
                PharmaDerm
              </text>
            </g>
          </svg>
        </div>

        <h1 class="text-brand-dark-blue dark:text-white tracking-tight text-3xl font-bold text-center pb-6 pt-2">
          Bienvenido de nuevo
        </h1>

        <!-- Formulario -->
        <div class="w-full flex flex-col gap-4">
          <!-- Email -->
          <label class="flex flex-col w-full">
            <p class="text-brand-dark-blue dark:text-gray-300 text-sm font-medium pb-2">
              Correo electrónico
            </p>
            <input
              v-model="email"
              type="email"
              placeholder="tucorreo@ejemplo.com"
              class="form-input flex w-full rounded-lg text-brand-dark-blue dark:text-white
                     dark:bg-background-dark/50 focus:ring-2 focus:ring-brand-light-blue/50
                     border border-gray-300 dark:border-gray-600 bg-brand-soft-grey/50
                     h-14 p-4 text-base"
            />
          </label>

          <!-- Password -->
          <label class="flex flex-col w-full">
            <p class="text-brand-dark-blue dark:text-gray-300 text-sm font-medium pb-2">
              Contraseña
            </p>

            <div class="flex w-full items-stretch">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Introduce tu contraseña"
                class="form-input flex w-full rounded-l-lg text-brand-dark-blue dark:text-white
                       dark:bg-background-dark/50 focus:ring-2 focus:ring-brand-light-blue/50
                       border border-gray-300 dark:border-gray-600 bg-brand-soft-grey/50
                       h-14 p-4 text-base border-r-0"
              />

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="flex items-center justify-center px-4 border border-l-0
                       border-gray-300 dark:border-gray-600
                       bg-brand-soft-grey/50 dark:bg-background-dark/50 rounded-r-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 12s3.75-7.5 9.75-7.5 9.75 7.5 9.75 7.5-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                  <circle cx="12" cy="12" r="3.5" />
                </svg>
              </button>
            </div>
          </label>
        </div>

        <!-- Olvidé -->
        <div class="w-full text-right mt-2">
          <button
            type="button"
            @click="go('/olvide')"
            class="text-brand-dark-blue dark:text-brand-light-blue/80 text-sm underline hover:text-brand-light-blue"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        <!-- Botones -->
        <div class="w-full flex flex-col gap-4 mt-8">
          <button
            @click="go('/inicio')"
            class="w-full h-14 rounded-lg bg-brand-light-blue text-white font-bold"
          >
            Iniciar sesión
          </button>

          <button
            @click="go('/registro')"
            class="w-full h-14 rounded-lg border border-brand-dark-blue text-brand-dark-blue font-bold"
          >
            Registrarse
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);

const go = (path) => router.push(path);
</script>

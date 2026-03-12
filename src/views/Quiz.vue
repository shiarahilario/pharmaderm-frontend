<!-- src/views/Quiz.vue -->
<template>
  <div
    :class="[
      'min-h-screen pb-24',
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900',
    ]"
  >
    <!-- Top bar (simple, estilo MyRoutine) -->
    <header
      :class="[
        'sticky top-0 z-40 border-b',
        isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-100',
      ]"
      style="backdrop-filter: blur(10px)"
    >
      <div class="max-w-[980px] mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <!-- puedes cambiar el src por tu logo sin fondo -->
          <img
            :src="logoSrc"
            class="h-9 w-9 rounded-lg object-contain"
            alt="Logo"
          />
          <div class="leading-tight">
            <p class="text-xs tracking-widest uppercase opacity-70">My Routine</p>
            <p class="font-semibold">
              AI <span class="opacity-70 text-sm">by PharmaDerm</span>
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            class="p-2 rounded-full hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
            type="button"
            aria-label="Toggle dark mode"
            @click="toggleDark"
            title="Modo oscuro"
          >
            <span class="material-symbols-outlined">
              {{ isDark ? "light_mode" : "dark_mode" }}
            </span>
          </button>

          <button
            class="p-2 rounded-full hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
            type="button"
            aria-label="Close"
            title="Cerrar"
            @click="goBack"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <!-- progress bar (como en las capturas 1..2) -->
      <div class="max-w-[980px] mx-auto px-4 pb-2">
        <div class="flex items-center justify-between text-[11px] opacity-70">
          <span>1</span>
          <span>2</span>
        </div>
        <div
          class="h-[3px] rounded-full overflow-hidden"
          :class="[isDark ? 'bg-slate-800' : 'bg-slate-100']"
        >
          <div
            class="h-full"
            :style="{ width: progress + '%' }"
            color="bg-[#0EA5E9]"
          ></div>
        </div>
      </div>
    </header>

    <main class="max-w-[980px] mx-auto px-4">
      <!-- ===== STEP: SELFIE INSTRUCTIONS ===== -->
      <section v-if="step === 'selfie_instructions'" class="mt-4">
        <div class="rounded-2xl overflow-hidden">
          <div class="relative h-[260px] sm:h-[320px] overflow-hidden rounded-2xl">
            <img
              :src="heroSelfieBg"
              alt="Selfie background"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/35"></div>
          </div>

          <div class="mt-5">
            <h1 class="text-3xl sm:text-4xl tracking-tight font-light">
              TOMAR UN SELFIE
            </h1>

            <ul class="mt-4 space-y-2 text-sm sm:text-[15px] leading-relaxed">
              <li class="flex gap-2">
                <span class="mt-[6px] h-[4px] w-[4px] rounded-full bg-current opacity-70"></span>
                <span>Quitarse el maquillaje y los anteojos</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-[6px] h-[4px] w-[4px] rounded-full bg-current opacity-70"></span>
                <span>Tire de su cabello hacia atrás</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-[6px] h-[4px] w-[4px] rounded-full bg-current opacity-70"></span>
                <span>Cámara facial y mantener la expresión neutral</span>
              </li>
              <li class="flex gap-2">
                <span class="mt-[6px] h-[4px] w-[4px] rounded-full bg-current opacity-70"></span>
                <span>Manténgase en una luz natural bien iluminada</span>
              </li>
            </ul>

            <div
              class="mt-5 border rounded-xl p-4 text-sm leading-relaxed"
              :class="[isDark ? 'border-slate-700 bg-slate-900/40' : 'border-slate-200 bg-white']"
            >
              <p class="text-center opacity-80">
                La IA necesita acceder a su cámara para proporcionar una experiencia personalizada
                basada en su selfie. Su selfie no se almacenará en nuestra base de datos.
              </p>
            </div>

            <button
              class="mt-6 w-full py-4 rounded-none bg-[#0EA5E9] text-white font-medium tracking-wide hover:opacity-95"
              type="button"
              @click="openCamera()"
            >
              TOMAR UN SELFIE
            </button>

            <button
              class="mt-3 w-full py-4 rounded-none border font-medium tracking-wide hover:bg-slate-50 dark:hover:bg-slate-900/40"
              :class="[isDark ? 'border-slate-700' : 'border-slate-300']"
              type="button"
              @click="triggerUpload"
            >
              CARGAR UNA FOTOGRAFÍA
            </button>

            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onFilePicked"
            />
          </div>
        </div>
      </section>

      <!-- ===== STEP: CAMERA CAPTURE (simulado / real con getUserMedia si se puede) ===== -->
      <section v-else-if="step === 'camera'" class="mt-4">
        <div class="relative rounded-2xl overflow-hidden">
          <!-- video -->
          <div class="relative">
            <video
              v-if="cameraReady && !capturedDataUrl"
              ref="videoEl"
              autoplay
              playsinline
              muted
              class="w-full h-[520px] sm:h-[620px] object-cover"
            ></video>

            <img
              v-else
              :src="capturedDataUrl || heroSelfieBg"
              class="w-full h-[520px] sm:h-[620px] object-cover"
              alt="Preview"
            />

            <!-- overlay grid + frame -->
            <div class="absolute inset-0 pointer-events-none">
              <div class="absolute inset-0 bg-black/25"></div>

              <div class="absolute inset-0 flex items-center justify-center">
                <div class="frame-corners w-[82%] h-[62%]"></div>
              </div>

              <div class="absolute inset-0 opacity-25">
                <div class="grid-overlay"></div>
              </div>

              <div class="absolute top-3 left-3 right-3 flex gap-2">
                <div class="badge">ILUMINACIÓN</div>
                <div class="badge">POSICIÓN FACIAL</div>
                <div class="badge">VEA RECTO</div>
              </div>

              <div
                v-if="countdown > 0 && !capturedDataUrl"
                class="absolute inset-0 flex items-center justify-center"
              >
                <div class="text-white text-7xl font-light drop-shadow-lg">{{ countdown }}</div>
              </div>
            </div>
          </div>

          <!-- bottom sheet -->
          <div
            class="absolute left-0 right-0 bottom-0 p-4 sm:p-5"
            :class="[isDark ? 'bg-slate-950/65' : 'bg-white/55']"
            style="backdrop-filter: blur(12px)"
          >
            <div class="max-w-[980px] mx-auto">
              <p class="text-center text-sm opacity-90">
                {{ capturedDataUrl ? "HECHO" : statusText }}
              </p>

              <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  v-if="!capturedDataUrl"
                  class="w-full py-3 bg-[#0EA5E9] text-white font-medium"
                  type="button"
                  @click="startCountdownAndCapture"
                  :disabled="!cameraReady"
                >
                  ANALIZAR / CAPTURAR
                </button>

                <button
                  v-else
                  class="w-full py-3 bg-[#0EA5E9] text-white font-medium"
                  type="button"
                  @click="confirmSelfie"
                >
                  CONTINUE
                </button>

                <button
                  class="w-full py-3 border font-medium"
                  :class="[isDark ? 'border-slate-700' : 'border-slate-300']"
                  type="button"
                  @click="retakeSelfie"
                >
                  {{ capturedDataUrl ? "RETOMANDO SELFIE" : "CARGAR UNA FOTOGRAFÍA" }}
                </button>
              </div>
            </div>
          </div>

          <!-- hidden canvas -->
          <canvas ref="canvasEl" class="hidden"></canvas>
        </div>
      </section>

      <!-- ===== STEP: ABOUT YOU (chat + edad) ===== -->
      <section v-else-if="step === 'about_you'" class="mt-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-[12px] opacity-70">
            <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0EA5E9] text-white">1</span>
            <span class="inline-flex items-center justify-center w-6 h-6 rounded-full border"
              :class="[isDark ? 'border-slate-700' : 'border-slate-200']"
            >2</span>
          </div>
        </div>

        <div class="mt-6 space-y-4">
          <ChatBubble side="bot" :dark="isDark">
            ¡Hola! Soy el asistente del bot de análisis de la piel.
          </ChatBubble>
          <ChatBubble side="bot" :dark="isDark">
            Analizaré su piel para ayudarle a comprender sus prioridades. Le haré algunas preguntas.
          </ChatBubble>

          <ChatBubble side="bot" :dark="isDark">
            ¿Cuántos años tiene?
          </ChatBubble>

          <div class="mt-10 flex items-center justify-center">
            <button
              class="w-full sm:w-[420px] border-b py-3 text-center text-sm opacity-80 hover:opacity-100"
              :class="[isDark ? 'border-slate-700' : 'border-slate-300']"
              type="button"
              @click="openAgeModal"
            >
              {{ answers.age ? `${answers.age} años de edad` : "— —     años de edad" }}
            </button>
          </div>
        </div>
      </section>

      <!-- ===== STEP: SKIN PROFILE (tipo de piel + sensibilidad slider) ===== -->
      <section v-else-if="step === 'skin_profile'" class="mt-6">
        <h2 class="text-3xl font-light tracking-tight">PERFIL DE LA PIEL</h2>

        <div class="mt-5 space-y-3">
          <ChatBubble side="bot" :dark="isDark">
            Estamos comparando tu foto con otras 50,000 imágenes.
          </ChatBubble>
          <ChatBubble side="bot" :dark="isDark">
            Nuestro análisis sugiere que puede tener la piel <b>SECA</b>.
          </ChatBubble>
          <ChatBubble side="bot" :dark="isDark">
            Puede confirmar o seleccionar otro tipo de piel.
          </ChatBubble>
        </div>

        <!-- cards tipo piel -->
        <div class="mt-6 overflow-x-auto pb-2">
          <div class="flex gap-4 min-w-max">
            <SkinCard
              v-for="t in skinTypes"
              :key="t.key"
              :title="t.title"
              :desc="t.desc"
              :img="t.img"
              :selected="answers.skinType === t.key"
              :dark="isDark"
              @select="answers.skinType = t.key"
            />
          </div>
        </div>

        <div class="mt-5 flex items-center justify-center">
          <button
            class="w-full sm:w-[420px] py-3 rounded-full bg-[#0EA5E9] text-white font-medium"
            type="button"
            :disabled="!answers.skinType"
            :class="[!answers.skinType ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-95']"
            @click="goToSensitivity"
          >
            Confirmar
          </button>
        </div>

        <!-- sensibilidad -->
        <div class="mt-10">
          <div class="inline-flex items-center justify-between w-full">
            <ChatBubble side="bot" :dark="isDark">
              ¿Tiene piel sensible? Seleccione su nivel de sensibilidad cutánea.
            </ChatBubble>
          </div>

          <div class="mt-8 flex flex-col items-center">
            <div class="w-20 h-20 rounded-full flex items-center justify-center">
              <span class="material-symbols-outlined text-6xl opacity-70">face</span>
            </div>

            <div class="mt-6 w-full sm:w-[520px]">
              <input
                type="range"
                min="0"
                max="3"
                step="1"
                v-model.number="answers.sensitivity"
                class="w-full range-blue"
              />
              <div class="mt-2 flex justify-between text-xs opacity-75">
                <span>Ninguno</span>
                <span>Bajo</span>
                <span>Medio</span>
                <span>Alto</span>
              </div>
            </div>

            <button
              class="mt-8 w-full sm:w-[520px] py-4 bg-[#0EA5E9] text-white font-medium tracking-wide hover:opacity-95"
              type="button"
              @click="finishQuestions"
            >
              SIGUIENTE
            </button>
          </div>
        </div>
      </section>

      <!-- ===== STEP: RESULTS SUMMARY (barras + foto) ===== -->
      <section v-else-if="step === 'results_summary'" class="mt-6">
        <div class="flex items-center justify-between">
          <button
            class="p-2 rounded-full hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
            type="button"
            @click="step = 'skin_profile'"
            aria-label="Back"
          >
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            class="p-2 rounded-full hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
            type="button"
            @click="openNpsModal"
            aria-label="Close"
            title="Cerrar"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="mt-3">
          <h2 class="text-2xl font-light">Mi análisis</h2>
          <p class="mt-2 text-sm opacity-80 max-w-[680px]">
            Este análisis basado en datos revela las fortalezas y áreas de mejora de su piel, lo que le permite
            tomar decisiones informadas.
          </p>

          <div class="mt-5">
            <span class="inline-flex text-[11px] px-2 py-1 rounded bg-[#0EA5E9]/15 text-[#0EA5E9]">
              Inquietud de prioridad
            </span>
            <p class="mt-2 text-lg font-medium">Luminosidad</p>
          </div>

          <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              class="rounded-2xl overflow-hidden"
              :class="[isDark ? 'bg-slate-900/40 border border-slate-800' : 'bg-black/5 border border-slate-100']"
            >
              <div class="p-4">
                <img
                  :src="capturedDataUrl || selfiePlaceholder"
                  alt="selfie"
                  class="w-full h-[320px] object-cover rounded-xl"
                />
              </div>

              <div class="px-4 pb-5">
                <BarRow v-for="m in metrics" :key="m.key" :label="m.label" :score="m.score" />
                <button
                  class="mt-4 w-full py-3 border font-medium hover:bg-slate-50 dark:hover:bg-slate-900/40"
                  :class="[isDark ? 'border-slate-700' : 'border-slate-300']"
                  type="button"
                  @click="step = 'analysis_full'"
                >
                  Ver análisis completo
                </button>
              </div>
            </div>

            <div class="space-y-4">
              <div
                class="rounded-2xl border p-4"
                :class="[isDark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white']"
              >
                <h3 class="text-lg font-medium">Su rutina personalizada</h3>
                <p class="mt-1 text-sm opacity-80">
                  Sus elementos esenciales de rutina para el día y la noche para abordar su área de enfoque principal.
                </p>

                <div
                  class="mt-4 rounded-xl border p-4"
                  :class="[isDark ? 'border-slate-800 bg-slate-950/30' : 'border-slate-200 bg-slate-50']"
                >
                  <p class="text-lg font-medium">Luminosidad</p>
                  <p class="mt-2 text-sm opacity-80">
                    Los dermatólogos caracterizan la piel de aspecto radiante por su luminosidad y uniformidad de tono.
                  </p>
                  <button
                    class="mt-3 text-sm underline opacity-80 hover:opacity-100"
                    type="button"
                    @click="openInfoModal"
                  >
                    Inquietud de cambio
                  </button>
                </div>

                <button
                  class="mt-5 w-full py-4 bg-[#0EA5E9] text-white font-medium hover:opacity-95"
                  type="button"
                  @click="step = 'routine'"
                >
                  Ver rutina
                </button>
              </div>

              <button
                class="w-full py-4 border font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-900/40"
                :class="[isDark ? 'border-slate-800' : 'border-slate-300']"
                type="button"
                @click="sendRoutineByEmail"
              >
                <span class="material-symbols-outlined">mail</span>
                ENVIAR MI RUTINA POR CORREO ELECTRÓNICO
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== STEP: ROUTINE (pasos + card producto estilo captura) ===== -->
      <section v-else-if="step === 'routine'" class="mt-6">
        <div class="flex items-center justify-between">
          <button
            class="p-2 rounded-full hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
            type="button"
            @click="step = 'results_summary'"
            aria-label="Back"
          >
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            class="p-2 rounded-full hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
            type="button"
            aria-label="Close"
            @click="openNpsModal"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- top promo strip -->
        <div class="mt-4 bg-[#0EA5E9] text-white px-4 py-3 flex items-center gap-2">
          <span class="material-symbols-outlined">content_copy</span>
          <p class="text-sm">
            Consigue un 10 % de descuento en tu pedido al registrarte para recibir tus resultados.
          </p>
        </div>

        <div class="mt-6">
          <h2 class="text-3xl font-light">SU RUTINA PERSONALIZADA</h2>
          <p class="mt-2 text-sm opacity-80">
            Sus elementos esenciales de rutina para el día y la noche para abordar su área de enfoque principal.
          </p>

          <div class="mt-6 space-y-8">
            <RoutineStep
              v-for="s in routineSteps"
              :key="s.step"
              :data="s"
              :dark="isDark"
              @info="openInfoModal"
              @add="addToCart(s.product)"
            />
          </div>

          <button
            class="mt-8 w-full py-4 border font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-900/40"
            :class="[isDark ? 'border-slate-800' : 'border-slate-300']"
            type="button"
            @click="sendRoutineByEmail"
          >
            <span class="material-symbols-outlined">mail</span>
            ENVIAR MI RUTINA POR CORREO ELECTRÓNICO
          </button>
        </div>
      </section>

      <!-- ===== STEP: ANALYSIS FULL (lista) ===== -->
      <section v-else-if="step === 'analysis_full'" class="mt-6">
        <div class="flex items-center gap-2">
          <button
            class="p-2 rounded-full hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
            type="button"
            @click="step = 'results_summary'"
          >
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 class="text-2xl font-light">Mi análisis</h2>
        </div>

        <p class="mt-2 text-sm opacity-80 max-w-[680px]">
          Detalle de áreas evaluadas (ejemplo visual). Puedes ajustar los nombres/valores según tu lógica.
        </p>

        <div class="mt-5 space-y-5">
          <BarRow v-for="m in metricsFull" :key="m.key" :label="m.label" :score="m.score" />
        </div>
      </section>
    </main>

    <!-- ===== MODAL: AGE ===== -->
    <div v-if="ageModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-black/60" @click="closeAgeModal"></div>

      <div
        class="relative w-full max-w-[520px] rounded-none bg-white text-slate-900 p-6"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xl font-light tracking-wide">SU EDAD</h3>
            <p class="mt-2 text-sm text-slate-600">
              Conocer su edad nos ayudará a determinar las necesidades de su piel.
            </p>
          </div>
          <button class="p-1" type="button" @click="closeAgeModal">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <div class="mt-5 flex items-center gap-3">
          <input
            v-model.number="ageDraft"
            type="number"
            min="1"
            max="120"
            class="w-28 text-2xl border-2 border-[#EAB308] focus:outline-none px-3 py-2"
          />
          <span class="text-sm text-slate-600">años de edad</span>
        </div>

        <button
          class="mt-6 w-full py-3 bg-[#0EA5E9] text-white font-medium"
          type="button"
          @click="saveAge"
        >
          ESTÁ BIEN
        </button>
      </div>
    </div>

    <!-- ===== MODAL: INFO (leer más) ===== -->
    <div v-if="infoModal" class="fixed inset-0 z-50">
      <div class="absolute inset-0 bg-black/60" @click="closeInfoModal"></div>

      <div class="absolute inset-x-0 top-0 bg-[#0EA5E9] text-white px-6 py-10">
        <button class="absolute top-4 right-4 p-2" type="button" @click="closeInfoModal">
          <span class="material-symbols-outlined">close</span>
        </button>

        <h3 class="text-2xl font-light tracking-wide text-center">
          OBTENER MÁS INFORMACIÓN SOBRE LA PRIORIDAD DE SU PIEL
        </h3>

        <div class="max-w-[740px] mx-auto mt-8 bg-white text-slate-900 p-6">
          <h4 class="text-lg font-medium">
            ¿CUÁLES SON LOS MOTIVOS DE LA FALTA DE LUMINOSIDAD?
          </h4>
          <p class="mt-3 text-sm text-slate-700 leading-relaxed">
            La falta de luminosidad puede ser causada por acumulación de células muertas, mala circulación,
            deshidratación, genética y otros factores.
          </p>

          <button
            class="mt-6 w-full py-3 bg-[#0EA5E9] text-white font-medium"
            type="button"
            @click="closeInfoModal"
          >
            LEER MÁS
          </button>
        </div>
      </div>
    </div>

    <!-- ===== MODAL: NPS ===== -->
    <div v-if="npsModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div class="absolute inset-0 bg-black/70" @click="closeNpsModal"></div>

      <div class="relative w-full max-w-[520px] bg-white text-slate-900 p-6">
        <button class="absolute top-4 right-4 p-1" type="button" @click="closeNpsModal">
          <span class="material-symbols-outlined">close</span>
        </button>

        <h3 class="text-xl font-black tracking-wide">¡GRACIAS POR SUS COMENTARIOS!</h3>
        <p class="mt-3 text-sm text-slate-700">
          Según su experiencia, ¿qué tan probable es que recomiende MyRoutine AI a un amigo?
        </p>

        <div class="mt-5 grid grid-cols-10 gap-2">
          <button
            v-for="n in 10"
            :key="n"
            class="h-10 border rounded"
            :class="[npsScore === n ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-300']"
            type="button"
            @click="npsScore = n"
          >
            {{ n }}
          </button>
        </div>

        <div class="mt-2 flex justify-between text-xs text-slate-600">
          <span>Para nada probable</span>
          <span>Extremadamente probable</span>
        </div>

        <button
          class="mt-6 w-full py-3 border font-medium"
          type="button"
          @click="closeNpsModal"
        >
          CIERRE SIN CALIFICACIÓN
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

/**
 * NOTA:
 * - Esto replica la UI/flujo de las capturas (selfie -> camera -> preguntas -> resultados -> rutina -> modales).
 * - No hace “IA real”; es UI funcional + estado.
 * - Reemplaza imágenes/strings cuando quieras.
 */

const router = useRouter();

const logoSrc = ref(
  // pon aquí tu logo sin fondo (el que ya editaste)
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCwGk1ZsXrDiVM1y4eYkFkLAVJyj3SEQtwpa9gS41xgybM4JsMSUQU1bAYKb4aviIWmG2GtMVM1nQrg4rTEm3bi80sHtcf-M6xSUCR2ua9YOhGfPNVmoJhBG1zcuzQq8mODOnwTQihKFT5tQ_dy8FM8IC-Z12rIEybnyvjZd3JctWEFO86kmHZonJMxnQG6HrfgLFeTwIK6wsY-4PKy7LSaqAD3iJEqDxf2JVzH6t5Aj5cneE7Af9KkyxdLRTwpToy3oqVFRaMPLFs"
);

const heroSelfieBg = ref(
  // fondo tipo “rostro” (puedes cambiarlo)
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop"
);

const selfiePlaceholder = ref(
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop"
);

/* ===== Dark mode (local) ===== */
const isDark = ref(false);
const toggleDark = () => {
  isDark.value = !isDark.value;
  localStorage.setItem("quiz_dark", isDark.value ? "1" : "0");
};
onMounted(() => {
  isDark.value = localStorage.getItem("quiz_dark") === "1";
});

/* ===== Steps ===== */
const step = ref("selfie_instructions"); // selfie_instructions | camera | about_you | skin_profile | results_summary | routine | analysis_full

const progress = computed(() => {
  const map = {
    selfie_instructions: 5,
    camera: 20,
    about_you: 45,
    skin_profile: 65,
    results_summary: 85,
    routine: 95,
    analysis_full: 90,
  };
  return map[step.value] ?? 10;
});

/* ===== Answers/state ===== */
const answers = reactive({
  age: null,
  skinType: "",
  sensitivity: 1, // 0..3
});

/* ===== Age modal ===== */
const ageModal = ref(false);
const ageDraft = ref(17);

const openAgeModal = () => {
  ageDraft.value = answers.age ?? 17;
  ageModal.value = true;
};
const closeAgeModal = () => (ageModal.value = false);
const saveAge = () => {
  const v = Number(ageDraft.value);
  if (!Number.isFinite(v) || v < 1) return;
  answers.age = v;
  ageModal.value = false;
  // pasa al siguiente bloque automáticamente
  step.value = "skin_profile";
};

/* ===== Info modal ===== */
const infoModal = ref(false);
const openInfoModal = () => (infoModal.value = true);
const closeInfoModal = () => (infoModal.value = false);

/* ===== NPS modal ===== */
const npsModal = ref(false);
const npsScore = ref(null);
const openNpsModal = () => (npsModal.value = true);
const closeNpsModal = () => (npsModal.value = false);

/* ===== Navigation ===== */
const goBack = () => {
  // vuelve a inicio o a donde prefieras
  router.push("/inicio");
};

/* ===== File upload ===== */
const fileInput = ref(null);
const triggerUpload = () => fileInput.value?.click();

const capturedDataUrl = ref("");
const onFilePicked = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    capturedDataUrl.value = String(reader.result || "");
    step.value = "about_you";
  };
  reader.readAsDataURL(file);
};

/* ===== Camera (getUserMedia) ===== */
const videoEl = ref(null);
const canvasEl = ref(null);
const cameraReady = ref(false);
const statusText = ref("Tienes la posición perfecta.");
let stream = null;

const openCamera = async () => {
  step.value = "camera";
  capturedDataUrl.value = "";
  await startCamera();
};

const startCamera = async () => {
  cameraReady.value = false;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false,
    });
    if (videoEl.value) {
      videoEl.value.srcObject = stream;
      await videoEl.value.play();
      cameraReady.value = true;
    }
  } catch (err) {
    // si no hay permisos/cámara: vuelve a upload
    statusText.value = "No se pudo acceder a la cámara. Use CARGAR UNA FOTOGRAFÍA.";
    cameraReady.value = false;
  }
};

const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
    stream = null;
  }
  cameraReady.value = false;
};

onBeforeUnmount(() => stopCamera());

/* countdown + capture */
const countdown = ref(0);
let countdownTimer = null;

const startCountdownAndCapture = () => {
  if (!cameraReady.value || !videoEl.value || !canvasEl.value) return;

  countdown.value = 3;
  clearInterval(countdownTimer);

  countdownTimer = setInterval(() => {
    countdown.value -= 1;

    if (countdown.value <= 0) {
      clearInterval(countdownTimer);
      captureFrame();
    }
  }, 800);
};

const captureFrame = () => {
  if (!videoEl.value || !canvasEl.value) return;

  const v = videoEl.value;
  const c = canvasEl.value;

  c.width = v.videoWidth || 720;
  c.height = v.videoHeight || 1280;

  const ctx = c.getContext("2d");
  ctx.drawImage(v, 0, 0, c.width, c.height);
  capturedDataUrl.value = c.toDataURL("image/jpeg", 0.9);

  stopCamera();
};

const retakeSelfie = async () => {
  capturedDataUrl.value = "";
  await startCamera();
};

const confirmSelfie = () => {
  step.value = "about_you";
};

/* ===== Skin types cards ===== */
const skinTypes = ref([
  {
    key: "seca",
    title: "PIEL SECA",
    desc:
      "Seleccione este tipo de piel si la piel tiende a sentirse incómoda por descamación o falta de humedad.",
    img: "https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "normal",
    title: "PIEL NORMAL",
    desc: "Equilibrada, sin exceso de grasa ni resequedad notable en la mayoría de zonas.",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "mixta",
    title: "PIEL MIXTA",
    desc: "Zona T más oleosa con mejillas normales o ligeramente secas.",
    img: "https://images.unsplash.com/photo-1520975867597-0f7b5f2a4bcd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    key: "grasa",
    title: "PIEL GRASA",
    desc: "Brillo visible, poros más notorios y tendencia a acné en algunas zonas.",
    img: "https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop",
  },
]);

const goToSensitivity = () => {
  // mantiene en la misma pantalla, solo “simula” confirmación
  // (ya tienes el slider debajo)
  // aquí podrías scrollear si quieres
};

const finishQuestions = () => {
  step.value = "results_summary";
};

/* ===== Results data ===== */
const metrics = ref([
  { key: "luminosidad", label: "Luminosidad", score: 7.1 },
  { key: "ojeras", label: "Bolsas para ojos", score: 8.5 },
  { key: "firmness", label: "Firmness", score: 8.6 },
]);

const metricsFull = ref([
  ...metrics.value,
  { key: "manchas", label: "Manchas oscuras", score: 8.7 },
  { key: "arrugas_ojos", label: "Arrugas en los ojos", score: 9.3 },
  { key: "arrugas", label: "Arrugas", score: 9.3 },
]);

/* ===== Routine (ejemplo UI) ===== */
const routineSteps = ref([
  {
    step: "Paso 3",
    title: "HUMECTAR",
    product: {
      name: "Hidratante facial Toleriane Double Repair",
      desc:
        "Formulado con ingredientes recomendados por dermatólogos para ayudar a restaurar la barrera.",
      size: "100ML",
      price: "US$24.99",
      rating: 4.4,
      reviews: 2491,
      img:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBMMlDIqmWLn_g7u4DLf32ffJ_h7LXEhd3iezdcAYWpk1nH2ULAE-sjIHl30kUmcN1eLFus8MN41AaIkGr4-Za_7vNUyWqqQyQiVhP2E41vFNm73DuxgaB7JcTvd8WY0cSjUVzIcb6hDFzk3w6W9zsJsgIDtgzwaCZDdenS9IR_ZAgHJUVH_aX4o0O7VEwEfVNrQRiE2Qn1FdXcCLF6Jp1SAnuUDEThlt8UF7zh2c_nMiSW8Y-Ni7M7TyGW4hsVgWnM5ZBlZ_YdWew",
    },
  },
  {
    step: "Paso 4",
    title: "PROTEGER",
    product: {
      name: "Anthelios Fluido Ultra Ligero SPF",
      desc: "Protector solar de uso diario, acabado ligero y protección UVA/UVB.",
      size: "50ML",
      price: "US$29.99",
      rating: 4.5,
      reviews: 554,
      img:
        "https://images.unsplash.com/photo-1620916566393-7bfb1a35a2aa?q=80&w=1200&auto=format&fit=crop",
    },
  },
]);

/* ===== Buttons actions (simulados) ===== */
const addToCart = (product) => {
  // aquí conectas con tu store/carrito real
  console.log("Add to cart:", product);
};

const sendRoutineByEmail = () => {
  // UI-only
  alert("Listo: aquí puedes integrar envío por correo (UI simulada).");
};
</script>

<script>
/**
 * Subcomponentes inline (para que sea “código completo” en 1 archivo).
 * Si prefieres, los separo en components/.
 */
export default {
  components: {
    ChatBubble: {
      props: { side: String, dark: Boolean },
      template: `
        <div class="flex items-start gap-3" :class="side==='bot' ? '' : 'justify-end'">
          <div v-if="side==='bot'" class="w-9 h-9 rounded-full flex items-center justify-center opacity-70">
            <span class="material-symbols-outlined">person</span>
          </div>

          <div
            class="max-w-[680px] rounded-2xl px-4 py-3 text-sm leading-relaxed"
            :class="dark
              ? 'bg-slate-900/40 border border-slate-800'
              : 'bg-slate-50 border border-slate-100'"
          >
            <slot />
          </div>
        </div>
      `,
    },

    SkinCard: {
      props: { title: String, desc: String, img: String, selected: Boolean, dark: Boolean },
      emits: ["select"],
      template: `
        <button
          type="button"
          class="w-[260px] sm:w-[290px] rounded-2xl overflow-hidden border text-left"
          :class="[
            dark ? 'border-slate-800 bg-slate-900/30' : 'border-slate-200 bg-white',
            selected ? 'ring-2 ring-[#0EA5E9]' : ''
          ]"
          @click="$emit('select')"
        >
          <div class="h-[110px] overflow-hidden">
            <img :src="img" class="w-full h-full object-cover" :alt="title" />
          </div>
          <div class="p-4">
            <p class="text-sm font-medium text-[#0EA5E9]">{{ title }}</p>
            <p class="mt-2 text-xs opacity-80 leading-relaxed">{{ desc }}</p>
            <div class="mt-4 flex justify-center">
              <span
                class="inline-flex items-center justify-center w-full py-2 rounded-xl border text-sm"
                :class="dark ? 'border-slate-800' : 'border-slate-200'"
              >
                Seleccionar
              </span>
            </div>
          </div>
        </button>
      `,
    },

    BarRow: {
      props: { label: String, score: Number },
      computed: {
        pct() {
          const v = Number(this.score) || 0;
          return Math.max(0, Math.min(100, (v / 10) * 100));
        },
        labelText() {
          if (this.score >= 9) return "Excelente";
          if (this.score >= 7) return "Bueno";
          return "Regular";
        },
      },
      template: `
        <div class="py-3 border-t border-slate-200/60 dark:border-slate-800/70">
          <div class="flex justify-between items-end">
            <div>
              <p class="text-sm font-medium">{{ label }}</p>
              <p class="text-xs opacity-70">{{ labelText }}</p>
            </div>
            <p class="text-xs opacity-80">{{ score.toFixed(1) }}/10</p>
          </div>

          <div class="mt-2 h-[3px] rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div class="h-full bg-[#0EA5E9]" :style="{ width: pct + '%' }"></div>
          </div>
        </div>
      `,
    },

    RoutineStep: {
      props: { data: Object, dark: Boolean },
      emits: ["info", "add"],
      methods: {
        stars(r) {
          const full = Math.floor(r);
          return "★".repeat(full) + "☆".repeat(5 - full);
        },
      },
      template: `
        <div>
          <p class="text-sm opacity-80">{{ data.step }}</p>
          <p class="text-sm font-medium tracking-wide">{{ data.title }}</p>

          <div class="mt-3 border-2 border-[#0EA5E9] bg-white text-slate-900">
            <div class="p-4 flex gap-4">
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-medium">{{ data.product.name }}</p>
                  <p class="text-xs opacity-70">{{ stars(data.product.rating) }} ({{ data.product.reviews }})</p>
                </div>

                <p class="mt-2 text-xs text-slate-600 leading-relaxed">
                  {{ data.product.desc }}
                </p>

                <div class="mt-3 text-xs text-slate-700">
                  <p>{{ data.product.size }}</p>
                  <p class="mt-1 font-semibold">{{ data.product.price }}</p>
                </div>
              </div>

              <div class="w-[90px] flex items-center justify-center">
                <img :src="data.product.img" class="w-[80px] h-[80px] object-contain" :alt="data.product.name" />
              </div>
            </div>

            <div class="grid grid-cols-2">
              <button
                type="button"
                class="py-3 border-t border-r border-slate-200 text-sm font-medium hover:bg-slate-50"
                @click="$emit('info')"
              >
                OBTENER MÁS INFORMACIÓN
              </button>
              <button
                type="button"
                class="py-3 border-t border-slate-200 text-sm font-medium bg-[#0EA5E9] text-white hover:opacity-95"
                @click="$emit('add')"
              >
                <span class="inline-flex items-center justify-center gap-2">
                  <span class="material-symbols-outlined text-[18px]">lock</span>
                  AGREGAR AL CARRITO
                </span>
              </button>
            </div>
          </div>
        </div>
      `,
    },
  },
};
</script>

<style scoped>
/* esquinas tipo “marco” */
.frame-corners {
  position: relative;
  border-radius: 22px;
}
.frame-corners::before,
.frame-corners::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 22px;
  border: 3px solid rgba(255, 255, 255, 0.85);
  clip-path: polygon(
    0 0, 18% 0, 18% 6%, 6% 6%, 6% 18%, 0 18%,
    0 0,
    82% 0, 100% 0, 100% 18%, 94% 18%, 94% 6%, 82% 6%,
    82% 0,
    0 82%, 0 100%, 18% 100%, 18% 94%, 6% 94%, 6% 82%,
    0 82%,
    100% 82%, 100% 100%, 82% 100%, 82% 94%, 94% 94%, 94% 82%,
    100% 82%
  );
  opacity: 0.85;
}

/* overlay de grilla */
.grid-overlay {
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* chips arriba */
.badge {
  padding: 6px 10px;
  font-size: 11px;
  letter-spacing: 0.12em;
  border: 1px solid rgba(16,185,129,0.7);
  color: rgba(16,185,129,0.95);
  background: rgba(0,0,0,0.25);
  text-transform: uppercase;
  flex: 1;
  text-align: center;
}

/* range azul como capturas */
.range-blue {
  accent-color: #0ea5e9;
}
</style>
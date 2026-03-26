<template>
  <div class="min-h-screen bg-[#F7F7F4] text-slate-900">
    <header class="sticky top-0 z-40 border-b border-slate-200 bg-[#F7F7F4]">
      <div class="max-w-[980px] mx-auto px-4 py-3 flex items-center justify-between">
        <button
          class="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200/60"
          type="button"
          aria-label="Back"
          @click="handleBack"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>

        <img :src="logoSrc" class="h-10 object-contain" alt="My Routine AI" />

        <button
          class="w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200/60"
          type="button"
          aria-label="Close"
          @click="closeQuiz"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <div v-if="showProgress" class="max-w-[980px] mx-auto px-4 pb-3">
        <div class="flex items-center gap-2">
          <div class="progress-node" :class="{ active: progressStep >= 1 }">1</div>
          <div class="flex-1 h-[2px] rounded-full bg-sky-100 overflow-hidden">
            <div
              class="h-full bg-[#16A6E2] transition-all duration-300"
              :style="{ width: progressBarWidth + '%' }"
            ></div>
          </div>
          <div class="progress-node" :class="{ active: progressStep >= 2 }">2</div>
        </div>
      </div>
    </header>

    <main class="max-w-[980px] mx-auto px-4 pb-28">
      <!-- STEP 1 -->
      <section v-if="step === 'selfie_instructions'">
        <div class="relative overflow-hidden bg-white">
          <div class="relative h-[300px] sm:h-[360px]">
            <img :src="heroSelfieBg" alt="Selfie guide" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-slate-900/30"></div>
          </div>

          <div class="px-6 py-8 bg-[#F7F7F4]">
            <h1 class="text-[28px] sm:text-[40px] tracking-wide font-light text-slate-900">
              TOMAR UN SELFIE
            </h1>

            <ul class="mt-7 space-y-5 text-[15px] sm:text-[18px] text-slate-800 leading-relaxed">
              <li class="flex gap-4">
                <span class="mt-[10px] w-[5px] h-[5px] rounded-full bg-slate-800 shrink-0"></span>
                <span>Quitarse el maquillaje y los anteojos</span>
              </li>
              <li class="flex gap-4">
                <span class="mt-[10px] w-[5px] h-[5px] rounded-full bg-slate-800 shrink-0"></span>
                <span>Tire de su cabello hacia atrás</span>
              </li>
              <li class="flex gap-4">
                <span class="mt-[10px] w-[5px] h-[5px] rounded-full bg-slate-800 shrink-0"></span>
                <span>Cámara facial y mantener la expresión neutral</span>
              </li>
              <li class="flex gap-4">
                <span class="mt-[10px] w-[5px] h-[5px] rounded-full bg-slate-800 shrink-0"></span>
                <span>Manténgase en una luz natural bien iluminada</span>
              </li>
            </ul>

            <div class="mt-8 border border-slate-500 px-5 py-6 text-center text-slate-700 text-[14px] sm:text-[18px] leading-relaxed bg-white/60">
              <p>
                La IA de MyRoutine necesita acceder a su cámara para proporcionar una
                experiencia personalizada basada en su selfie.
              </p>
              <p class="mt-2">
                Su selfie no se almacenará en nuestra base de datos.
              </p>
            </div>

            <button
              class="mt-10 w-full h-[58px] bg-[#16A6E2] text-white text-[15px] sm:text-[18px] tracking-wide"
              type="button"
              @click="openCamera"
            >
              TOMAR UN SELFIE
            </button>

            <button
              class="mt-5 w-full h-[58px] text-slate-900 text-[15px] sm:text-[18px] tracking-wide"
              type="button"
              @click="triggerUpload"
            >
              CARGAR UNA FOTOGRAFÍA
            </button>

            <button
              class="mt-2 w-full h-[50px] text-slate-500 text-[14px] sm:text-[16px] tracking-wide underline underline-offset-4"
              type="button"
              @click="continueWithoutSelfie"
            >
              CONTINUAR SIN SELFIE
            </button>
          </div>
        </div>
      </section>

      <!-- STEP 2 -->
      <section v-else-if="step === 'camera'">
        <div class="relative bg-black overflow-hidden min-h-[calc(100vh-96px)]">
          <video
            v-show="cameraReady && !capturedDataUrl"
            ref="videoEl"
            autoplay
            playsinline
            muted
            class="w-full h-[calc(100vh-96px)] object-cover"
          ></video>

          <img
            v-if="!cameraReady || capturedDataUrl"
            :src="capturedDataUrl || heroSelfieBg"
            alt="Preview"
            class="w-full h-[calc(100vh-96px)] object-cover"
          />

          <div class="absolute inset-0 bg-black/10"></div>

          <div class="absolute top-3 left-3 right-3 flex gap-3 z-20">
            <div class="camera-chip" :class="{ ok: liveChecks.lighting }">ILUMINACIÓN</div>
            <div class="camera-chip" :class="{ ok: liveChecks.position }">POSICIÓN FACIAL</div>
            <div class="camera-chip" :class="{ ok: liveChecks.straight }">VEA RECTO</div>
          </div>

          <p class="absolute top-16 left-0 right-0 text-center text-white text-[16px] sm:text-[22px] z-20 drop-shadow px-4">
            {{ statusText }}
          </p>

          <div class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div class="face-guide">
              <div class="corner tl"></div>
              <div class="corner tr"></div>
              <div class="corner bl"></div>
              <div class="corner br"></div>
              <div class="mesh"></div>

              <div
                v-if="countdown > 0 && !capturedDataUrl"
                class="absolute inset-0 flex items-center justify-center text-white text-[120px] font-light"
              >
                {{ countdown }}
              </div>
            </div>
          </div>

          <div class="absolute left-0 right-0 bottom-0 z-20 px-4 pb-5">
            <div class="bg-white/80 backdrop-blur-md rounded-[26px] p-5">
              <button
                class="w-full h-[56px] bg-[#16A6E2] text-white text-[16px] tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                :disabled="!cameraReady || detectorLoading"
                @click="captureWithValidation"
              >
                {{ detectorLoading ? "CARGANDO DETECTOR..." : "TOMAR SELFIE" }}
              </button>

              <button
                class="mt-4 w-full h-[56px] border border-slate-400 text-slate-800 text-[16px]"
                type="button"
                @click="triggerUpload"
              >
                CARGAR UNA FOTOGRAFÍA
              </button>

              <button
                class="mt-3 w-full h-[48px] text-slate-600 text-[14px] sm:text-[16px] underline underline-offset-4"
                type="button"
                @click="continueWithoutSelfie"
              >
                CONTINUAR SIN SELFIE
              </button>
            </div>
          </div>

          <canvas ref="canvasEl" class="hidden"></canvas>
        </div>
      </section>

      <!-- STEP 3 -->
      <section v-else-if="step === 'selfie_error'">
        <div class="relative min-h-[calc(100vh-96px)] overflow-hidden">
          <img
            :src="capturedDataUrl || heroSelfieBg"
            alt="Rejected selfie"
            class="w-full h-[calc(100vh-96px)] object-cover"
          />
          <div class="absolute inset-0 bg-black/35"></div>

          <div class="absolute inset-x-0 top-4 flex justify-center z-20">
            <img :src="logoSrcWhite" class="h-14 object-contain" alt="My Routine AI" />
          </div>

          <div class="absolute left-0 right-0 bottom-0 z-20 p-4">
            <div class="bg-white/80 backdrop-blur-md rounded-[26px] p-5">
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-red-600 mt-[2px]">cancel</span>
                <div>
                  <p class="text-[18px] text-slate-900">{{ validationMessage }}</p>
                  <p class="text-[13px] uppercase tracking-wide text-slate-500 mt-1">Intente de nuevo</p>
                </div>
              </div>

              <button
                class="mt-5 w-full h-[56px] bg-[#16A6E2] text-white text-[16px] tracking-wide"
                type="button"
                @click="retakeSelfie"
              >
                RETOME EL SELFIE
              </button>

              <div class="mt-4 text-center text-slate-600 text-[15px]">
                Análisis de su selfie
              </div>

              <button
                class="mt-2 w-full h-[56px] border border-slate-400 text-slate-800 text-[16px]"
                type="button"
                @click="triggerUpload"
              >
                CARGAR UNA FOTOGRAFÍA
              </button>

              <button
                class="mt-3 w-full h-[48px] text-slate-600 text-[14px] sm:text-[16px] underline underline-offset-4"
                type="button"
                @click="continueWithoutSelfie"
              >
                CONTINUAR SIN SELFIE
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- STEP 4 -->
      <section v-else-if="step === 'selfie_confirm'">
        <div class="relative min-h-[calc(100vh-96px)] overflow-hidden">
          <img
            :src="capturedDataUrl || heroSelfieBg"
            alt="Accepted selfie"
            class="w-full h-[calc(100vh-96px)] object-cover"
          />

          <div class="absolute left-0 right-0 bottom-0 p-4">
            <div class="bg-[#F7F7F4] rounded-[30px] p-5">
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-emerald-600 text-[34px]">check_circle</span>
                <div>
                  <p class="text-[20px] font-normal text-slate-900">HECHO</p>
                  <p class="text-[13px] uppercase tracking-wide text-slate-500 mt-1">OK PARA ANÁLISIS</p>
                </div>
              </div>

              <button
                class="mt-5 w-full h-[56px] bg-[#16A6E2] text-white text-[16px] tracking-wide"
                type="button"
                @click="goToAbout"
              >
                CONTINUE
              </button>

              <button
                class="mt-4 w-full h-[56px] border border-slate-500 text-slate-800 text-[16px]"
                type="button"
                @click="retakeSelfie"
              >
                RETOMAR SELFIE
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- STEP 5 -->
      <section v-else-if="step === 'about_you'" class="pt-6">
        <h2 class="text-center text-[32px] sm:text-[44px] font-light text-slate-900">
          Acerca de usted
        </h2>

        <div class="mt-8 space-y-4">
          <ChatBubble>
            ¡Hola! Soy el asistente del bot de análisis de la piel de La Roche-Posay.
          </ChatBubble>

          <ChatBubble>
            Analizaré su piel para ayudarle a comprender sus prioridades. Le haré algunas preguntas para completar el análisis.
          </ChatBubble>

          <ChatBubble>
            ¿Cuántos años tiene?
          </ChatBubble>

          <div class="pt-10 pb-4 flex items-center justify-center">
            <button class="age-line-btn" type="button" @click="openAgeModal">
              <span class="dash"></span>
              <span class="value">{{ answers.age ? answers.age : "— —" }}</span>
              <span class="suffix">años de edad</span>
            </button>
          </div>
        </div>
      </section>

      <!-- STEP 6 -->
      <section v-else-if="step === 'skin_type'" class="pt-6">
        <h2 class="text-center text-[32px] sm:text-[44px] font-light tracking-wide text-slate-900">
          PERFIL DE LA PIEL
        </h2>

        <div class="mt-8 space-y-4">
          <ChatBubble>
            Estamos comparando tu foto con otras 50,000 imágenes.
          </ChatBubble>

          <ChatBubble>
            Nuestro análisis sugiere que puede tener la piel <b>{{ suggestedSkinTypeText }}</b>.
          </ChatBubble>

          <ChatBubble>
            Puede confirmar o seleccionar otro tipo de piel.
          </ChatBubble>
        </div>

        <div class="mt-8 overflow-hidden">
          <div class="flex gap-6 overflow-x-auto no-scrollbar px-1 pb-3 snap-x snap-mandatory">
            <SkinTypeCard
              v-for="item in skinTypes"
              :key="item.key"
              :item="item"
              :selected="answers.skinType === item.key"
              @select="selectSkinType(item.key)"
            />
          </div>

          <div class="mt-3 flex justify-center gap-2">
            <span
              v-for="item in skinTypes"
              :key="item.key + '-dot'"
              class="carousel-dot"
              :class="{ active: answers.skinType === item.key }"
            ></span>
          </div>
        </div>

        <div v-if="answers.skinType" class="mt-8">
          <EditablePill
            :text="`Mi tipo de piel es ${skinTypeLabel(answers.skinType)}`"
            @edit="resetSkinType"
          />
        </div>

        <div class="mt-8 flex justify-center">
          <button
            class="w-full max-w-[420px] h-[56px] bg-[#16A6E2] text-white text-[16px]"
            type="button"
            @click="step = 'skin_sensitivity'"
          >
            CONFIRMAR
          </button>
        </div>
      </section>

      <!-- STEP 7 -->
      <section v-else-if="step === 'skin_sensitivity'" class="pt-6">
        <h2 class="text-center text-[32px] sm:text-[44px] font-light tracking-wide text-slate-900">
          PERFIL DE LA PIEL
        </h2>

        <div class="mt-8 space-y-4">
          <ChatBubble>
            ¿Tiene piel sensible?
          </ChatBubble>

          <ChatBubble>
            Seleccione su nivel de sensibilidad cutánea.
          </ChatBubble>
        </div>

        <div class="mt-12 flex flex-col items-center">
          <div class="w-24 h-24 rounded-full flex items-center justify-center">
            <span class="material-symbols-outlined text-[74px] text-slate-600">face</span>
          </div>

          <div class="mt-10 w-full max-w-[720px] px-2">
            <input
              v-model.number="answers.sensitivity"
              type="range"
              min="0"
              max="3"
              step="1"
              class="sensitivity-range w-full"
            />

            <div class="mt-4 grid grid-cols-4 text-center text-[#42BEEA] text-[14px] sm:text-[16px]">
              <span>Ninguno</span>
              <span>Bajo</span>
              <span>Medio</span>
              <span>Alto</span>
            </div>
          </div>
        </div>

        <div class="mt-8">
          <EditablePill
            :text="`Mi piel es ${sensitivityLabel}`"
            @edit="answers.sensitivity = 1"
          />
        </div>

        <div class="mt-10 flex justify-center">
          <button
            class="w-full max-w-[480px] h-[62px] bg-[#16A6E2] text-white text-[18px] tracking-wide shadow-[0_8px_24px_rgba(22,166,226,.25)]"
            type="button"
            @click="finishProfileStep"
          >
            SIGUIENTE
          </button>
        </div>
      </section>

      <!-- STEP 8 -->
      <section v-else-if="step === 'profile_complete'" class="pt-6">
        <h2 class="text-center text-[32px] sm:text-[44px] font-light tracking-wide text-slate-900">
          PERFIL DE LA PIEL
        </h2>

        <div class="mt-8 space-y-4">
          <ChatBubble>
            Estamos comparando tu foto con otras 50,000 imágenes.
          </ChatBubble>

          <ChatBubble>
            Nuestro análisis sugiere que puede tener la piel <b>{{ suggestedSkinTypeText }}</b>.
          </ChatBubble>

          <ChatBubble>
            Puede confirmar o seleccionar otro tipo de piel.
          </ChatBubble>
        </div>

        <div class="mt-8 space-y-5">
          <EditablePill
            :text="`Mi tipo de piel es ${skinTypeLabel(answers.skinType || suggestedSkinType)}`"
            @edit="step = 'skin_type'"
          />

          <ChatBubble>
            ¿Tiene piel sensible?
          </ChatBubble>

          <ChatBubble>
            Seleccione su nivel de sensibilidad cutánea.
          </ChatBubble>

          <EditablePill
            :text="`Mi piel es ${sensitivityLabel}`"
            @edit="step = 'skin_sensitivity'"
          />

          <ChatBubble>
            ¡Gracias por responder todas mis preguntas! Ahora puede acceder a su análisis de piel haciendo clic en "Siguiente" a continuación.
          </ChatBubble>
        </div>

        <div class="mt-10 flex justify-center">
          <button
            class="w-full max-w-[480px] h-[62px] bg-[#16A6E2] text-white text-[18px] tracking-wide shadow-[0_8px_24px_rgba(22,166,226,.25)]"
            type="button"
            @click="generateAnalysisAndGoResults"
          >
            SIGUIENTE
          </button>
        </div>
      </section>

      <!-- STEP 9 -->
      <section v-else-if="step === 'results_summary'" class="pt-4">
        <div class="flex justify-center">
          <img :src="logoSrc" class="h-12 object-contain" alt="My Routine AI" />
        </div>

        <div class="mt-6 promo-strip">
          <span class="material-symbols-outlined text-white">content_copy</span>
          <p>Consigue un 10 % de descuento en tu pedido al registrarte para recibir tus resultados.</p>
        </div>

        <p class="mt-6 text-[16px] sm:text-[20px] text-slate-800 leading-relaxed">
          Este perfil ha sido creado específicamente para usted en función de sus áreas de enfoque y sensibilidad cutánea.
        </p>

        <div class="mt-6 result-summary-card">
          <div class="photo-backdrop">
            <img :src="capturedDataUrl || selfiePlaceholder" alt="Selfie" class="summary-selfie" />
          </div>

          <div class="result-sheet">
            <span class="result-tag">Inquietud de prioridad</span>

            <MetricRow
              v-for="metric in summaryMetrics"
              :key="metric.key"
              :metric="metric"
            />

            <button
              class="mt-4 underline text-slate-700 text-[15px] sm:text-[18px]"
              type="button"
              @click="step = 'analysis_full'"
            >
              Ver análisis completo
            </button>
          </div>
        </div>

        <div class="mt-8 flex justify-center">
          <button
            class="w-full max-w-[480px] h-[58px] bg-[#16A6E2] text-white text-[17px]"
            type="button"
            @click="step = 'routine_intro'"
          >
            VER RUTINA
          </button>
        </div>
      </section>

      <!-- STEP 10 -->
      <section v-else-if="step === 'routine_intro'" class="pt-4">
        <div class="flex justify-center">
          <img :src="logoSrc" class="h-12 object-contain" alt="My Routine AI" />
        </div>

        <div class="mt-6 promo-strip">
          <span class="material-symbols-outlined text-white">content_copy</span>
          <p>Consigue un 10 % de descuento en tu pedido al registrarte para recibir tus resultados.</p>
        </div>

        <div class="mt-8">
          <h2 class="text-[30px] sm:text-[48px] font-light tracking-wide text-slate-900">
            SU RUTINA PERSONALIZADA
          </h2>
          <p class="mt-4 text-[17px] sm:text-[24px] text-slate-700 leading-relaxed">
            Sus elementos esenciales de rutina para el día y la noche para abordar su área de enfoque principal.
          </p>
        </div>

        <div class="mt-8 rounded-[8px] border border-slate-300 p-6 bg-[#F7F7F4]">
          <h3 class="text-[24px] sm:text-[34px] text-slate-900">{{ primaryConcernTitle }}</h3>
          <p class="mt-4 text-[16px] sm:text-[21px] text-slate-700 leading-relaxed">
            {{ primaryConcernDescription }}
          </p>

          <button
            class="mt-8 underline text-slate-700 text-[16px] sm:text-[22px]"
            type="button"
            @click="openInfoModal"
          >
            Inquietud de cambio
          </button>
        </div>

        <div class="mt-8">
          <ProductCard
            v-if="routine.morning.length"
            :product="routine.morning[0]"
            badge="SU n.o 1 OBLIGATORIO"
            @info="openProductInfo(routine.morning[0])"
            @buy="addProductAndGo(routine.morning[0])"
          />
        </div>

        <div class="mt-8 email-buy-bar">
          <button class="email-cta" type="button" @click="sendRoutineByEmail">
            <span class="material-symbols-outlined">mail</span>
            <span>ENVIAR MI RUTINA POR CORREO ELECTRÓNICO</span>
          </button>

          <button class="buy-lock-btn" type="button" @click="goToRoutine">
            <span class="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </section>

      <!-- STEP 11 -->
      <section v-else-if="step === 'routine'" class="pt-4">
        <div class="flex justify-center">
          <img :src="logoSrc" class="h-12 object-contain" alt="My Routine AI" />
        </div>

        <div class="mt-6 promo-strip">
          <span class="material-symbols-outlined text-white">content_copy</span>
          <p>Consigue un 10 % de descuento en tu pedido al registrarte para recibir tus resultados.</p>
        </div>

        <div class="mt-8 border-b border-slate-300 flex">
          <button
            class="routine-tab"
            :class="{ active: routineTab === 'morning' }"
            type="button"
            @click="routineTab = 'morning'"
          >
            MAÑANA
          </button>
          <button
            class="routine-tab"
            :class="{ active: routineTab === 'night' }"
            type="button"
            @click="routineTab = 'night'"
          >
            NOCHE
          </button>
        </div>

        <div class="mt-8 space-y-10">
          <div
            v-for="product in currentRoutineList"
            :key="product.step + '-' + product.slug"
          >
            <p class="text-[22px] sm:text-[30px] text-slate-900">Paso {{ product.step }}</p>
            <p class="mt-2 text-[18px] sm:text-[24px] tracking-wide text-slate-700 uppercase">
              {{ product.category }}
            </p>

            <div class="mt-5">
              <ProductCard
                :product="product"
                @info="openProductInfo(product)"
                @buy="addProductAndGo(product)"
              />
            </div>
          </div>
        </div>

        <div class="mt-10 email-buy-bar">
          <button class="email-cta" type="button" @click="sendRoutineByEmail">
            <span class="material-symbols-outlined">mail</span>
            <span>ENVIAR MI RUTINA POR CORREO ELECTRÓNICO</span>
          </button>

          <button class="buy-lock-btn" type="button" @click="goToCart">
            <span class="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </section>

      <!-- STEP 12 -->
      <section v-else-if="step === 'email_feedback'" class="pt-4">
        <div class="flex justify-center">
          <img :src="logoSrc" class="h-12 object-contain" alt="My Routine AI" />
        </div>

        <div class="mt-6 promo-strip">
          <span class="material-symbols-outlined text-white">content_copy</span>
          <p>Consigue un 10 % de descuento en tu pedido al registrarte para recibir tus resultados.</p>
        </div>

        <div class="mt-8 grid gap-6">
          <div class="white-card-lg">
            <h3 class="text-[28px] sm:text-[40px] font-semibold leading-tight text-slate-900">
              ENVIAR MI RUTINA POR CORREO ELECTRÓNICO
            </h3>

            <div class="mt-6 grid grid-cols-[80px_1fr] items-center gap-6">
              <span class="material-symbols-outlined text-[48px] text-slate-800">mail</span>
              <div>
                <p class="text-[16px] sm:text-[22px] text-slate-700 leading-relaxed">
                  Consigue un 10 % de descuento en tu pedido al registrarte para recibir tus recomendaciones de productos personalizadas directamente.
                </p>

                <button
                  class="mt-6 h-[54px] px-10 bg-[#16A6E2] text-white text-[18px]"
                  type="button"
                  @click="sendRoutineByEmail"
                >
                  INSCRÍBASE
                </button>
              </div>
            </div>
          </div>

          <div class="white-card-lg">
            <h3 class="text-[28px] sm:text-[40px] font-light leading-tight text-slate-900">
              SU OPINIÓN IMPORTA, COMPARTA SUS COMENTARIOS
            </h3>

            <p class="mt-4 text-[16px] sm:text-[22px] text-slate-700 leading-relaxed">
              Es muy útil para mejorar la experiencia de nuestra comunidad La Roche-Posay.
            </p>

            <button
              class="mt-8 h-[54px] px-10 bg-[#16A6E2] text-white text-[18px]"
              type="button"
              @click="openNpsModal"
            >
              ENVIAR
            </button>
          </div>
        </div>

        <div class="mt-10 email-buy-bar">
          <button class="email-cta" type="button" @click="sendRoutineByEmail">
            <span class="material-symbols-outlined">mail</span>
            <span>ENVIAR MI RUTINA POR CORREO ELECTRÓNICO</span>
          </button>

          <button class="buy-lock-btn" type="button" @click="goToCart">
            <span class="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </section>

      <!-- STEP 13 -->
      <section v-else-if="step === 'analysis_full'" class="pt-6">
        <button
          class="mb-6 w-10 h-10 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200/60"
          type="button"
          @click="step = 'results_summary'"
        >
          <span class="material-symbols-outlined">arrow_back</span>
        </button>

        <h2 class="text-[30px] sm:text-[44px] font-light text-slate-900">
          Mi análisis
        </h2>

        <p class="mt-4 text-[17px] sm:text-[24px] text-slate-700 leading-relaxed max-w-[860px]">
          Este análisis basado en datos revela las fortalezas y áreas de mejora de su piel, lo que le permite tomar decisiones informadas.
        </p>

        <div class="mt-8 space-y-6">
          <MetricRow
            v-for="metric in fullMetrics"
            :key="metric.key"
            :metric="metric"
            full
          />
        </div>
      </section>
    </main>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="hidden"
      @change="onFilePicked"
    />

    <div v-if="ageModal" class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div class="bg-white w-full max-w-[520px] p-6 sm:p-8 relative">
        <button
          class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-slate-700"
          type="button"
          @click="closeAgeModal"
        >
          <span class="material-symbols-outlined">close</span>
        </button>

        <h3 class="text-[28px] sm:text-[38px] tracking-wide font-light text-slate-900">
          SU EDAD
        </h3>

        <p class="mt-4 text-[15px] sm:text-[19px] text-slate-700 leading-relaxed">
          Su piel requiere atención diferente a medida que evoluciona con la edad. Conocer su edad nos ayudará a determinar las necesidades de su piel.
        </p>

        <div class="mt-8 flex items-center gap-5">
          <input
            v-model.number="ageDraft"
            type="number"
            min="10"
            max="99"
            class="age-modal-input"
          />
          <span class="text-[20px] sm:text-[30px] text-slate-800">años de edad</span>
        </div>

        <button
          class="mt-8 w-full h-[56px] bg-[#16A6E2] text-white text-[18px]"
          type="button"
          @click="saveAge"
        >
          ESTÁ BIEN
        </button>
      </div>
    </div>

    <div v-if="infoModal" class="fixed inset-0 z-50 bg-black/55 overflow-auto">
      <div class="min-h-full bg-[#12A7E2] px-4 py-10 relative">
        <button
          class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-white"
          type="button"
          @click="closeInfoModal"
        >
          <span class="material-symbols-outlined">close</span>
        </button>

        <div class="max-w-[920px] mx-auto">
          <h3 class="text-center text-white text-[30px] sm:text-[52px] font-light leading-tight tracking-wide">
            OBTENER MÁS INFORMACIÓN SOBRE LA PRIORIDAD DE SU PIEL
          </h3>

          <div class="mt-10 bg-white max-w-[700px] mx-auto p-6 sm:p-8">
            <h4 class="text-[28px] sm:text-[40px] font-light leading-tight text-slate-900">
              ¿CUÁLES SON LOS MOTIVOS DE LA FALTA DE LUMINOSIDAD?
            </h4>

            <p class="mt-6 text-[17px] sm:text-[24px] text-slate-700 leading-relaxed">
              La falta de luminosidad puede ser causada por la acumulación de célula muerta de la piel en la superficie de la piel, la mala circulación, la deshidratación, la genética y otros factores.
            </p>

            <button
              class="mt-8 w-full h-[56px] bg-[#16A6E2] text-white text-[18px]"
              type="button"
              @click="closeInfoModal"
            >
              LEER MÁS
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="productInfoModal && activeProduct" class="fixed inset-0 z-50 bg-black/55 flex items-center justify-center px-4">
      <div class="bg-white w-full max-w-[720px] p-6 sm:p-8 relative">
        <button
          class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-slate-700"
          type="button"
          @click="closeProductInfo"
        >
          <span class="material-symbols-outlined">close</span>
        </button>

        <div class="grid md:grid-cols-[1fr_220px] gap-8 items-start">
          <div>
            <p class="text-[15px] uppercase tracking-wide text-[#16A6E2]">
              {{ activeProduct.brand }}
            </p>
            <h3 class="mt-2 text-[28px] sm:text-[38px] font-light text-slate-900">
              {{ activeProduct.name }}
            </h3>
            <p class="mt-4 text-[16px] sm:text-[20px] text-slate-700 leading-relaxed">
              {{ activeProduct.longDescription }}
            </p>

            <div class="mt-5 text-slate-700 text-[15px] sm:text-[18px] space-y-1">
              <p><b>Tamaño:</b> {{ activeProduct.size }}</p>
              <p><b>Tipo:</b> {{ activeProduct.category }}</p>
              <p><b>Marca:</b> {{ activeProduct.brand }}</p>
            </div>

            <div class="mt-8 flex flex-wrap gap-3">
              <button
                class="h-[54px] px-8 bg-[#16A6E2] text-white text-[17px]"
                type="button"
                @click="addProductAndGo(activeProduct)"
              >
                AGREGAR AL CARRITO
              </button>

              <button
                class="h-[54px] px-8 border border-slate-400 text-slate-800 text-[17px]"
                type="button"
                @click="closeProductInfo"
              >
                CERRAR
              </button>
            </div>
          </div>

          <div class="flex items-center justify-center">
            <img
              :src="activeProduct.image"
              :alt="activeProduct.name"
              class="max-h-[260px] object-contain"
              @error="$event.target.src='https://placehold.co/300x400/e5e7eb/475569?text=PRODUCTO'"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="npsModal" class="fixed inset-0 z-50 bg-black/65 flex items-center justify-center px-4">
      <div class="bg-white w-full max-w-[560px] p-6 sm:p-8 relative">
        <button
          class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-slate-700"
          type="button"
          @click="closeNpsModal"
        >
          <span class="material-symbols-outlined">close</span>
        </button>

        <h3 class="text-[34px] sm:text-[48px] font-bold leading-none tracking-tight text-slate-900">
          ¡GRACIAS POR SUS COMENTARIOS!
        </h3>

        <p class="mt-8 text-center text-[18px] sm:text-[26px] text-slate-700 leading-relaxed">
          Según su experiencia, ¿qué tan probable es que recomiende MyRoutine AI a un amigo?
        </p>

        <div class="mt-8 grid grid-cols-5 sm:grid-cols-10 gap-2">
          <button
            v-for="n in 10"
            :key="n"
            class="h-[46px] border rounded-[8px] text-[18px]"
            :class="npsScore === n ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-400 text-slate-700'"
            type="button"
            @click="npsScore = n"
          >
            {{ n }}
          </button>
        </div>

        <div class="mt-6 flex justify-between text-[16px] sm:text-[22px] text-slate-700">
          <span>Para nada probable</span>
          <span>Extremadamente probable</span>
        </div>

        <button
          class="mt-8 w-full text-center text-[18px] sm:text-[26px] text-slate-700"
          type="button"
          @click="closeNpsModal"
        >
          CIERRE SIN CALIFICACIÓN
        </button>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="toastMessage"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-slate-900 text-white px-5 py-3 rounded-full shadow-lg text-sm"
      >
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, ref, reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

/* placeholders seguros */
const logoSrc = "https://placehold.co/300x80/ffffff/111827?text=My+Routine+AI";
const logoSrcWhite = "https://placehold.co/300x80/0f172a/ffffff?text=My+Routine+AI";
const heroSelfieBg = "https://placehold.co/900x1200/e5e7eb/475569?text=SELFIE+GUIDE";
const selfiePlaceholder = "https://placehold.co/800x1000/dbeafe/1e3a8a?text=SELFIE";

const step = ref("selfie_instructions");
const routineTab = ref("morning");

const ageModal = ref(false);
const infoModal = ref(false);
const npsModal = ref(false);
const productInfoModal = ref(false);

const ageDraft = ref(17);
const npsScore = ref(null);
const toastMessage = ref("");

const fileInput = ref(null);
const videoEl = ref(null);
const canvasEl = ref(null);
const capturedDataUrl = ref("");

const answers = reactive({
  age: null,
  skinType: "",
  sensitivity: 1,
});

const liveChecks = reactive({
  lighting: true,
  position: true,
  straight: true,
});

const countdown = ref(0);
const cameraReady = ref(false);
const detectorLoading = ref(false);

const statusText = ref("Modo prueba activo: puedes capturar");
const validationMessage = ref("Intente de nuevo.");

const activeProduct = ref(null);

const analysis = ref({
  primaryConcern: "luminosidad",
  summaryMetrics: [],
  fullMetrics: [],
  photoMeta: {
    brightness: 120,
    contrast: 40,
    faceDetected: false,
  },
});

let stream = null;
let countdownTimer = null;
let toastTimer = null;

const catalog = [
  {
    slug: "lrp-toleriane-purifying-foaming-cleanser",
    brand: "La Roche-Posay",
    name: "Limpiador facial Toleriane purificador en espuma",
    size: "400ML",
    category: "LIMPIEZA",
    concernTags: ["grasa", "mixta", "sensibilidad", "poros"],
    image: "https://placehold.co/300x400/dbeafe/1d4ed8?text=LIMPIADOR",
    rating: 4.0,
    reviews: 3141,
    longDescription:
      "Limpiador facial en espuma formulado para limpiar sin resecar excesivamente la piel. Suele adaptarse bien a piel normal, mixta y grasa con tendencia sensible.",
  },
  {
    slug: "lrp-toleriane-dermo-cleanser",
    brand: "La Roche-Posay",
    name: "Toleriane Dermo-Cleanser",
    size: "200ML",
    category: "LIMPIEZA",
    concernTags: ["seca", "sensibilidad", "barrera"],
    image: "https://placehold.co/300x400/f3f4f6/475569?text=DERMO+CLEANSER",
    rating: 4.4,
    reviews: 1854,
    longDescription:
      "Limpiador de textura suave pensado para piel sensible o seca. Ayuda a limpiar con una sensación menos agresiva.",
  },
  {
    slug: "cerave-hydrating-cleanser",
    brand: "CeraVe",
    name: "Hydrating Facial Cleanser",
    size: "236ML",
    category: "LIMPIEZA",
    concernTags: ["seca", "normal", "barrera", "sensibilidad"],
    image: "https://placehold.co/300x400/e0f2fe/0369a1?text=HYDRATING+CLEANSER",
    rating: 4.5,
    reviews: 4201,
    longDescription:
      "Limpiador hidratante con ceramidas y ácido hialurónico, conocido por apoyar la barrera de la piel mientras limpia.",
  },
  {
    slug: "cerave-foaming-facial-cleanser",
    brand: "CeraVe",
    name: "Foaming Facial Cleanser",
    size: "236ML",
    category: "LIMPIEZA",
    concernTags: ["grasa", "mixta", "poros"],
    image: "https://placehold.co/300x400/dbeafe/1e40af?text=FOAMING+CLEANSER",
    rating: 4.6,
    reviews: 5182,
    longDescription:
      "Limpiador en espuma con ceramidas y niacinamida, orientado a piel normal a grasa con exceso de brillo.",
  },
  {
    slug: "lrp-pure-vitamin-c10-serum",
    brand: "La Roche-Posay",
    name: "Pure Vitamin C10 Serum",
    size: "30ML",
    category: "TRATAMIENTO",
    concernTags: ["luminosidad", "manchas", "tono"],
    image: "https://placehold.co/300x400/fef3c7/92400e?text=VITAMIN+C10",
    rating: 4.0,
    reviews: 1872,
    longDescription:
      "Suero enfocado en apoyar la luminosidad y apariencia del tono de la piel.",
  },
  {
    slug: "lrp-hyalu-b5-serum",
    brand: "La Roche-Posay",
    name: "Hyalu B5 Serum",
    size: "30ML",
    category: "TRATAMIENTO",
    concernTags: ["deshidratacion", "barrera", "arrugas", "seca"],
    image: "https://placehold.co/300x400/e0f2fe/075985?text=HYALU+B5",
    rating: 4.4,
    reviews: 2211,
    longDescription:
      "Suero conocido por enfocarse en hidratación y apoyo a la piel con sensación de relleno.",
  },
  {
    slug: "cerave-skin-renewing-retinol-serum",
    brand: "CeraVe",
    name: "Skin Renewing Retinol Serum",
    size: "30ML",
    category: "TRATAMIENTO",
    concernTags: ["arrugas", "textura", "manchas"],
    image: "https://placehold.co/300x400/fce7f3/9d174d?text=RETINOL+SERUM",
    rating: 4.3,
    reviews: 1980,
    longDescription:
      "Tratamiento con retinol pensado para mejorar textura y líneas finas de forma progresiva.",
  },
  {
    slug: "cerave-hydrating-hyaluronic-acid-serum",
    brand: "CeraVe",
    name: "Hydrating Hyaluronic Acid Serum",
    size: "30ML",
    category: "TRATAMIENTO",
    concernTags: ["deshidratacion", "barrera", "seca", "sensibilidad"],
    image: "https://placehold.co/300x400/dbeafe/1e3a8a?text=HA+SERUM",
    rating: 4.5,
    reviews: 1740,
    longDescription:
      "Suero orientado a la hidratación y apoyo de la barrera cutánea.",
  },
  {
    slug: "lrp-toleriane-double-repair-moisturizer",
    brand: "La Roche-Posay",
    name: "Hidratante facial Toleriane Double Repair",
    size: "100ML",
    category: "HUMECTAR",
    concernTags: ["barrera", "sensibilidad", "mixta", "normal"],
    image: "https://placehold.co/300x400/e5e7eb/334155?text=DOUBLE+REPAIR",
    rating: 4.4,
    reviews: 2491,
    longDescription:
      "Hidratante facial enfocada en ayudar a restaurar la barrera y aportar hidratación diaria.",
  },
  {
    slug: "lrp-toleriane-sensitive-fluide",
    brand: "La Roche-Posay",
    name: "Toleriane Sensitive Fluide",
    size: "40ML",
    category: "HUMECTAR",
    concernTags: ["sensibilidad", "ligero", "mixta"],
    image: "https://placehold.co/300x400/f1f5f9/0f172a?text=SENSITIVE+FLUIDE",
    rating: 4.2,
    reviews: 991,
    longDescription:
      "Hidratante ligera orientada a piel sensible con preferencia por texturas fluidas.",
  },
  {
    slug: "cerave-moisturizing-cream",
    brand: "CeraVe",
    name: "Moisturizing Cream",
    size: "340G",
    category: "HUMECTAR",
    concernTags: ["seca", "barrera", "deshidratacion"],
    image: "https://placehold.co/300x400/e0f2fe/0f766e?text=MOISTURIZING+CREAM",
    rating: 4.8,
    reviews: 6321,
    longDescription:
      "Crema hidratante clásica con ceramidas, comúnmente usada para piel seca o con barrera debilitada.",
  },
  {
    slug: "cerave-pm-facial-moisturizing-lotion",
    brand: "CeraVe",
    name: "PM Facial Moisturizing Lotion",
    size: "89ML",
    category: "HUMECTAR",
    concernTags: ["night", "mixta", "normal", "sensibilidad"],
    image: "https://placehold.co/300x400/ede9fe/5b21b6?text=PM+LOTION",
    rating: 4.6,
    reviews: 4108,
    longDescription:
      "Loción nocturna ligera con niacinamida, ceramidas y ácido hialurónico.",
  },
  {
    slug: "lrp-anthelios-uvmune-fluid-spf50",
    brand: "La Roche-Posay",
    name: "Anthelios UVMune 400 Invisible Fluid SPF 50+",
    size: "50ML",
    category: "PROTEGER",
    concernTags: ["proteccion", "sensibilidad", "manchas", "luminosidad"],
    image: "https://placehold.co/300x400/fef9c3/a16207?text=SPF+50",
    rating: 4.5,
    reviews: 554,
    longDescription:
      "Protector solar fluido de alta protección para uso diario.",
  },
  {
    slug: "cerave-hydrating-mineral-sunscreen-spf50",
    brand: "CeraVe",
    name: "Hydrating Mineral Sunscreen SPF 50",
    size: "75ML",
    category: "PROTEGER",
    concernTags: ["proteccion", "seca", "sensibilidad"],
    image: "https://placehold.co/300x400/fef3c7/b45309?text=MINERAL+SPF",
    rating: 4.1,
    reviews: 1304,
    longDescription:
      "Protector solar mineral con enfoque hidratante.",
  },
];

const skinTypes = [
  {
    key: "seca",
    title: "PIEL SECA",
    description:
      "Seleccione este tipo de piel si la piel tiende a sentirse incómoda debido a la descamación, el estiramiento o la falta de humedad de la piel.",
    image: "https://placehold.co/600x400/f5e6dc/7c5a43?text=PIEL+SECA",
    actionLabel: "Confirmar",
  },
  {
    key: "normal",
    title: "PIEL NORMAL",
    description:
      "Seleccione este tipo de piel si su piel se siente equilibrada, cómoda y sin exceso de grasa o resequedad marcada.",
    image: "https://placehold.co/600x400/e8eef3/4b5563?text=PIEL+NORMAL",
    actionLabel: "Seleccionar",
  },
  {
    key: "mixta",
    title: "PIEL MIXTA",
    description:
      "Seleccione este tipo de piel si nota una zona T más grasa y otras áreas con sensación más equilibrada.",
    image: "https://placehold.co/600x400/f3eadb/6b7280?text=PIEL+MIXTA",
    actionLabel: "Seleccionar",
  },
  {
    key: "grasa",
    title: "PIEL GRASA",
    description:
      "Seleccione este tipo de piel si percibe brillo, poros notorios o tendencia a exceso de sebo con frecuencia.",
    image: "https://placehold.co/600x400/d9eaf7/2563eb?text=PIEL+GRASA",
    actionLabel: "Seleccionar",
  },
];

const showProgress = computed(() =>
  ["about_you", "skin_type", "skin_sensitivity", "profile_complete"].includes(step.value)
);

const progressStep = computed(() => {
  if (step.value === "about_you") return 1;
  if (["skin_type", "skin_sensitivity", "profile_complete"].includes(step.value)) return 2;
  return 0;
});

const progressBarWidth = computed(() => {
  if (step.value === "about_you") return 0;
  if (["skin_type", "skin_sensitivity", "profile_complete"].includes(step.value)) return 100;
  return 0;
});

const suggestedSkinType = computed(() => {
  const meta = analysis.value.photoMeta;
  if (meta.brightness && meta.brightness < 95) return "seca";
  if (meta.brightness > 165 && meta.contrast < 35) return "grasa";
  if (meta.contrast > 55) return "mixta";
  return "normal";
});

const suggestedSkinTypeText = computed(() => skinTypeLabel(suggestedSkinType.value));

const sensitivityLabel = computed(() => {
  return ["ninguna sensibilidad", "baja sensibilidad", "sensibilidad media", "sensibilidad alta"][answers.sensitivity] || "baja sensibilidad";
});

const primaryConcernTitle = computed(() => concernTitle(analysis.value.primaryConcern));

const primaryConcernDescription = computed(() => {
  const map = {
    luminosidad:
      "Los dermatólogos generalmente caracterizan la piel de aspecto radiante por su luminosidad e incluso la tono de piel y textura, también conocida como “piel de aspecto saludable”.",
    deshidratacion:
      "Cuando la piel pierde agua con facilidad puede sentirse opaca, tirante o con textura irregular, por lo que la hidratación y la barrera se vuelven una prioridad.",
    manchas:
      "La apariencia desigual del tono y ciertas marcas visibles pueden hacer que la piel se vea menos uniforme, por lo que se priorizan activos orientados al tono.",
    sensibilidad:
      "Cuando la piel reacciona fácilmente, la rutina debe enfocarse en apoyar la barrera, disminuir la irritación potencial y mantener fórmulas más suaves.",
    arrugas:
      "Con el tiempo pueden verse líneas más notorias y cambios en textura, por lo que conviene una rutina con hidratación, protección solar y apoyo anti-edad.",
    poros:
      "Cuando hay brillo y poros más visibles, suele convenir una rutina balanceada que limpie sin barrer la piel y ayude a controlar el exceso de grasa.",
  };
  return map[analysis.value.primaryConcern] || map.luminosidad;
});

const summaryMetrics = computed(() => analysis.value.summaryMetrics);
const fullMetrics = computed(() => analysis.value.fullMetrics);
const routine = computed(() => buildRoutine());
const currentRoutineList = computed(() => routine.value[routineTab.value]);

function skinTypeLabel(key) {
  const labels = {
    seca: "seca",
    normal: "normal",
    mixta: "mixta",
    grasa: "grasa",
  };
  return labels[key] || "normal";
}

function concernTitle(key) {
  const titles = {
    luminosidad: "Luminosidad",
    deshidratacion: "Deshidratación",
    manchas: "Manchas oscuras",
    sensibilidad: "Sensibilidad",
    arrugas: "Arrugas",
    poros: "Poros visibles",
  };
  return titles[key] || "Luminosidad";
}

function metricNote(score) {
  if (score >= 9) return "Excelente";
  if (score >= 7) return "Bueno";
  return "Regular";
}

function clamp(value) {
  return Math.max(6.2, Math.min(9.5, Number(value.toFixed(1))));
}

function showToast(message) {
  toastMessage.value = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    if (toastMessage.value === message) toastMessage.value = "";
  }, 2500);
}

function handleBack() {
  const order = [
    "selfie_instructions",
    "camera",
    "selfie_error",
    "selfie_confirm",
    "about_you",
    "skin_type",
    "skin_sensitivity",
    "profile_complete",
    "results_summary",
    "routine_intro",
    "routine",
    "email_feedback",
    "analysis_full",
  ];

  const currentIndex = order.indexOf(step.value);

  if (currentIndex <= 0) {
    closeQuiz();
    return;
  }

  const backMap = {
    selfie_error: "camera",
    selfie_confirm: "camera",
    skin_sensitivity: "skin_type",
    profile_complete: "skin_sensitivity",
    routine_intro: "results_summary",
    routine: "routine_intro",
    email_feedback: "routine",
    analysis_full: "results_summary",
  };

  step.value = backMap[step.value] || order[currentIndex - 1];
}

function closeQuiz() {
  stopCamera();
  router.push("/inicio");
}

function goToAbout() {
  stopCamera();
  step.value = "about_you";
}

function continueWithoutSelfie() {
  stopCamera();
  capturedDataUrl.value = "";
  analysis.value.photoMeta = {
    brightness: 125,
    contrast: 42,
    faceDetected: false,
  };
  step.value = "about_you";
}

function goToRoutine() {
  step.value = "routine";
}

function openAgeModal() {
  ageDraft.value = answers.age ?? 17;
  ageModal.value = true;
}

function closeAgeModal() {
  ageModal.value = false;
}

function saveAge() {
  const value = Number(ageDraft.value);
  if (!Number.isFinite(value) || value < 10 || value > 99) {
    showToast("Ingrese una edad válida.");
    return;
  }
  answers.age = value;
  ageModal.value = false;
  step.value = "skin_type";
}

function triggerUpload() {
  if (fileInput.value) {
    fileInput.value.value = "";
    fileInput.value.click();
  }
}

async function openCamera() {
  step.value = "camera";
  capturedDataUrl.value = "";
  countdown.value = 0;
  statusText.value = "Modo prueba activo: puedes capturar";
  await nextTick();
  await startCamera();
}

async function startCamera() {
  cameraReady.value = false;
  stopCamera();

  try {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("CAMERA_UNSUPPORTED");
    }

    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1080 },
        height: { ideal: 1440 },
      },
      audio: false,
    });

    await nextTick();

    if (videoEl.value) {
      videoEl.value.srcObject = stream;
      await videoEl.value.play();
      cameraReady.value = true;
      statusText.value = "Modo prueba activo: puedes capturar";
      liveChecks.lighting = true;
      liveChecks.position = true;
      liveChecks.straight = true;
    }
  } catch (error) {
    console.error("Camera error:", error);
    cameraReady.value = false;
    statusText.value = "No se pudo acceder a la cámara. Use CARGAR UNA FOTOGRAFÍA.";
    showToast("No se pudo abrir la cámara. Prueba subiendo una foto.");
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }

  if (videoEl.value) {
    videoEl.value.srcObject = null;
  }

  cameraReady.value = false;
  clearInterval(countdownTimer);
  countdown.value = 0;
}

function analyzeImageMeta(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxW = 220;
      const ratio = img.height / img.width;
      canvas.width = maxW;
      canvas.height = Math.max(1, Math.round(maxW * ratio));

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve({ brightness: 120, contrast: 40, faceDetected: false });
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

      let total = 0;
      const lumValues = [];

      for (let i = 0; i < data.length; i += 4) {
        const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        total += lum;
        lumValues.push(lum);
      }

      const avg = total / lumValues.length;
      let varianceSum = 0;

      for (const lum of lumValues) {
        varianceSum += (lum - avg) ** 2;
      }

      const variance = varianceSum / lumValues.length;
      const contrast = Math.sqrt(variance);

      resolve({
        brightness: Math.round(avg),
        contrast: Math.round(contrast),
        faceDetected: false,
      });
    };

    img.onerror = () => {
      resolve({ brightness: 120, contrast: 40, faceDetected: false });
    };

    img.src = dataUrl;
  });
}

async function onFilePicked(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showToast("El archivo seleccionado no es una imagen.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    capturedDataUrl.value = String(reader.result || "");
    stopCamera();
    analysis.value.photoMeta = await analyzeImageMeta(capturedDataUrl.value);
    step.value = "selfie_confirm";
  };
  reader.readAsDataURL(file);
}

async function captureWithValidation() {
  if (!cameraReady.value || !videoEl.value || !canvasEl.value) return;

  countdown.value = 3;
  clearInterval(countdownTimer);

  countdownTimer = setInterval(async () => {
    countdown.value -= 1;

    if (countdown.value <= 0) {
      clearInterval(countdownTimer);
      await captureFrameAndContinue();
    }
  }, 800);
}

async function captureFrameAndContinue() {
  if (!videoEl.value || !canvasEl.value) return;

  const video = videoEl.value;
  const canvas = canvasEl.value;
  const width = video.videoWidth || 720;
  const height = video.videoHeight || 1280;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(video, 0, 0, width, height);
  capturedDataUrl.value = canvas.toDataURL("image/jpeg", 0.92);

  analysis.value.photoMeta = await analyzeImageMeta(capturedDataUrl.value);

  stopCamera();

  if (analysis.value.photoMeta.brightness < 45) {
    validationMessage.value = "La foto está demasiado oscura para el análisis.";
    step.value = "selfie_error";
    return;
  }

  step.value = "selfie_confirm";
}

async function retakeSelfie() {
  await openCamera();
}

function selectSkinType(key) {
  answers.skinType = key;
}

function resetSkinType() {
  answers.skinType = "";
}

function finishProfileStep() {
  step.value = "profile_complete";
}

function generateAnalysisAndGoResults() {
  analysis.value = generateAnalysis();
  step.value = "results_summary";
}

function generateAnalysis() {
  const age = answers.age || 17;
  const skinType = answers.skinType || suggestedSkinType.value;
  const sensitivity = answers.sensitivity;
  const photo = analysis.value.photoMeta;

  let luminosidad = 7.1;
  let bolsas = 8.5;
  let firmness = age >= 26 ? 7.8 : 8.6;
  let manchas = age >= 24 ? 8.2 : 8.7;
  let arrugasOjos = age >= 28 ? 7.9 : 9.3;
  let arrugas = age >= 28 ? 7.8 : 9.3;

  if (photo.brightness < 95) luminosidad -= 0.8;
  if (photo.contrast < 28) luminosidad -= 0.4;
  if (photo.brightness > 155) manchas -= 0.3;

  if (skinType === "seca") {
    luminosidad -= 0.4;
    firmness -= 0.3;
  }

  if (skinType === "grasa") {
    manchas -= 0.2;
    bolsas -= 0.2;
  }

  if (sensitivity >= 2) {
    luminosidad -= 0.2;
  }

  const metrics = [
    { key: "luminosidad", label: "Luminosidad", score: clamp(luminosidad) },
    { key: "ojeras", label: "Bolsas para ojos", score: clamp(bolsas) },
    { key: "firmness", label: "Firmness", score: clamp(firmness) },
    { key: "manchas", label: "Manchas oscuras", score: clamp(manchas) },
    { key: "arrugas_ojos", label: "Arrugas en los ojos", score: clamp(arrugasOjos) },
    { key: "arrugas", label: "Arrugas", score: clamp(arrugas) },
  ];

  let primaryConcern = "luminosidad";

  if (skinType === "seca" && sensitivity >= 2) {
    primaryConcern = "sensibilidad";
  } else if (skinType === "seca" && photo.brightness < 110) {
    primaryConcern = "deshidratacion";
  } else if (skinType === "grasa") {
    primaryConcern = "poros";
  } else if (age >= 28) {
    primaryConcern = "arrugas";
  } else if (metrics.find((m) => m.key === "manchas")?.score < 8.5) {
    primaryConcern = "manchas";
  } else {
    primaryConcern = "luminosidad";
  }

  return {
    primaryConcern,
    summaryMetrics: metrics.slice(0, 3),
    fullMetrics: metrics.map((m) => ({
      ...m,
      note: metricNote(m.score),
    })),
    photoMeta: { ...photo },
  };
}

function buildRoutine() {
  const skinType = answers.skinType || suggestedSkinType.value;
  const sensitivity = answers.sensitivity;
  const concern = analysis.value.primaryConcern || "luminosidad";

  const morning = [];
  const night = [];

  const morningCleanser =
    skinType === "seca"
      ? pickProduct(["LIMPIEZA"], ["seca", sensitivity >= 2 ? "sensibilidad" : "barrera"])
      : skinType === "grasa"
      ? pickProduct(["LIMPIEZA"], ["grasa", "poros"])
      : skinType === "mixta"
      ? pickProduct(["LIMPIEZA"], ["mixta", sensitivity >= 2 ? "sensibilidad" : "poros"])
      : pickProduct(["LIMPIEZA"], ["normal", sensitivity >= 2 ? "sensibilidad" : "barrera"]);

  if (morningCleanser) {
    morning.push(withStep(morningCleanser, 1));
    night.push(withStep(morningCleanser, 1));
  }

  let treatmentMorning = null;
  let treatmentNight = null;

  if (concern === "luminosidad" || concern === "manchas") {
    treatmentMorning = pickProduct(["TRATAMIENTO"], ["luminosidad", "manchas", "tono"]);
  } else if (concern === "arrugas") {
    treatmentNight = pickProduct(["TRATAMIENTO"], ["arrugas", "textura"]);
  } else if (concern === "deshidratacion" || concern === "sensibilidad") {
    treatmentMorning = pickProduct(["TRATAMIENTO"], ["deshidratacion", "barrera"]);
    treatmentNight = pickProduct(["TRATAMIENTO"], ["deshidratacion", "barrera"]);
  } else if (concern === "poros") {
    treatmentNight =
      pickProduct(["TRATAMIENTO"], ["luminosidad", "tono"]) ||
      pickProduct(["TRATAMIENTO"], ["deshidratacion"]);
  }

  if (treatmentMorning) morning.push(withStep(treatmentMorning, 2));
  if (treatmentNight) night.push(withStep(treatmentNight, 2));

  const moisturizer =
    skinType === "seca"
      ? pickProduct(["HUMECTAR"], ["seca", "deshidratacion", "barrera"])
      : skinType === "grasa"
      ? pickProduct(["HUMECTAR"], ["ligero", "mixta", "sensibilidad"]) || pickProduct(["HUMECTAR"], ["mixta"])
      : skinType === "mixta"
      ? pickProduct(["HUMECTAR"], ["mixta", "normal"])
      : pickProduct(["HUMECTAR"], ["normal", "barrera"]);

  if (moisturizer) {
    morning.push(withStep(moisturizer, 3));
    night.push(
      withStep(
        pickProduct(["HUMECTAR"], ["night", "mixta", "normal"]) || moisturizer,
        3
      )
    );
  }

  const sunscreen =
    skinType === "seca"
      ? pickProduct(["PROTEGER"], ["seca", "sensibilidad"])
      : pickProduct(["PROTEGER"], ["proteccion", "manchas", "luminosidad"]);

  if (sunscreen) {
    morning.push(withStep(sunscreen, 4));
  }

  return {
    morning: morning.filter(Boolean),
    night: night.filter(Boolean),
  };
}

function withStep(product, stepNumber) {
  if (!product) return null;
  return { ...product, step: stepNumber };
}

function pickProduct(categories, tags) {
  const candidates = catalog.filter((item) => categories.includes(item.category));

  let best = null;
  let bestScore = -1;

  for (const item of candidates) {
    let score = 0;
    for (const tag of tags) {
      if (item.concernTags.includes(tag)) score += 2;
    }
    if (item.rating) score += item.rating / 2;

    if (score > bestScore) {
      best = item;
      bestScore = score;
    }
  }

  return best || candidates[0] || null;
}

function addProductAndGo(product) {
  if (!product) return;

  const cart = JSON.parse(localStorage.getItem("pharmaderm_cart") || "[]");
  const existing = cart.find((item) => item.slug === product.slug);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      image: product.image,
      qty: 1,
      size: product.size,
    });
  }

  localStorage.setItem("pharmaderm_cart", JSON.stringify(cart));
  showToast(`${product.name} agregado al carrito`);
  router.push("/carrito");
}

function goToCart() {
  router.push("/carrito");
}

function openProductInfo(product) {
  activeProduct.value = product;
  productInfoModal.value = true;
}

function closeProductInfo() {
  productInfoModal.value = false;
  activeProduct.value = null;
}

function openInfoModal() {
  infoModal.value = true;
}

function closeInfoModal() {
  infoModal.value = false;
}

function openNpsModal() {
  npsModal.value = true;
}

function closeNpsModal() {
  npsModal.value = false;
}

async function sendRoutineByEmail() {
  const email = getLoggedUserEmail();

  if (!email) {
    showToast("No se encontró el correo del usuario logueado.");
    return;
  }

  const payload = buildEmailPayload(email);

  try {
    const response = await fetch("/api/send-routine-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      showToast(`Rutina enviada a ${email}`);
      step.value = "email_feedback";
      return;
    }
  } catch (error) {
    console.error(error);
  }

  const subject = encodeURIComponent("Tu rutina personalizada de PharmaDerm");
  const body = encodeURIComponent(buildEmailText(payload));
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  showToast(`Abriendo envío al correo ${email}`);
  step.value = "email_feedback";
}

function getLoggedUserEmail() {
  const direct = localStorage.getItem("user_email");
  if (direct) return direct;

  try {
    const authUser = JSON.parse(localStorage.getItem("auth_user") || "{}");
    return authUser.email || authUser.correo || "";
  } catch {
    return "";
  }
}

function buildEmailPayload(email) {
  return {
    email,
    age: answers.age,
    skinType: skinTypeLabel(answers.skinType || suggestedSkinType.value),
    sensitivity: sensitivityLabel.value,
    primaryConcern: primaryConcernTitle.value,
    summaryMetrics: summaryMetrics.value,
    morningRoutine: routine.value.morning,
    nightRoutine: routine.value.night,
  };
}

function buildEmailText(payload) {
  const morningLines = payload.morningRoutine
    .filter(Boolean)
    .map((p) => `Paso ${p.step} - ${p.category}: ${p.name} (${p.brand})`)
    .join("\n");

  const nightLines = payload.nightRoutine
    .filter(Boolean)
    .map((p) => `Paso ${p.step} - ${p.category}: ${p.name} (${p.brand})`)
    .join("\n");

  return `Hola,

Aquí está tu rutina personalizada de PharmaDerm.

Edad: ${payload.age ?? "No indicada"}
Tipo de piel: ${payload.skinType}
Sensibilidad: ${payload.sensitivity}
Prioridad principal: ${payload.primaryConcern}

Rutina de mañana:
${morningLines}

Rutina de noche:
${nightLines}

Gracias por usar PharmaDerm.`;
}

onBeforeUnmount(() => {
  stopCamera();
  clearInterval(countdownTimer);
  clearTimeout(toastTimer);
});

const ChatBubble = {
  template: `
    <div class="grid grid-cols-[36px_1fr] gap-4 items-start">
      <div class="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400">
        <span class="material-symbols-outlined text-[24px]">person</span>
      </div>
      <div class="bg-white rounded-[24px] px-5 py-4 text-[16px] sm:text-[24px] text-slate-800 leading-relaxed shadow-[0_1px_0_rgba(0,0,0,.04)]">
        <slot />
      </div>
    </div>
  `,
};

const EditablePill = {
  props: {
    text: String,
  },
  emits: ["edit"],
  template: `
    <div class="w-full bg-[#16A6E2] text-white rounded-full px-6 py-4 flex items-center justify-between gap-4 text-[16px] sm:text-[26px]">
      <span class="truncate">{{ text }}</span>
      <button
        type="button"
        class="shrink-0 border border-white/70 px-4 py-2 text-[14px] sm:text-[20px] flex items-center gap-2"
        @click="$emit('edit')"
      >
        <span class="material-symbols-outlined text-[18px] sm:text-[22px]">edit</span>
        EDITAR
      </button>
    </div>
  `,
};

const SkinTypeCard = {
  props: {
    item: Object,
    selected: Boolean,
  },
  emits: ["select"],
  template: `
    <button
      type="button"
      class="snap-center shrink-0 w-[310px] sm:w-[420px] rounded-[22px] overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)] border transition"
      :class="selected ? 'border-[#16A6E2] ring-2 ring-[#16A6E2]/20' : 'border-slate-200'"
      @click="$emit('select')"
    >
      <img
        :src="item.image"
        :alt="item.title"
        class="w-full h-[170px] object-cover"
        @error="$event.target.src='https://placehold.co/600x400/e5e7eb/475569?text=TIPO+DE+PIEL'"
      />
      <div class="px-6 py-5">
        <p class="text-[#16A6E2] text-[22px] sm:text-[30px] font-light tracking-wide">{{ item.title }}</p>
        <p class="mt-4 text-[#42BEEA] text-[16px] sm:text-[22px] leading-relaxed min-h-[160px]">
          {{ item.description }}
        </p>

        <button
          class="mt-6 w-full h-[54px] rounded-[16px] text-[18px] sm:text-[24px]"
          :class="selected ? 'bg-[#16A6E2] text-white' : 'border border-[#16A6E2] text-[#16A6E2]'"
          type="button"
        >
          {{ item.actionLabel }}
        </button>
      </div>
    </button>
  `,
};

const MetricRow = {
  props: {
    metric: Object,
    full: Boolean,
  },
  computed: {
    pct() {
      return Math.max(0, Math.min(100, (this.metric.score / 10) * 100));
    },
    note() {
      return this.metric.note || (this.metric.score >= 9 ? "Excelente" : this.metric.score >= 7 ? "Bueno" : "Regular");
    },
  },
  template: `
    <div class="py-4 border-t border-slate-200 first:border-t-0">
      <div v-if="metric.key === 'luminosidad'" class="mb-3">
        <span class="inline-block bg-[#16A6E2] text-white text-[11px] sm:text-[16px] px-2 py-1 rounded">
          Inquietud de prioridad
        </span>
      </div>

      <div class="flex items-start justify-between gap-4">
        <div class="flex-1">
          <p class="text-[18px] sm:text-[28px] text-slate-900">{{ metric.label }}</p>
          <p class="mt-2 text-[15px] sm:text-[22px] text-slate-700">{{ note }}</p>

          <div class="mt-3 h-[4px] bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full bg-[#16A6E2]" :style="{ width: pct + '%' }"></div>
          </div>
        </div>

        <div class="text-[18px] sm:text-[30px] text-slate-800 whitespace-nowrap mt-[2px]">
          {{ metric.score.toFixed(1) }}/10
        </div>
      </div>
    </div>
  `,
};

const ProductCard = {
  props: {
    product: Object,
    badge: String,
  },
  emits: ["info", "buy"],
  methods: {
    starText(value) {
      const rounded = Math.round(value || 0);
      return "★".repeat(Math.max(0, Math.min(5, rounded))) + "☆".repeat(Math.max(0, 5 - rounded));
    },
  },
  template: `
    <div v-if="product" class="border border-[#16A6E2] bg-white shadow-[0_6px_24px_rgba(0,0,0,.06)]">
      <div class="flex items-center justify-between">
        <div v-if="badge" class="bg-[#16A6E2] text-white px-6 py-3 text-[14px] sm:text-[18px]">
          {{ badge }}
        </div>
        <div v-else class="px-6 py-3"></div>

        <div class="px-5 text-[15px] sm:text-[20px] text-slate-800">
          {{ starText(product.rating) }} <span class="text-slate-500">({{ product.reviews }})</span>
        </div>
      </div>

      <div class="p-6 grid grid-cols-[1fr_140px] sm:grid-cols-[1fr_220px] gap-6 items-center">
        <div>
          <p class="text-[22px] sm:text-[32px] text-slate-900 leading-tight">
            {{ product.name }}
          </p>
          <p class="mt-4 text-[16px] sm:text-[22px] text-slate-700 leading-relaxed">
            {{ product.longDescription }}
          </p>

          <div class="mt-4 text-[18px] sm:text-[24px] text-slate-700">
            {{ product.size }}
          </div>

          <div class="mt-2 text-[22px] sm:text-[30px] text-slate-900">
            Ver en tienda
          </div>
        </div>

        <div class="flex items-center justify-center">
          <img
            :src="product.image"
            :alt="product.name"
            class="max-h-[200px] sm:max-h-[260px] object-contain"
            @error="$event.target.src='https://placehold.co/300x400/e5e7eb/475569?text=PRODUCTO'"
          />
        </div>
      </div>

      <div class="grid grid-cols-2">
        <button
          type="button"
          class="h-[66px] border-t border-r border-slate-300 text-[16px] sm:text-[24px] text-slate-900"
          @click="$emit('info')"
        >
          OBTENER MÁS INFORMACIÓN
        </button>

        <button
          type="button"
          class="h-[66px] border-t border-slate-300 bg-[#16A6E2] text-white text-[16px] sm:text-[24px] flex items-center justify-center gap-2"
          @click="$emit('buy')"
        >
          <span class="material-symbols-outlined text-[20px] sm:text-[24px]">shopping_bag</span>
          AGREGAR AL CARRITO
        </button>
      </div>
    </div>
  `,
};
</script>

<style scoped>
.progress-node {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid #16a6e2;
  color: #16a6e2;
  display: grid;
  place-items: center;
  font-size: 14px;
  background: white;
}
.progress-node.active {
  background: #16a6e2;
  color: white;
}

.camera-chip {
  flex: 1;
  text-align: center;
  border: 1px solid #34d399;
  color: #34d399;
  background: rgba(0, 0, 0, 0.25);
  padding: 10px 8px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.camera-chip.ok {
  border-color: #34d399;
  color: #34d399;
}

.face-guide {
  width: min(78vw, 420px);
  height: min(62vh, 560px);
  position: relative;
}
.corner {
  position: absolute;
  width: 62px;
  height: 62px;
  border: 6px solid rgba(255, 255, 255, 0.95);
}
.corner.tl {
  top: 0;
  left: 0;
  border-right: 0;
  border-bottom: 0;
  border-radius: 18px 0 0 0;
}
.corner.tr {
  top: 0;
  right: 0;
  border-left: 0;
  border-bottom: 0;
  border-radius: 0 18px 0 0;
}
.corner.bl {
  bottom: 0;
  left: 0;
  border-right: 0;
  border-top: 0;
  border-radius: 0 0 0 18px;
}
.corner.br {
  bottom: 0;
  right: 0;
  border-left: 0;
  border-top: 0;
  border-radius: 0 0 18px 0;
}
.mesh {
  position: absolute;
  inset: 12% 10%;
  background-image:
    linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px);
  background-size: 16px 16px;
  mask-image: radial-gradient(circle at center, rgba(0,0,0,.65), transparent 82%);
  -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,.65), transparent 82%);
}

.age-line-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  border: 0;
  background: transparent;
  color: #1f2937;
  font-size: 18px;
}
.age-line-btn .dash {
  width: 64px;
  height: 2px;
  background: #cbd5e1;
  display: inline-block;
}
.age-line-btn .value {
  min-width: 44px;
  text-align: center;
  font-size: 22px;
  letter-spacing: 0.12em;
}
.age-line-btn .suffix {
  color: #334155;
}

.age-modal-input {
  width: 160px;
  height: 100px;
  border: 2px solid #dca500;
  font-size: 44px;
  text-align: center;
  outline: none;
  color: #0f172a;
}

.carousel-dot {
  width: 18px;
  height: 4px;
  border-radius: 999px;
  background: #d1d5db;
}
.carousel-dot.active {
  background: #16a6e2;
}

.promo-strip {
  background: #16a6e2;
  color: white;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  line-height: 1.45;
}

.result-summary-card {
  overflow: hidden;
}
.photo-backdrop {
  background:
    linear-gradient(90deg, rgba(0,0,0,.65), rgba(0,0,0,.1), rgba(0,0,0,.65)),
    #111827;
  min-height: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
}
.summary-selfie {
  width: min(260px, 70vw);
  height: auto;
  border-radius: 6px;
  object-fit: cover;
}
.result-sheet {
  background: white;
  margin: -18px 24px 0;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  position: relative;
}
.result-tag {
  display: inline-block;
  background: #16a6e2;
  color: white;
  padding: 4px 8px;
  font-size: 11px;
  border-radius: 4px;
}

.routine-tab {
  flex: 1;
  height: 58px;
  font-size: 18px;
  color: #475569;
  border-bottom: 3px solid transparent;
}
.routine-tab.active {
  color: #16a6e2;
  border-bottom-color: #16a6e2;
}

.email-buy-bar {
  display: grid;
  grid-template-columns: 1fr 88px;
  gap: 14px;
}
.email-cta {
  min-height: 64px;
  border: 1px solid #475569;
  background: white;
  color: #0f172a;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  font-size: 15px;
}
.buy-lock-btn {
  min-height: 64px;
  background: #c6ecfb;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.white-card-lg {
  background: white;
  border: 1px solid #e5e7eb;
  padding: 28px 24px;
  box-shadow: 0 6px 20px rgba(0,0,0,.05);
}

.sensitivity-range {
  accent-color: #16a6e2;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .promo-strip {
    font-size: 13px;
  }

  .email-buy-bar {
    grid-template-columns: 1fr 72px;
  }

  .email-cta {
    font-size: 13px;
  }

  .result-sheet {
    margin: -14px 12px 0;
    padding: 18px;
  }
}
</style>
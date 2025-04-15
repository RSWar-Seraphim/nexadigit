// src/components/Hero.ts
export function Hero() {
  const heroEl = document.createElement('section')
  heroEl.className = `w-full max-w-[1238px] mx-auto px-[64px] mt-12`

  heroEl.innerHTML = `
    <div class="grid grid-cols-12 gap-4">
      <!-- Contenido principal -->
      <div class="col-span-12 text-center">
        <!-- Títulos -->
        <h2 class="font-montserrat font-extrabold text-[74px] leading-[1.1]">
          Soluciones IA para mejorar
        </h2>
        <h2 class="font-montserrat font-extrabold text-[88px] leading-[1.1] mt-1">
          Operaciones Digitales.
        </h2>

        <!-- NexaDigit + Flecha -->
        <div class="relative inline-block mt-4">
          <h1 class="relative z-10 font-petrov-sans text-[240px] leading-none">
            NexaDigit
          </h1>
          <img 
            src="/src/assets/arrow_hero_section_down.svg" 
            alt="Arrow Down"
            class="absolute z-0 w-[428px] h-[635px] pointer-events-none
              top-[100%] left-[55%]
              -translate-x-1/2 -translate-y-1/2
            "
          />
        </div>

        <!-- Campo email y botón -->
        <div class="mt-32 flex justify-center items-center gap-2">
          <input 
            type="email" 
            placeholder="email@domain.com" 
            class="w-[314px] h-[57px] bg-white rounded-[20px] text-black px-4 py-2"
          />
          <button 
            type="submit" 
            class="bg-[#006E49] text-white font-bold flex items-center gap-2 h-[57px] px-4"
          >
            <img src="/src/assets/icon-send.svg" alt="Enviar" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Logos en recuadro verde -->
    <div class="grid grid-cols-12 mt-20">
      <div class="col-span-12 flex justify-center">
        <div class="w-[1074px] h-[154px] bg-[#006E49] rounded-[55px] flex items-center justify-center gap-8">
          <img src="/src/assets/ms-gold-partner.png" alt="Microsoft Gold Partner" class="w-[175px] h-[45px]" />
          <img src="/src/assets/NVIDIA_logo.png" alt="NVIDIA" class="w-[235px] h-[44px]" />
          <img src="/src/assets/novosit-logo.png" alt="Novosit" class="w-[172px] h-[46px]" />
          <img src="/src/assets/openai.png" alt="OpenAI" class="w-[199px] h-[54px]" />
        </div>
      </div>
    </div>

    <!-- Flecha extra debajo del recuadro -->
    <div class="grid grid-cols-12">
      <div class="col-span-12 flex items-center justify-center">
        <img src="/src/assets/arrow-down-hero-section.svg" alt="Arrow Down under the green box" class="w-[98.67px] h-[98px] cursor-pointer" />
      </div>
    </div>
  `

  return heroEl
}

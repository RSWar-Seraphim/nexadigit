// src/components/About.ts
export function About() {
  const aboutEl = document.createElement('section')

  // Aumentamos el ancho máximo a 1238 para que el texto tenga más espacio.
  aboutEl.className = `
    w-full max-w-[1000px] min-h-[941px] mx-auto mt-24 px-4 text-white
  `

  aboutEl.innerHTML = `
    <!-- Encabezado (título NOSOTROS) centrado -->
    <div class="text-center">
      <h2 class="font-montserrat font-bold text-[45px] leading-none">
        NOSOTROS
      </h2>
      <div class="flex justify-center mt-10">
        <!-- Icono marker-icon.png (91×25) -->
        <img
          src="/src/assets/marker-icon.png"
          alt="Marker icon"
          class="w-[91px] h-[25px]"
        />
      </div>
    </div>

    <!-- Contenedor principal de 4 ítems en filas (grid-rows-4) -->
    <div class="mt-10 grid grid-rows-4 gap-10">

      <!-- ÍTEM 1: INNOVACIÓN CON IA -->
      <div class="grid grid-cols-12 items-center gap-4">
        <!-- Columna 1 (col-span-5): Ícono circular + Título -->
        <div class="col-span-5 flex items-center gap-3">
          <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center">
            <img
              src="/src/assets/about-processor-icon.svg"
              alt="INNOVACIÓN CON IA"
              class="w-4 h-4"
            />
          </div>
          <h3 class="font-montserrat font-bold text-[25px] uppercase leading-tight">
            INNOVACIÓN CON IA
          </h3>
        </div>

        <!-- Columna 2 (col-span-1): Flecha, centrada -->
        <div class="col-span-1 flex items-center justify-center">
          <img
            src="/src/assets/arrow-right-about.svg"
            alt="Flecha de separación"
            class="w-[25px] h-[25px]"
          />
        </div>

        <!-- Columna 3 (col-span-6): Texto descriptivo + línea debajo -->
        <div class="col-span-6">
          <p class="font-montserrat font-medium text-[20px] leading-relaxed text-left">
            Ayudamos a las empresas a evolucionar con Inteligencia Artificial
            y a prepararse para el futuro.
          </p>
          <div class="border-b border-[#D9D9D9] w-full mt-5"></div>
        </div>
      </div>

      <!-- ÍTEM 2: MIGRACIÓN DIGITAL -->
      <div class="grid grid-cols-12 items-center gap-4">
        <div class="col-span-5 flex items-center gap-3">
          <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center">
            <img
              src="/src/assets/about-migrate-icon.svg"
              alt="MIGRACIÓN DIGITAL"
              class="w-4 h-4"
            />
          </div>
          <h3 class="font-montserrat font-bold text-[25px] uppercase leading-tight">
            MIGRACIÓN DIGITAL
          </h3>
        </div>
        <div class="col-span-1 flex items-center justify-center">
          <img
            src="/src/assets/arrow-right-about.svg"
            alt="Flecha de separación"
            class="w-[25px] h-[25px]"
          />
        </div>
        <div class="col-span-6">
          <p class="font-montserrat font-medium text-[20px] leading-relaxed text-left">
            Facilitamos la migración de procesos tradicionales a modelos
            de negocio basados en IA.
          </p>
          <div class="border-b border-[#D9D9D9] w-full mt-5"></div>
        </div>
      </div>

      <!-- ÍTEM 3: PLAN DISRUPTIVO -->
      <div class="grid grid-cols-12 items-center gap-4">
        <div class="col-span-5 flex items-center gap-3">
          <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center">
            <img
              src="/src/assets/about-plan-icon.svg"
              alt="PLAN DISRUPTIVO"
              class="w-4 h-4"
            />
          </div>
          <h3 class="font-montserrat font-bold text-[25px] uppercase leading-tight">
            PLAN DISRUPTIVO
          </h3>
        </div>
        <div class="col-span-1 flex items-center justify-center">
          <img
            src="/src/assets/arrow-right-about.svg"
            alt="Flecha de separación"
            class="w-[25px] h-[25px]"
          />
        </div>
        <div class="col-span-6">
          <p class="font-montserrat font-medium text-[20px] leading-relaxed text-left">
            Brindamos orientación estratégica para adoptar la inteligencia artificial de forma efectiva,
             asegurando un impacto tangible y sostenible.
          </p>
          <div class="border-b border-[#D9D9D9] w-full mt-5"></div>
        </div>
      </div>

      <!-- ÍTEM 4: CAPITAL HUMANO -->
      <div class="grid grid-cols-12 items-center gap-4">
        <div class="col-span-5 flex items-center gap-3">
          <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center">
            <img
              src="/src/assets/about-human-icon.svg"
              alt="CAPITAL HUMANO"
              class="w-4 h-4"
            />
          </div>
          <h3 class="font-montserrat font-bold text-[25px] uppercase leading-tight">
            CAPITAL HUMANO
          </h3>
        </div>
        <div class="col-span-1 flex items-center justify-center">
          <img
            src="/src/assets/arrow-right-about.svg"
            alt="Flecha de separación"
            class="w-[25px] h-[25px]"
          />
        </div>
        <div class="col-span-6">
          <p class="font-montserrat font-medium text-[20px] leading-relaxed text-left">
            Creemos en la colaboración entre humanos y tecnología
            para crear negocios más eficientes y sostenibles.
          </p>
        </div>
      </div>

    </div>
  `

  return aboutEl
}

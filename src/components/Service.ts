// src/components/Service.ts
export function Service() {
  const serviceEl = document.createElement('section')

  // Contenedor principal similar a About (ajusta si necesitas más ancho)
  serviceEl.className = `
    w-full max-w-[956px] min-h-[941px] mx-auto mt-24 px-4 text-white
  `

  serviceEl.innerHTML = `
    <!-- 1) ENCABEZADO GENERAL DE LA SECCIÓN "SERVICIOS" -->
    <div class="text-center">
      <h2 class="font-montserrat font-bold text-[45px] leading-none">
        SERVICIOS
      </h2>
      <div class="flex justify-center mt-2">
        <img
          src="/src/assets/marker-icon-small.png"
          alt="Marker icon"
          class="w-[91px] h-[25px]"
        />
      </div>
    </div>

    <!-- BLOQUE 1: "CONSULTORÍA EN INNOVACIÓN" (sin cambios) -->
    <div class="flex flex-col items-center mt-10">
      <h3 class="font-montserrat font-bold text-[25px] text-center w-full">
        CONSULTORÍA EN INNOVACIÓN
      </h3>

      <!-- Imagen de 618×818 con esquinas redondeadas -->
      <img
        src="/src/assets/happy-business-people-in-a-meeting-2025-02-10-02-43-54-utc.jpg"
        alt="Happy business people in a meeting"
        class="w-[618px] h-[818px] object-cover rounded-[55px] mt-6"
      />

      <!-- Flecha apuntando abajo (rotada si la original apunta a la derecha) -->
      <img
        src="/src/assets/arrow-right-about.svg"
        alt="Arrow Down"
        class="mt-4 w-[25px] h-[25px] transform rotate-90"
      />

      <!-- Texto centrado (lo dejamos igual que estaba) -->
      <p class="font-montserrat font-medium text-[20px] leading-relaxed text-center mt-4 w-[618px]">
        Asesoramos a empresas en la integración y estrategia de IA para optimizar procesos y modelos de negocio.
      </p>

      <!-- Botón "HAZ UNA CITA" -->
      <button
        class="mt-8 w-[325px] h-[87px] bg-[#006E49] text-white font-montserrat 
               font-bold text-[18px] uppercase rounded-[8px] flex items-center
               justify-center"
      >
        HAZ UNA CITA
      </button>
    </div>

 <!-- BLOQUE 2: "CAPACITACIÓN ESPECIALIZADA PARA EMPRESAS" -->
<div class="grid grid-cols-12 items-center gap-8 mt-16">
  <!-- Columna Izquierda: Imagen 485×720 -->
  <div class="col-span-6 flex justify-center">
    <img
      src="/src/assets/entrepreneurs-discussing-documents-2025-01-29-08-04-13-utc.jpg"
      alt="Entrepreneurs discussing documents"
      class="w-[485px] h-[720px] object-cover rounded-[55px]"
    />
  </div>

  <!-- Columna Derecha: Contenedor sin fondo (485×720) -->
  <div class="col-span-6 flex justify-center">
    <div class="relative w-[485px] h-[720px]">
      <!-- Bloque de texto, centrado verticalmente, con alineación mixta -->
      <div class="absolute inset-0 flex flex-col items-start justify-center px-6">
        <!-- Título alineado a la izquierda -->
        <h3 class="font-montserrat font-bold text-[35px] leading-tight text-left">
          Capacitación Especializada para Empresas
        </h3>

        <!-- Marker icon centrado en su propio contenedor -->
        <div class="flex justify-center w-full mt-8">
          <img
            src="/src/assets/marker-icon-small.png"
            alt="Marker icon"
            class="w-[91px] h-[25px]"
          />
        </div>

        <!-- Texto descriptivo alineado a la izquierda -->
        <p class="font-montserrat font-medium text-[20px] leading-relaxed text-left mt-8">
          Brindamos formación con cursos, talleres y charlas sobre transformación digital.
          Disponemos de un centro de formación equipado para una mejor experiencia.
        </p>
      </div>
    </div>
  </div>
</div>




    <!-- BLOQUE 3: "OPTIMIZACIÓN EMPRESARIAL CON IA" -->
<div class="grid grid-cols-12 items-center gap-8 mt-16">
  <!-- Columna Izquierda: Contenedor para el texto (485×720) -->
  <div class="col-span-6 flex justify-center">
    <div class="relative w-[485px] h-[720px]">
      <!-- Bloque de texto, centrado verticalmente en el contenedor -->
      <div class="absolute inset-0 flex flex-col items-start justify-center px-6">
        <!-- Título principal -->
        <h3 class="font-montserrat font-bold text-[35px] leading-tight text-left">
          Optimización Empresarial con IA
        </h3>
        <!-- Separador: marker-icon centrado en su propio div -->
        <div class="flex justify-center w-full mt-8">
          <img
            src="/src/assets/marker-icon-small.png"
            alt="Marker icon"
            class="w-[91px] h-[25px]"
          />
        </div>
        <!-- Texto descriptivo, con espacio adicional -->
        <p class="font-montserrat font-medium text-[20px] leading-relaxed text-left mt-8">
          A través de Unisync Agents, automatizamos tareas repetitivas y procesos digitales, permitiendo a tu equipo enfocarse en actividades de mayor valor.
        </p>
      </div>
    </div>
  </div>

  <!-- Columna Derecha: Rectángulo (485×720) con fondo #006E49 al 20% y esquinas redondeadas -->
  <div class="col-span-6 flex justify-center">
    <div class="w-[485px] h-[720px] bg-[#006E49]/20 rounded-[55px]"></div>
  </div>
</div>
      <!-- Columna Derecha: Imagen (rectángulo) 485×720 con esquinas 55px -->
      <div class="col-span-6 flex justify-center">
        <img
          src="/src/assets/optimizacion-empresarial-ia.png"
          class="w-[485px] h-[720px] object-cover rounded-[55px]"
        />
      </div>
    </div>
  `

  return serviceEl
}

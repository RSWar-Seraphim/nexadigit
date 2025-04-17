// src/components/Unisync.ts
export function Unisync() {
  const unisyncEl = document.createElement('section')

  unisyncEl.className = `
    w-full max-w-[956px] mx-auto mt-24 px-4 text-white
  `

  unisyncEl.innerHTML = `
    <!-- Encabezado UniSync -->
    <div class="text-center">
      <img src="/src/assets/marker-icon.png" alt="Marker" class="mx-auto" />
      <h1 class="font-petrov-sans font-bold text-[240px] leading-none mt-4">UniSync</h1>
      <img src="/src/assets/laptop_screen_unisync.png" alt="Laptop" class="mx-auto mt-8" />

      <!-- Tagline -->
      <div class="mt-12 text-center">
        <h2 class="font-montserrat font-bold text-[55px]">Una sola plataforma</h2>
        <h3 class="font-montserrat font-bold text-[46px] mt-2">Múltiples soluciones <span class="text-[#00cc88]">IA</span>.</h3>
        <div class="flex justify-center mt-4">
          <img src="/src/assets/marker-icon.png" alt="Marker small" class="w-[91px] h-[25px]" />
        </div>
      </div>
    </div>

    <!-- Características de UniSync -->
    <div class="grid grid-cols-12 items-start gap-12 mt-16">
      <div class="col-span-6 flex flex-col gap-12 text-left">
        <!-- Ítem 1 -->
        <div class="flex items-start gap-4">
          <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center shrink-0">
            <img src="/src/assets/unisync-icon-ai.svg" alt="Automatización" class="w-4 h-4" />
          </div>
          <div>
            <h4 class="font-montserrat font-bold text-[32px] leading-tight">Automatización con IA</h4>
            <p class="font-montserrat font-medium text-[20px] leading-relaxed mt-2 max-w-[400px]">Agentes inteligentes que ejecutan tareas sin intervención manual, mejorando la eficiencia y reduciendo errores operativos.</p>
          </div>
        </div>
        <!-- Ítem 2 -->
        <div class="flex items-start gap-4">
          <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center shrink-0">
            <img src="/src/assets/unisync-dashboard-icon.svg" alt="Gestión" class="w-4 h-4" />
          </div>
          <div>
            <h4 class="font-montserrat font-bold text-[32px] leading-tight">Gestión Centralizada</h4>
            <p class="font-montserrat font-medium text-[20px] leading-relaxed mt-2 max-w-[400px]">Maneja proyectos, finanzas y operaciones desde un solo panel. Todo en un entorno unificado y optimizado.</p>
          </div>
        </div>
        <!-- Ítem 3 -->
        <div class="flex items-start gap-4">
          <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center shrink-0">
            <img src="/src/assets/unisync-module.svg" alt="Módulos" class="w-4 h-4" />
          </div>
          <div>
            <h4 class="font-montserrat font-bold text-[32px] leading-tight">Módulos Personalizados</h4>
            <p class="font-montserrat font-medium text-[20px] leading-relaxed mt-2 max-w-[400px]">Desarrollamos soluciones a medida que amplían UniSync según tus necesidades. Incluye análisis, propuesta, presupuesto y entrega. Servicio cotizado por separado.</p>
          </div>
        </div>
      </div>

      <!-- Imagen rostro 3D -->
      <div class="col-span-6 flex justify-center">
        <img src="/src/assets/unisync-face-3d.png" alt="Face 3D" class="w-[593px] h-[656px] object-contain" />
      </div>
    </div>

    <!-- CTA + Estadísticas IA -->
    <div class="flex flex-col items-center mt-24">
      <!-- Botón demo -->
      <button class="w-[325px] h-[87px] bg-[#006E49] hover:bg-[#00e699] transition-colors rounded font-montserrat font-bold uppercase tracking-wide flex items-center justify-center gap-2">
        Solicita una demo
        <img src="/src/assets/arrow-right-about.svg" alt="arrow" class="w-4 h-4" />
      </button>
    </div>

    <div class="grid grid-cols-12 items-center gap-8 mt-16">
      <!-- Edificio IA -->
      <div class="col-span-6 flex justify-center">
        <img src="/src/assets/building-ai-unisync.png" alt="Building AI" class="w-[478px] h-[939px] object-contain" />
      </div>

      <!-- Estadísticas (íconos centrados) -->
      <div class="col-span-6 flex flex-col items-center gap-20 text-center">
        <!-- Stat 1 -->
        <div class="flex flex-col items-center gap-4 max-w-[380px]">
          <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center">
            <img src="/src/assets/unisync-graph-icon.svg" alt="stat" class="w-4 h-4" />
          </div>
          <p class="font-montserrat font-medium text-[20px] leading-relaxed">Las empresas que han integrado IA han experimentado un incremento del 40% en su productividad.</p>
        </div>
        <!-- Stat 2 -->
        <div class="flex flex-col items-center gap-4 max-w-[380px]">
          <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center">
            <img src="/src/assets/unisync-world.svg" alt="stat" class="w-4 h-4" />
          </div>
          <p class="font-montserrat font-medium text-[20px] leading-relaxed">Se estima que el mercado global de IA alcanzará los 407 mil millones de dólares para 2027, con una tasa de crecimiento anual del 36,2%.</p>
        </div>
        <!-- Stat 3 -->
        <div class="flex flex-col items-center gap-4 max-w-[380px]">
          <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center">
            <img src="/src/assets/unisync-corporate.svg" alt="stat" class="w-4 h-4" />
          </div>
          <p class="font-montserrat font-medium text-[20px] leading-relaxed">El 77% de las compañías ya utilizan o están explorando la IA en sus procesos de negocio.</p>
        </div>
      </div>
    </div>
  `

  return unisyncEl
}

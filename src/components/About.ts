// src/components/About.ts
import { t, onLangChange } from './i18n'

export function About() {
  const aboutEl = document.createElement('section')

  /* ---------- helper tipado ---------- */
  type I18nKey = Parameters<typeof t>[0]

  /* helper itemRow centrado + línea solo bajo la descripción */
const itemRow = (
  params: {
    icon: string
    titleKey: I18nKey
    descKey: I18nKey
    underline?: boolean
  }
) => {
  const { icon, titleKey, descKey, underline = true } = params
  return `
    <!-- fila -->
    <div class="grid grid-cols-12 items-center gap-4 min-h-[170px]">
      <!-- icono + título -->
      <div class="col-span-5 flex items-center gap-3">
        <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center">
          <img src="${icon}" alt="${t(titleKey)} icon" class="w-4 h-4" />
        </div>
        <h3 class="font-montserrat font-bold text-[25px] uppercase leading-tight">
          ${t(titleKey)}
        </h3>
      </div>

      <!-- flecha -->
      <div class="col-span-1 flex items-center justify-center">
        <img src="/src/assets/arrow-right-about.svg" alt="Arrow separator" class="w-[25px] h-[25px]" />
      </div>

      <!-- descripción + sub‑línea -->
      <div class="col-span-6 flex flex-col justify-center">
        <p class="font-montserrat font-medium text-[20px] leading-relaxed text-left">
          ${t(descKey)}
        </p>
        ${
          underline
            ? '<div class="border-b border-[#D9D9D9] w-full mt-5"></div>'
            : ''
        }
      </div>
    </div>
  `
}


  /* ---------- render ---------- */
  const render = () => {
    aboutEl.className =
      'w-full max-w-[1000px] min-h-[941px] mx-auto mt-24 px-4 text-white'

    aboutEl.innerHTML = `
      <!-- Encabezado -->
      <div class="text-center">
        <h2 class="font-montserrat font-bold text-[45px] leading-none">
          ${t('about_title')}
        </h2>
        <div class="flex justify-center mt-10">
          <img src="/src/assets/marker-icon.png" alt="Marker icon" class="w-[91px] h-[25px]" />
        </div>
      </div>

      <!-- Ítems -->
      <div class="mt-10 grid grid-rows-4 gap-10">
        ${itemRow({
          icon: '/src/assets/about-processor-icon.svg',
          titleKey: 'about_item1_title',
          descKey: 'about_item1_desc',
        })}
        ${itemRow({
          icon: '/src/assets/about-migrate-icon.svg',
          titleKey: 'about_item2_title',
          descKey: 'about_item2_desc',
        })}
        ${itemRow({
          icon: '/src/assets/about-plan-icon.svg',
          titleKey: 'about_item3_title',
          descKey: 'about_item3_desc',
        })}
        ${itemRow({
          icon: '/src/assets/about-human-icon.svg',
          titleKey: 'about_item4_title',
          descKey: 'about_item4_desc',
          underline: false,
        })}
      </div>
    `
  }

  render()
  onLangChange(render)

  return aboutEl
}

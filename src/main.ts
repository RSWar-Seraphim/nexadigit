  // src/main.ts
  import './style.css'
  import { Header }   from './components/Header'
  import { Hero }     from './components/Hero'
  import { About }    from './components/About'
  import { Service }  from './components/Service'
  import { Unisync }  from './components/Unisync'
  import { Contact }  from './components/Contact'

  /* -------------------------------------------------------- */
  /* Esperamos al DOM y luego construimos TODA la página      */
  /* Finalmente cargamos scroll.ts de forma dinámica          */
  /* -------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', async () => {
    const app = document.querySelector<HTMLDivElement>('#app')!

    /* 1) Header fijo */
    const headerEl = Header()
    app.appendChild(headerEl)

    /* 2) Elemento <main> con padding superior (alto del header) */
    const mainEl = document.createElement('main')
    mainEl.className = 'bg-black text-white pt-20 sm:pt-[260px]'  // 260 = HEADER_OFFSET

    /* 3) Secciones en orden */
    mainEl.append(
      Hero(),       // id="home"
      About(),      // id="about"
      Service(),    // id="services"
      Unisync(),    // id="unisync"
      Contact()     // id="contact"
    )

    /* 4) Al DOM */
    app.appendChild(mainEl)

    /* 5) Cargamos scroll.ts AHORA que las secciones existen */
    await import('./scroll')
    /* 6) Ocultamos loader con un delay de ~6 s para pruebas --------------- */
    const loader = document.getElementById('loader')
    if (loader) {
      // espera 6000 ms y luego aplica el fade
      setTimeout(() => {
        loader.classList.add('opacity-0')      // transición de 500 ms
        setTimeout(() => loader.remove(), 500) // lo quita del DOM
      }, 2000)
    }
  })

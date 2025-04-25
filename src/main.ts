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
  mainEl.className = 'bg-black text-white pt-[260px]'  // 260 = HEADER_OFFSET

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
})

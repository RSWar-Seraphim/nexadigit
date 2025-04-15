// src/main.ts
import './style.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Service } from './components/Service'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app')!

  // 1) Header fijo
  const headerEl = Header()
  app.appendChild(headerEl)

  // 2) Contenedor principal (Hero, About, Services, etc.)
  const mainEl = document.createElement('main')
  mainEl.className = 'bg-black text-white pt-[220px]'

  // 3) Agregar las secciones
  mainEl.appendChild(Hero())
  mainEl.appendChild(About())
  mainEl.appendChild(Service())

  // 4) Añadir el contenedor al DOM
  app.appendChild(mainEl)
})

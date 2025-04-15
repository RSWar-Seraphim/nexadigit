// src/main.ts
import './style.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app')!

  // 1) Montamos el Header fijo
  const headerEl = Header()
  app.appendChild(headerEl)

  // 2) Creamos un contenedor principal para el flujo normal (Hero, About, etc.)
  // Ajusta el padding-top para compensar el header fijo
  const mainEl = document.createElement('main')
  mainEl.className = 'bg-black text-white pt-[220px]'

  // 3) Agregamos el Hero y el About
  mainEl.appendChild(Hero())
  mainEl.appendChild(About())

  // 4) Agregamos el contenedor principal al DOM
  app.appendChild(mainEl)
})

import { es } from './es'
import { en } from './en'

type Lang = 'es' | 'en'
const translations = { es, en }

let currentLang: Lang = (localStorage.getItem('lang') as Lang) || 'es'

// Observadores para saber cuándo cambia
const listeners: (() => void)[] = []

export function t(key: keyof typeof es): string {
  return translations[currentLang][key] || key
}

export function getLang(): Lang {
  return currentLang
}

export function setLang(lang: Lang) {
  currentLang = lang
  localStorage.setItem('lang', lang)
  listeners.forEach(callback => callback())
}

export function onLangChange(callback: () => void) {
  listeners.push(callback)
}

// src/components/i18n/autoDetectLang.ts
// Spanish is the site's default language. We honor a returning visitor's explicit
// choice (persisted in localStorage by setLang) and otherwise fall back to 'es' —
// we deliberately do NOT sniff navigator.language, so every first visit is ES.

export function autoDetectLang(): 'es' | 'en' {
  const stored = localStorage.getItem('lang')
  return stored === 'en' ? 'en' : 'es'
}

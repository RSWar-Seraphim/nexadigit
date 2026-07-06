// src/components/i18n/autoDetectLang.ts
// Instant, synchronous language detection from the browser — NO network call.
// (The previous version fetched ipapi.co on first load, which blocked the whole
// render and leaked the visitor's IP to a third party.) navigator.language is a
// reliable proxy: Spanish-preferring browsers → 'es', everything else → 'en'.

export function autoDetectLang(): 'es' | 'en' {
  const stored = localStorage.getItem('lang')
  if (stored === 'es' || stored === 'en') return stored

  const langs =
    navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || 'en']

  return langs.some((l) => l.toLowerCase().startsWith('es')) ? 'es' : 'en'
}

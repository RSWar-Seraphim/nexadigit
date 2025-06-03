// src/components/i18n/autoDetectLang.ts

const ES_COUNTRIES = [
  "AR","BO","CL","CO","CR","CU","DO","EC","SV","GQ",
  "GT","HN","MX","NI","PA","PY","PE","PR","ES","UY","VE"
];

export async function autoDetectLang(): Promise<'es'|'en'> {
  // Si ya hay un idioma guardado, respétalo
  const stored = localStorage.getItem('lang');
  if (stored === 'es' || stored === 'en') return stored;

  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    const country = data.country;
    if (country === 'US') return 'en';
    if (ES_COUNTRIES.includes(country)) return 'es';
    return 'en'; // fallback
  } catch {
    return 'en'; // fallback
  }
}

// src/utils/detectLanguage.ts

const ES_COUNTRIES = [
  "AR","BO","CL","CO","CR","CU","DO","EC","SV","GQ",
  "GT","HN","MX","NI","PA","PY","PE","PR","ES","UY","VE"
];

export async function detectPreferredLanguage(): Promise<'es' | 'en'> {
  // Checa si ya está guardado en localStorage
  const storedLang = localStorage.getItem('lang');
  if (storedLang === 'es' || storedLang === 'en') {
    return storedLang;
  }

  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    const country = data.country;
    let lang: 'es' | 'en' = 'en';
    if (country === 'US') lang = 'en';
    else if (ES_COUNTRIES.includes(country)) lang = 'es';

    localStorage.setItem('lang', lang);
    return lang;
  } catch {
    // Si falla, default a inglés
    return 'en';
  }
}

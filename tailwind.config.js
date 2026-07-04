/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'index.html',
    './src/**/*.{js,ts,jsx,tsx,vue,html}',
  ],
  theme: {
    extend: {
      // ────────────────────────────────────────────────
      // Design tokens — single source of truth lives in
      // src/styles/style.css (:root). Tailwind maps to it.
      // ────────────────────────────────────────────────
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        ink: 'var(--ink)',
        slate: 'var(--slate)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        signal: 'var(--signal)',
      },

      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Instrument Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Instrument Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        logo: ['PetrovSans', '"Bricolage Grotesque"', 'sans-serif'],
      },

      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },

      maxWidth: {
        content: '1200px',
      },

      // 100-dvh helpers for mobile browsers
      height: {
        dvh: '100dvh',
      },
      minHeight: {
        dvh: '100dvh',
      },
    },
  },
  plugins: [],
};

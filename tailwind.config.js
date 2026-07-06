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
      // v3 Green: warm cream · carbon · burnt orange.
      // ────────────────────────────────────────────────
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        panel: 'var(--panel)',
        carbon: 'var(--carbon)',
        ink: 'var(--ink)',
        slate: 'var(--slate)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-alt': 'var(--accent-alt)',
        signal: 'var(--accent)',
      },

      fontFamily: {
        display: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Schibsted Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        logo: ['"Petrov Sans"', '"Schibsted Grotesk"', 'sans-serif'],
      },

      boxShadow: {
        card: 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
      },

      maxWidth: {
        content: '1280px',
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

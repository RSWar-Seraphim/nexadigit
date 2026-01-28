/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'index.html',
    './src/**/*.{js,ts,jsx,tsx,vue,html}',
  ],
  theme: {
    extend: {
      // ────────────────────────────────────────────────
      // Color palette
      // ────────────────────────────────────────────────
      colors: {
        primary: '#006E49',
        'primary-hover': '#00a16b',
        backdrop: '#0F221D',
      },

      // 100‑dvh helpers for mobile browsers
      height: {
        dvh: '100dvh',
      },
      minHeight: {
        dvh: '100dvh',
      },

      // ────────────────────────────────────────────────
      // Custom break‑points
      //   • `ms`, `mm`, `ml`  →  SOLO móvil (≤ 639 px)
      //   • `sm` en adelante →  Tailwind por defecto (≥ 640 px)
      //   De esta forma las utilidades `ml:` jamás se aplican
      //   por encima de 639 px y no pueden sobre‑escribir a `sm:`.
      // ────────────────────────────────────────────────
      screens: {
          // Mobile-only
          ms: { max: '320px' },               // 0 – 320 px
          mm: { min: '321px', max: '374px' }, // 321 – 374 px
          ml: { min: '375px', max: '639px' }, // 375 – 639 px

          // Tailwind defaults
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        '3xl': '1920px',   // WQHD 2560×1440 scaled to 1920 width
        '4k': '2560px',    // UHD

        // Heights (raw queries)
        'h-sm': { raw: '(min-height: 760px)' },
        'h-md': { raw: '(min-height: 800px)' },
        'h-xl': { raw: '(min-height: 960px)' },
        'h-ultra': { raw: '(min-height: 1150px)' },

        // Combined width / height (raw queries)
        'xl-h-lg': { raw: '(min-width:1280px) and (min-height:960px)' },
      },

      // ────────────────────────────────────────────────
      // Neumorphism Shadows
      // ────────────────────────────────────────────────
      boxShadow: {
        'neu-raised': '8px 8px 16px rgba(0,0,0,0.5), -8px -8px 16px rgba(0,110,73,0.15)',
        'neu-raised-hover': '12px 12px 24px rgba(0,0,0,0.5), -12px -12px 24px rgba(0,110,73,0.15)',
        'neu-inset': 'inset 4px 4px 8px rgba(0,0,0,0.5), inset -4px -4px 8px rgba(0,110,73,0.15)',
        'neu-btn': '6px 6px 12px rgba(0,0,0,0.4), -6px -6px 12px rgba(0,212,141,0.1)',
        'neu-btn-hover': '8px 8px 16px rgba(0,0,0,0.5), -8px -8px 16px rgba(0,212,141,0.15)',
      },

      // ────────────────────────────────────────────────
      // Animations
      // ────────────────────────────────────────────────
      keyframes: {
        heartbeat: {
          '0%,100%': { transform: 'scale(1)', opacity: '1' },
          '25%': { transform: 'scale(1.25)', opacity: '1' },
          '40%': { transform: 'scale(1)', opacity: '.8' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        revealRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        revealScale: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        parallaxFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        heartbeat: 'heartbeat 1s ease-in-out infinite',
        'reveal-up': 'revealUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-left': 'revealLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-right': 'revealRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-scale': 'revealScale 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'parallax-float': 'parallaxFloat 6s ease-in-out infinite',
      },
    },
  },

  // ──────────────────────────────────────────────────
  // Plugins
  // ──────────────────────────────────────────────────
  plugins: [
    // Height variants
    ({ addVariant }) => {
      addVariant('h-lg', '@media (min-height: 920px)');
      addVariant('xl-h-lg', '@media (min-width:1280px) and (min-height:920px)');
      addVariant('lg-h-lg', '@media (min-width:1024px) and (min-height:920px)');
      addVariant('2xl-h-lg', '@media (min-width:1440px) and (min-height:920px)');
      addVariant('3xl-h-lg', '@media (min-width:1920px) and (min-height:920px)');
      addVariant('tall', '@media (min-height: 1200px)');
      addVariant('short', '@media (max-height: 850px)');
    },

    // Utility: .active → white text (navigation highlight)
    ({ addUtilities }) => {
      addUtilities({
        '.active': { color: '#fff' },
      });
    },
  ],
};

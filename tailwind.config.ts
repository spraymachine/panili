import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#FAF8FF',
          100: '#EDE7F6',
          200: '#DDD5F0',
          300: '#C9B8E8',
          400: '#B09ED6',
          500: '#9B8DC4',
          600: '#7B6EAD',
        },
        plum: {
          DEFAULT: '#3D2E5E',
          muted: '#7B6E8F',
        },
        mani: '#5B9BD5',
        pari: '#6ABF8E',
        liki: '#F5C842',
      },
      fontFamily: {
        display: ['Pacifico', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(155,141,196,0.12)',
        'card-hover': '0 6px 20px rgba(155,141,196,0.22)',
        modal: '0 8px 40px rgba(155,141,196,0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config

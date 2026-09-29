import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme
        mint: {
          50: '#F0F9F4',
          100: '#E3F1EA',
          200: '#C8E4D6',
          300: '#BFE3CF',
          400: '#A3D4BC',
          500: '#7FC4A3',
        },
        forest: {
          500: '#3D8B6A',
          600: '#2F6B4F',
          700: '#265741',
          800: '#1E4434',
          900: '#163026',
        },
        peach: {
          100: '#F8D9D0',
          200: '#F5C4B8',
          300: '#F0A896',
        },
        sage: {
          100: '#D7ECD9',
          200: '#C0E0C3',
          300: '#A3D4A8',
        },
        lavender: {
          100: '#D9D2F0',
          200: '#C4BCE8',
          300: '#A89BE0',
        },
        // Dark theme
        charcoal: {
          800: '#1E2B25',
          850: '#182420',
          900: '#121B17',
          950: '#0D1512',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '18px',
        'sheet': '20px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'sheet': '0 -4px 30px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config;

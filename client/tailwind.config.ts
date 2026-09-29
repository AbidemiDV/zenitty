import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme
        mint: {
          50: '#F4FAF7',
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
          700: '#2A3D35',
          800: '#172520',
          850: '#142019',
          900: '#0F1A16',
          950: '#0A120E',
        },
        // Semantic
        danger: '#B23A22',
        'danger-light': '#F8D9D0',
        'danger-dark': '#7A2E1D',
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'row': '16px',
        'input': '14px',
        'button': '14px',
        'fab': '20px',
        'sheet': '24px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.04)',
        'fab': '0 4px 16px rgba(47, 107, 79, 0.25)',
      },
      fontSize: {
        'greeting': ['26px', { lineHeight: '1.2', fontWeight: '800' }],
        'greeting-mobile': ['20px', { lineHeight: '1.2', fontWeight: '800' }],
        'stat': ['68px', { lineHeight: '1', fontWeight: '900' }],
        'stat-mobile': ['52px', { lineHeight: '1', fontWeight: '900' }],
        'task-title': ['15px', { lineHeight: '1.4', fontWeight: '800' }],
        'meta': ['12px', { lineHeight: '1.4', fontWeight: '700' }],
        'section': ['12px', { lineHeight: '1.2', fontWeight: '800', letterSpacing: '1px' }],
      },
    },
  },
  plugins: [],
} satisfies Config;

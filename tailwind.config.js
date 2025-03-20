/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './index.html',
  ],
  darkMode: 'class', // Enable 'class' strategy for dark mode
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.cyan,
        success: colors.emerald,
        warning: colors.amber,
        error: colors.red,
        info: colors.blue,
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}; 
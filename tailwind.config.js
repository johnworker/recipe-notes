/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans TC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#2563eb', // 藍
          soft: '#e0e7ff',
        },
        ink: {
          1: '#111827',
          2: '#374151',
        }
      },
      boxShadow: {
        card: '0 8px 30px rgba(0,0,0,.06)',
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

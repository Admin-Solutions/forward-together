/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          amber: '#f59e0b',
          teal: '#0d9488',
          navy: '#1e3a5f',
          rose: '#e11d48',
        }
      }
    },
  },
  plugins: [],
}

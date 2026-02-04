/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mythology-gold': '#FFD700',
        'mythology-bronze': '#CD7F32',
        'mythology-dark': '#1a1a2e',
        'mythology-blue': '#16213e',
      },
      fontFamily: {
        'mythology': ['Samarkan', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

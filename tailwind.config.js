/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          bg: '#08080a',
          card: '#0f0f13',
          border: '#1a1a24',
          accent: '#00ff66',  /* Signal Green */
          blue: '#00e5ff',    /* Telemetry Blue */
          textPrimary: '#e2e2e9',
          textSecondary: '#8e8e9f',
        }
      }
    },
  },
  plugins: [],
}


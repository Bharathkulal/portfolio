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
        mono: ['IBM Plex Mono', 'monospace'],
        serif: ['Source Serif 4', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          bg: 'var(--bg)',
          card: 'var(--surface)',
          tertiary: 'var(--surface-2)',
          border: 'var(--border)',
          accent: 'var(--accent)',
          blue: 'var(--accent)',
          textPrimary: 'var(--text)',
          textSecondary: 'var(--muted)',
        }
      }
    },
  },
  plugins: [],
}


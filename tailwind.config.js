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
          bg: 'var(--bg-primary)',
          card: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          border: 'var(--border-color)',
          accent: 'var(--accent-color)',
          blue: 'var(--accent-blue)',
          textPrimary: 'var(--text-primary)',
          textSecondary: 'var(--text-secondary)',
        }
      }
    },
  },
  plugins: [],
}


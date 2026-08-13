/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#121414',
        surface: '#17191a',
        'surface-strong': '#202324',
        'surface-soft': '#262b2d',
        primary: '#b7c4ff',
        'primary-strong': '#0052ff',
        'on-primary': '#001452',
        secondary: '#c8c6c5',
        text: '#e2e2e2',
        'text-soft': '#c3c5d9',
        border: '#434656',
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        display: ['Hanken Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 25px rgba(0, 82, 255, 0.35)',
      },
      backgroundImage: {
        'luxus-gradient': 'linear-gradient(90deg, #b7c4ff 0%, #ffffff 100%)',
      },
    },
  },
  plugins: [],
}

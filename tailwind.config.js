/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0b0f14',
          800: '#111822',
          700: '#1a2332',
          600: '#263447',
          500: '#394d68',
        },
        shu: {
          DEFAULT: '#10b981', // 蜀漢翠綠
          light: '#34d399',
          dark: '#065f46',
          bg: '#022c22',
        },
        wei: {
          DEFAULT: '#3b82f6', // 曹魏蒼藍
          light: '#60a5fa',
          dark: '#1e40af',
          bg: '#172554',
        },
        wu: {
          DEFAULT: '#f43f5e', // 東吳烈赤
          light: '#fb7185',
          dark: '#9f1239',
          bg: '#4c0519',
        },
        qun: {
          DEFAULT: '#f59e0b', // 群雄流金
          light: '#fbbf24',
          dark: '#b45309',
          bg: '#451a03',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', '"Songti TC"', '"STSong"', 'serif'],
        sans: ['"PingFang TC"', '"Microsoft JhengHei"', 'sans-serif'],
      },
      boxShadow: {
        'ink': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.25)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.25)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.25)',
        'glow-red': '0 0 20px rgba(244, 63, 94, 0.25)',
      }
    },
  },
  plugins: [],
}

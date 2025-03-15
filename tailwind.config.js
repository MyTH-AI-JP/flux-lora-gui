/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1a1a1a',
          card: '#2d2d2d',
          text: '#e5e5e5',
          border: '#404040',
        },
        primary: "#f97316", // オレンジ-500
        "primary-foreground": "#ffffff",
        secondary: "#fb923c", // オレンジ-400
        "secondary-foreground": "#ffffff",
        destructive: "#ef4444", // 赤色-500
        "destructive-foreground": "#ffffff",
        accent: "#ffedd5", // オレンジ-100
        "accent-foreground": "#f97316", // オレンジ-500
      }
    },
  },
  plugins: [],
} 
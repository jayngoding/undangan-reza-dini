/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Force dark mode to use class strategy with a class that is NEVER added to HTML
  // This effectively disables all dark: variant classes
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [],
}

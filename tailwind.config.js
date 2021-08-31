const tailwindColors = require('tailwindcss/colors')
const myColors = { primary: "var(--primary-color)", secondary: "var(--secondary-color)", background: "var(--background-color)" }
const finalColors = { ...tailwindColors, ...myColors }

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {},
    colors: finalColors,
    fontFamily: {
      headers: "var(--headers-font)",
      body: "var(--body-font)"
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

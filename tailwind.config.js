/** @type {import('tailwindcss').Config} */
import { colors } from "tailwindcss";
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      colors:{
        ...colors,
        head:"#222",
        second:"#767676",
        footer:"#E4E4E4"
      }
    },
  },
  plugins: [],
};

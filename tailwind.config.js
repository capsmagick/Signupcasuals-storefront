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
        third:"#B9A16B",
        fourth:"#EEEEEE",
        footer:"#E4E4E4",
        "second-red":"#C32929"
      }
    },
  },
  variants:{
    extend:{
      visibility:["group-hover"],
      display:["group-hover"],
      padding:["group-hover"]
    }
  },
  plugins: [],
};

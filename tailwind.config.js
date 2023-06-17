/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      }
    },
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      backgray: "#282c34",
      gray: "#8492a6",
      graylight: "#d3dce6",
      white: "#ffffff",
      nextblue: "#0070f3",
      nextjs: "#ff0000",
      nextgreen: "#00ff00",
      lightblue: "#90cdf4",
      albanypurp:"#46166b",
      albanyyellow: "#ecb236",
      albanylightpurp: "#5f1d91",
      nextlightblueish: "#50a7d7"

    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
};

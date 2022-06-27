/** @type {import('tailwindcss').Config} */
module.exports = {

  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      darkgray: "#282c34",
      gray: "#8492a6",
      graylight: "#d3dce6",
      white: "#ffffff",
      nextblue: "#0070f3",
      nextjs: "#ff0000",
      nextgreen: "#00ff00",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
  },
};

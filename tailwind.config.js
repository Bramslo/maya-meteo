module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mayaBlue: {  DEFAULT: '#173862',  '50': '#B9DAF3', },
        mayaYellow : {  DEFAULT: '#EDE825',  '50': '#F4F0BE',},
      }
    },
  },
  plugins: [],
}
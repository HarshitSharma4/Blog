/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      text: "#191919",
      background: "#F6FBF4",
      primary: "#F5DF99",
      accent: "#3887BE",
    },

    // fontFamily: {
    //   heading: "undefined",
    //   body: "Noto Sans Imperial Aramaic",
    // },

    fontSize: {
      sm: "0.750rem",
      base: "1rem",
      xl: "1.333rem",
      "2xl": "1.777rem",
      "3xl": "2.369rem",
      "4xl": "3.158rem",
      "5xl": "4.210rem",
    },
    // fontFamily: {
    //   heading: "undefined",
    //   body: "Tourney",
    // },

    fontFamily: {
      heading: "undefined",
      body: "Turret Road",
    },
    // fontWeight: {
    //   normal: '400',
    //   bold: '700',
    // },
  },
  plugins: [],
};

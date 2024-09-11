/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxl: "1600px", // Add a custom screen size 'xxl' with a minimum width of 1600px
        xs: "360px", // Add another custom screen size 'xs' with a minimum width of 475px
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        Playpen_Sans: ["Playpen Sans"],
      },
    },
  },
  plugins: [],
};

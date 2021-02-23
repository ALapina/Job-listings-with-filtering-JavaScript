module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "hsl(180, 29%, 50%)",
        neutral: {
          100: "hsl(180, 52%, 96%)",
          200: "hsl(180, 31%, 95%)",
          300: "hsl(180, 8%, 52%)",
          400: "hsl(180, 14%, 20%)",
        },
      },
      fontFamily: {
        body: ["Spartan"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

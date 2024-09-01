/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
   themes: [
      {
        mytheme: {
          "primary": "#7f1d1d",
          "accent": "#991b1b",

        },
      },
      "business"

    ],
  },
};

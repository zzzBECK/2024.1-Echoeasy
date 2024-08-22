/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        echoeasy: "#3CC1A9",
      },
      fontFamily: {
        interLight: ["Inter-Light"],
        interRegular: ["Inter-Regular"],
        interMedium: ["Inter-Medium"],
        interSemiBold: ["Inter-SemiBold"],
        interBold: ["Inter-Bold"],
      },
    },
  },
  plugins: [],
}


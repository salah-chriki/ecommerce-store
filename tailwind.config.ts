import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        oxanium: ["Oxanium", "sans-serif"],
      },
      colors: {
        heroColor: "#17171C",
        primary: "#17171C",
        muted: "#66666B",
        cardColor: "#17171C",
        bannerColor: "#282831",
        buttonColor: "#F54329",
        footerColor: "#1B1B23",
      },
    },
  },
  plugins: [],
};
export default config;

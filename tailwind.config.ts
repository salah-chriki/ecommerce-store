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
        heroColor: "#111111",
        primary: "#111111",
        mutedPrimary: "#FDEEDA",
        // muted: "#66666B",
        muted: "#9CA3AF",
        // cardColor: "#17171C",
        cardColor: "#111111",
        // bannerColor: "#282831",
        bannerColor: "#2A2A2A",
        // buttonColor: "#F54329",
        // buttonColor: "#FDEEDA",
        hoverColor: "#2B62EB",
        // buttonColor2: "#8B5CF6",
        // buttonColor: "#7F40EE",
        buttonColor: "#A355F6",
        buttonColor2: "#2B62EB",
        footerColor: "#111111",
      },
    },
  },
  plugins: [],
};
export default config;

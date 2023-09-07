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
      colors: {
        "navbar-background": "#A799FF",
        "page-background": "#FFFDEB",
        "dashboard-tile-1": "#C6FAD2",
        "dashboard-tile-2": "#DD9BCF",
        "dashboard-tile-3": "#C3E8ED",
        "dashboard-tile-4": "#FAD2CC",
        "dashboard-tile-5": "#F48882",
        "external-link": "#0500FF",
      },
      width: {
        "tile-1": "384px", // One tile
        "tile-2": "812px", // Two tiles
        "tile-3": "1240px", // Three tiles
      },
      height: {
        "tile-1": "225px",
        "tile-2": "500px",
        "tile-3": "775px",
      },
      fontFamily: {
        primary: "Oswald",
        oswald: ["Oswald"],
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          50: "#f5fbff",
          100: "#e7f6ff",
          200: "#d4efff",
          300: "#afe0ff",
          400: "#79cbff",
          500: "#49b0ff"
        },
        adventure: {
          navy: "#183a66",
          blue: "#2b65b1",
          yellow: "#ffd45f",
          cream: "#fff7e4",
          coral: "#ff6a63"
        }
      },
      boxShadow: {
        game: "0 20px 45px rgba(24, 58, 102, 0.18)",
        panel: "0 16px 30px rgba(24, 58, 102, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;


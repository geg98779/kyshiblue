import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        "dark-gray": "#171717",
        violet: "#30143F",
        chrome: "#A8A8AD",
        bone: "#E8E4DC",
        muted: "#888888",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Black", "sans-serif"],
        body: ["var(--font-body)", "Helvetica Neue", "sans-serif"],
        mono: ["var(--font-mono)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        brutal: "0.12em",
      },
    },
  },
  plugins: [],
};

export default config;

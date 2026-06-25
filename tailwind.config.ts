import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg:           "#01082D",
        surface:      "#041D56",
        surfaceMid:   "#0F2573",
        surfaceLight: "#266CA9",
        accent:       "#ADE1FB",
        accentHover:  "#C8ECFD",
        border:       "rgba(173,225,251,0.1)",
        borderHover:  "rgba(173,225,251,0.22)",
        textPrimary:  "#FFFFFF",
        textMuted:    "rgba(173,225,251,0.7)",
        textSubtle:   "rgba(173,225,251,0.38)",
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card:      "0 0 0 1px rgba(173,225,251,0.08), 0 4px 24px rgba(1,8,45,0.5)",
        cardHover: "0 0 0 1px rgba(173,225,251,0.25), 0 8px 40px rgba(1,8,45,0.7)",
        accent:    "0 0 24px rgba(173,225,251,0.25)",
        accentHover:"0 0 40px rgba(173,225,251,0.45)",
      },
    },
  },
  plugins: [],
};
export default config;

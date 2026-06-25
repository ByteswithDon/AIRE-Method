import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Dark modern palette
        bg: "#0A0A0A",
        surface: "#141414",
        surfaceHover: "#1E1E1E",
        border: "rgba(255,255,255,0.08)",
        borderHover: "rgba(255,255,255,0.16)",
        // Yellow accent (from mobile UI reference)
        yellow: "#F5C518",
        yellowHover: "#FFD43B",
        // Text
        white: "#FFFFFF",
        muted: "#A0A0A0",
        subtle: "#606060",
        // Dimension accent colors
        approach: "#F5C518",
        implementation: "#FF6B35",
        responsibility: "#4CAF50",
        enablement: "#64B5F6",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 0 0 1px rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)",
        cardHover: "0 0 0 1px rgba(245,197,24,0.3), 0 8px 40px rgba(0,0,0,0.6)",
        yellow: "0 0 20px rgba(245,197,24,0.3)",
        yellowHover: "0 0 32px rgba(245,197,24,0.5)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(100,181,246,0.08) 0%, transparent 70%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "hero-radial":
          "radial-gradient(ellipse 60% 40% at 30% 60%, rgba(100,181,246,0.06) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;

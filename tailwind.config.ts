import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Adaptive Tier Colors
        tier: {
          struggling: {
            bg: "#064e3b",
            border: "#059669",
            light: "#a7f3d0",
            text: "#34d399",
            accent: "#10b981",
          },
          average: {
            bg: "#312e81",
            border: "#6366f1",
            light: "#c7d2fe",
            text: "#818cf8",
            accent: "#4f46e5",
          },
          excellent: {
            bg: "#701a75",
            border: "#c026d3",
            light: "#f5d0fe",
            text: "#e879f9",
            accent: "#d946ef",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

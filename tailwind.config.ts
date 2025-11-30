import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Light theme colors
        light: {
          bg: "#F7F8FA",
          surface: "#FFFFFF",
          primary: "#1F6FEB",
          accent: "#FF7A59",
          text: "#1A1A1A",
          muted: "#6B7280",
        },
        // Dark theme colors
        dark: {
          bg: "#0B1020",
          surface: "#0F1724",
          primary: "#58A6FF",
          accent: "#FF8B6B",
          text: "#E5E7EB",
          muted: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;


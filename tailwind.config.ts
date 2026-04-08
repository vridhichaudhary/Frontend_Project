import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F1115",
        surface: "#1A1C20",
        surfaceHover: "#2A2D35",
        accent: "#FF5D39",
        textPrimary: "#FFFFFF",
        textSecondary: "#A0AAB4",
        border: "#2D313A",
      },
    },
  },
  plugins: [],
};
export default config;

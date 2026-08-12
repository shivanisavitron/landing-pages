import type { Config } from "tailwindcss";
import { colors, spacing, radius, fontFamily, fontSize, fontWeight } from "./src/tokens";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors,
      spacing,
      borderRadius: radius,
      fontFamily,
      fontSize,
      fontWeight,
    },
  },
  plugins: [],
} satisfies Config;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFBF6",
          100: "#FAF6EC",
          200: "#F5EEDC",
        },
        ink: {
          900: "#0F172A",
          700: "#1E293B",
        },
        brand: {
          50: "#EEF4FF",
          100: "#DCE9FF",
          200: "#B9D3FF",
          400: "#3D7BF0",
          500: "#2563EB",
          600: "#1D4ED8",
          700: "#1E40AF",
        },
        gold: {
          50: "#FBF4DE",
          100: "#F1E1AE",
          200: "#E5C45A",
          300: "#DEBB47",
          400: "#D6AD32",
          500: "#D4A72C",
          600: "#B8901F",
          700: "#8A6D1D",
        },
        coal: {
          900: "#0B0B0B",
          800: "#111111",
          700: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px -8px rgba(15, 23, 42, 0.10)",
        floating: "0 8px 24px -6px rgba(15, 23, 42, 0.14)",
      },
    },
  },
  plugins: [],
};

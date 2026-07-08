/** @type {import('tailwindcss').Config} */
module.exports = {
  // Theme toggling is driven by adding/removing the `dark` class on <html>.
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/context/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // A single, unified font family used across every element.
      // `--font-inter` is injected by next/font in _app.jsx.
      fontFamily: {
        // Body / UI text — Inter (injected by next/font as --font-inter).
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // Display / headings — Plus Jakarta Sans (--font-jakarta), falls back
        // to Inter so the type system stays unified even before hydration.
        display: [
          "var(--font-jakarta)",
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      colors: {
        // Brand blue scale (Cobalt / Sapphire / Royal).
        brand: {
          50: "#eff5ff",
          100: "#dbe8fe",
          200: "#bfd6fe",
          300: "#93bbfd",
          400: "#6096fa",
          500: "#3b74f6", // primary cobalt
          600: "#2456eb", // sapphire (default accent)
          700: "#1d44d8", // royal
          800: "#1e3caf",
          900: "#1e388a",
          950: "#172554",
        },
        // Dark-mode metallic slate surfaces.
        metal: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d4d9e3",
          300: "#aeb7c9",
          400: "#8290a9",
          500: "#63718c",
          600: "#4e5a73",
          700: "#40495d",
          800: "#2b3140", // metallic slate panels
          900: "#1a1d26", // deep slate
          950: "#0a0b10", // near-black surface
        },
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(36,86,235,0.10), 0 20px 45px -20px rgba(36,86,235,0.45)",
        panel: "0 10px 40px -18px rgba(15,23,42,0.30)",
      },
      backgroundImage: {
        // The hero "blueprint grid" signature motif.
        blueprint:
          "linear-gradient(to right, rgba(36,86,235,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,86,235,0.08) 1px, transparent 1px)",
        "blueprint-dark":
          "linear-gradient(to right, rgba(148,187,253,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,187,253,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "40px 40px" },
        },
      },
      animation: {
        "grid-pan": "grid-pan 8s linear infinite",
      },
    },
  },
  plugins: [],
};

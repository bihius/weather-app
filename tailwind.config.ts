import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Custom color palette - replacing all default colors
        // Primary colors (replacing blue)
        primary: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fe",
          300: "#a5b8fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        // Surface colors (replacing gray backgrounds)
        surface: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        // Card colors
        card: {
          light: "#ffffff",
          dark: "#1e293b",
        },
        // Accent colors (for highlights, favorites)
        accent: {
          light: "#f59e0b",
          dark: "#fbbf24",
        },
        // Error colors
        error: {
          light: "#ef4444",
          dark: "#f87171",
        },
      },
    },
  },
};

export default config;

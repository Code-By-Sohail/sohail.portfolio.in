/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      colors: {
        // Base dark backgrounds
        dark: {
          950: "#050508",
          900: "#0a0a12",
          800: "#10101e",
          700: "#181828",
          600: "#1e1e35",
        },
        // Neon accent palette
        neon: {
          cyan: "#00f5ff",
          blue: "#0088ff",
          emerald: "#00ffa3",
          green: "#39ff14",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,136,255,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,245,255,0.12) 0%, transparent 60%)",
        "btn-neon":
          "linear-gradient(135deg, #00f5ff 0%, #0088ff 100%)",
        "btn-neon-hover":
          "linear-gradient(135deg, #0088ff 0%, #00ffa3 100%)",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px 2px rgba(0,245,255,0.45)",
        "neon-blue": "0 0 20px 2px rgba(0,136,255,0.45)",
        "neon-emerald": "0 0 20px 2px rgba(0,255,163,0.45)",
        "glass": "0 4px 32px 0 rgba(0,0,0,0.45)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
      },
    },
  },
  plugins: [],
};

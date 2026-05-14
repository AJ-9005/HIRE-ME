/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Branding & Core
        "primary": "#492200",
        "on-primary": "#ffffff",
        "secondary": "#735c00",
        "on-secondary": "#ffffff",
        "tertiary": "#2d2d29",
        "on-tertiary": "#ffffff",
        "background": "#fff8f4",
        "on-background": "#1e1b18",

        // Surfaces & Containers
        "surface": "#fff8f4",
        "on-surface": "#1e1b18",
        "surface-dim": "#e0d9d4",
        "surface-bright": "#fff8f4",
        "surface-variant": "#e8e1dc",
        "on-surface-variant": "#52443a",
        "surface-tint": "#8b501e",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#faf2ed",
        "surface-container": "#f4ece7",
        "surface-container-high": "#eee7e2",
        "surface-container-highest": "#e8e1dc",

        // Accents & Functional
        "primary-container": "#693503",
        "on-primary-container": "#ea9f66",
        "secondary-container": "#fed65b",
        "on-secondary-container": "#745c00",
        "tertiary-container": "#43433f",
        "on-tertiary-container": "#b1afaa",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",

        // Fixed & Inverse
        "primary-fixed": "#ffdcc5",
        "primary-fixed-dim": "#ffb782",
        "on-primary-fixed": "#301400",
        "on-primary-fixed-variant": "#6e3907",
        "secondary-fixed": "#ffe088",
        "secondary-fixed-dim": "#e9c349",
        "on-secondary-fixed": "#241a00",
        "on-secondary-fixed-variant": "#574500",
        "tertiary-fixed": "#e5e2dc",
        "tertiary-fixed-dim": "#c9c6c1",
        "on-tertiary-fixed": "#1c1c18",
        "on-tertiary-fixed-variant": "#474743",
        "outline": "#857469",
        "outline-variant": "#d7c2b6",
        "inverse-surface": "#33302d",
        "inverse-on-surface": "#f7efea",
        "inverse-primary": "#ffb782"
      },
      spacing: {
        "unit": "8px",
        "gutter": "24px",
        "margin-mobile": "16px",
        "margin-desktop": "40px",
        "container-max": "1280px",
        "stack-xs": "4px",
        "stack-sm": "12px",
        "stack-md": "24px",
        "stack-lg": "48px",
        "stack-xl": "80px",
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      fontFamily: {
        "manrope": ["Manrope", "sans-serif"],
        // Specific semantic families
        "display-xl": ["Manrope", "sans-serif"],
        "display-lg": ["Manrope", "sans-serif"],
        "headline-md": ["Manrope", "sans-serif"],
        "headline-sm": ["Manrope", "sans-serif"],
        "body-lg": ["Manrope", "sans-serif"],
        "body-md": ["Manrope", "sans-serif"],
        "body-sm": ["Manrope", "sans-serif"],
        "label-md": ["Manrope", "sans-serif"],
        "label-sm": ["Manrope", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "800" }],
        "display-lg": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "headline-md": ["28px", { "lineHeight": "36px", "fontWeight": "700" }],
        "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "label-md": ["14px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "label-sm": ["12px", { "lineHeight": "16px", "fontWeight": "500" }],
      }
    },
  },
  plugins: [],
}


// src/theme/colors.ts
export const colors = {
  text: {
    primary: "#212121",
    secondary: "#616161",
    muted: "#9E9E9E",
    onDark: "#FAFAFA",
    link: "#0000EE",
  },
  background: {
    base: "#FFFFFF",
    dark: "#04050B",
  },
  border: {
    default: "#9E9E9E",
  },
  button: {
    primary: {
      bg: "#212121",
      text: "#FFFFFF",
      border: "transparent",
    },
    secondary: {
      bg: "transparent",
      text: "#212121",
      border: "#212121",
    },
    disabled: {
      bg: "transparent",
      text: "#BDBDBD",
      border: "#BDBDBD",
    },
  },
} as const;

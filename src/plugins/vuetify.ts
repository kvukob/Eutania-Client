// Styles
import "mdi-icons/css/materialdesignicons.min.css";
import "vuetify/styles";
import "@/styles/variables.scss";
// Vuetify
import { createVuetify } from "vuetify";

const customDark = {
  dark: true,
  colors: {
    background: "#010106",
    surface: "#07010c",
    primary: "#80ffdb", // 8679D9
    secondary: "#DDFCAD",
    error: "#ff595e",
    info: "#38AECC",
    success: "#8ac926",
    warning: "#ffca3a",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "customDark",
    themes: {
      customDark,
    },
  },
  defaults: {
    VCard: {
      color: "rgba(var(--v-theme-surface), 0.6)",
      flat: "true",
      rounded: "lg",
    },
    VChip: {
      label: "true",
    },
    VRow: {
      noGutters: true,
    },
    VTextField: {
      density: "compact",
      variant: "outlined",
    },
    VAvatar: {
      rounded: "0",
    },
    VAlert: {
      variant: "tonal",
      density: "compact",
    },
  },
});

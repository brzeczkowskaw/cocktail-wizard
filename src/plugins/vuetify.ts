import "vuetify/styles";
import * as components from "vuetify/labs/components";
import * as directives from "vuetify/directives";
import { createVuetify } from "vuetify";
import "@mdi/font/css/materialdesignicons.css";
import { fa } from "vuetify/iconsets/fa";

const defaultTheme = {
  dark: false,
  colors: {
    primary: "#3C0753",
    secondary: "#720455",
    tertiary: "#910A67",
    background: "#030637",
    cardBackground: "linear-gradient(to right, #070ff4, #f90a0a)",
  },
};

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "default",
    themes: {
      default: defaultTheme,
    },
  },
  icons: {
    defaultSet: "mdi",
    sets: {
      fa,
    },
  },
});

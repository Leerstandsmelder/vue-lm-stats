import "@mdi/font/css/materialdesignicons.css";
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

import colors from "vuetify/lib/util/colors";
export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#ED1C24", // #ED1C24
        secondary: colors.orange.lighten4, //  #FFCDD2
        accent: colors.orange.base, // #3F51B5
        error: "#D32F2F",
        info: "#2196F3",
        success: "#5ED5BA",
        warning: "#ED1C24"
      },
      dark: {
        primary: "#ED1C24", // #E53935
        secondary: colors.orange.lighten4, // #FFCDD2
        accent: colors.orange.base // #3F51B5
      }
    }
  },
  options: {
    customProperties: true
  }
});

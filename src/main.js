import Vue from 'vue'
import './plugins/axios'
import "./plugins/chartist";
import './registerServiceWorker'

import vuetify from './plugins/vuetify';
import api from "./utils/api.js";
import store from "./store";
import { setupInterceptors } from "./utils/httpInterceptors";
import router from './router'
import App from './App.vue'

import moment from "moment";

import { LMap, LTileLayer, LMarker, LCircleMarker, LTooltip, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import i18n from './i18n'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-circle-marker', LCircleMarker);
Vue.component('l-tooltip', LTooltip);
Vue.component('l-popup', LPopup);

Vue.prototype.$http = api;
Vue.prototype.$moment = moment;

Vue.config.productionTip = true
Vue.config.devtools = true

Vue.filter("formatDate", function(value, format = "YYYY-MM-DD") {
  if (value) {
    return moment(String(value)).format(format);
  }
});
Vue.filter("subString", function(string, length = "5") {
  return string.substring(0, length) + "...";
});



new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    setupInterceptors(store);
  }
}).$mount("#app");

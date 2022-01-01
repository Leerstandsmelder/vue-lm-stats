import Vue from 'vue'
import './plugins/axios'
import "./plugins/chartist";
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import api from "./utils/api.js";
import store from "./store";
import { setupInterceptors } from "./utils/httpInterceptors";

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

Vue.config.productionTip = false
Vue.config.devtools = false


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

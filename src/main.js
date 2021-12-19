import Vue from 'vue'
import './plugins/axios'
import "./plugins/chartist";
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { LMap, LTileLayer, LMarker, LCircleMarker, LTooltip, LPopup } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import i18n from './i18n'

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-circle-marker', LCircleMarker);
Vue.component('l-tooltip', LTooltip);
Vue.component('l-popup', LPopup);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')

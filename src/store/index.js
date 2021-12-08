import Vue from 'vue'
import Vuex from 'vuex'

import { region } from './modules/region';
import { regions } from './modules/regions';
import { locations } from './modules/locations';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    region,
    regions,
    locations
  }
})

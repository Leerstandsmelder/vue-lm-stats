import Vue from 'vue'
import Vuex from 'vuex'

import { loader } from './modules/loader';
import { auth } from './modules/auth';
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
    loader,
    auth,
    region,
    regions,
    locations
  }
})

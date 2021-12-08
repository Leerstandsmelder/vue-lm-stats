import api from "../../utils/api";

const baseDomain = process.env.VUE_APP_API_URL;


export const regions = {
  namespaced: true,
  state: {
    status: "",
    regions: {},
    active: null
  },
  mutations: {
    regions_request(state) {
      state.status = "loading";
    },
    regions_register(state, regions) {
      state.status = "registering";
      state.regions = regions;
    },

    regions_success(state, payload) {
      console.log('regions_success',payload.regions);

      state.status = "loaded";
      state.regions = payload.regions;
    },
    regions_error(state) {
      state.status = "error";
    },
    regions_logout(state) {
      state.status = "";
      state.regions = "";
      
    },
    loadLocalRegions(state) {
      if (localStorage.getItem("regions")) {
        state.regions = localStorage.getItem("regions");
        state.status = "restore";
      }
    },
    loadLocalActive(state) {
      if (localStorage.getItem("active")) {
        state.active = JSON.parse(localStorage.getItem("active"));
        console.log('loadLocalActive: state.active',state.active)
      } else {
        console.log('state.active',state.active)
      }
    },
  },
  actions: {
    load({
      dispatch,
      commit,
      state
    }) {
      console.log("load regions action", state.regions);
      commit("loadLocalRegions");
      commit("loadLocalActive");
      dispatch('set');
    },
    setActive({ commit }, data) {
      return new Promise((resolve) => {
        console.log("setActive", data);
        localStorage.setItem("active", JSON.stringify(data));
        resolve(commit("loadLocalActive"));
      });
      
    },
    set({ commit }, data) {
      console.log("set regions action", data);
      let url = `${baseDomain}/regions/`;
      return new Promise((resolve, reject) => {
        commit("regions_request");
        api({
          url: url,
          method: "GET"
        })
          .then(resp => {
            console.log("set regions resp", resp);
            this.state.regions = resp.data.results;
            
            localStorage.setItem("regions", resp.data.results);
            //localStorage.setItem("regionsData", resp.regionsData);
            commit("regions_success", {regions: resp.data.results});
            resolve(resp);
          })
          .catch(err => {
            console.log("regions_error catch", err.response);
            commit("regions_error");
            localStorage.removeItem("regions");
            reject(err);
          });
      });
    },
  },
  getters: {
    regionsStatus: state => state.status,
    getRegions: state => state.regions,
    getActive: state => state.active
  }
};

import api from "../../utils/api";

const baseDomain = process.env.VUE_APP_API_URL;


export const regions = {
  namespaced: true,
  state: {
    status: "",
    regions: {}
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
      // console.log('regions_success',payload.regions);

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
    clear(state) {
      state.status = "";
      state.regions = {};
    },

    loadLocalRegions(state) {
      if (localStorage.getItem("regions")) {
        state.regions = JSON.parse(localStorage.getItem("regions"));
        state.status = "restore";
      }
    }
  },
  actions: {
    load({
      dispatch,
      commit,
      state
    }) {
      commit("regions_request");
      // console.log("load regions action", state.regions);
      if (localStorage.getItem("regions")) {
        commit("loadLocalRegions");
      } else {
        dispatch('setRegions');
      }
      
    },
    setRegions({ commit }, data) {
      // console.log("set regions action", data);
      let url = `${baseDomain}/regions/`;
      return new Promise((resolve, reject) => {
        commit("regions_request");
        api({
          url: url,
          method: "GET"
        })
          .then(resp => {
            // console.log("set regions resp", resp);
            this.state.regions = resp.results;
            localStorage.setItem("regions", JSON.stringify(resp.results));
            commit("regions_success", {regions: resp.results});
            resolve(resp);
          })
          .catch(err => {
            // console.log("regions_error catch", err.response);
            commit("regions_error");
            localStorage.removeItem("regions");
            reject(err);
          });
      });
    },
    clear({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
            commit("clear");
            localStorage.removeItem("regions");
            dispatch('location/clear', null, { root: true });
            resolve("cleared");
      });
    }
  },
  getters: {
    regionsStatus: state => state.status,
    getRegions: state => state.regions,
    getActive: state => state.active
  }
};

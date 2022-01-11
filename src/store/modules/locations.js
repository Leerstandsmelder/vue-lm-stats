import api from "../../utils/api";
import _ from 'lodash';
import moment from "moment";

const baseDomain = process.env.VUE_APP_API_URL;

// helper function to get the month name from an item
const monthName = item => moment(item.created, 'YYYY-MM-DD').format('YYYY');


export const locations = {
  namespaced: true,
  state: {
    status: "",
    locations: {}
  },
  mutations: {
    locations_request(state) {
      state.status = "loading";
    },
    locations_register(state, locations) {
      state.status = "registering";
      state.locations = locations;
    },

    locations_success(state, payload) {
      //console.log('locations_success', payload.locations);

      state.status = "loaded";
      state.locations = payload.locations;      
    },
    locations_error(state) {
      state.status = "error";
    },
    clear(state) {
      state.status = "";
      state.locations = "";
      
    },
    loadLocalLocations(state) {
      if (localStorage.getItem("locations")) {
        state.locations = JSON.parse(localStorage.getItem("locations"));
        state.status = "restore";
        //console.log('locations from store',state.locations)
      }
    }
  },
  actions: {
    load({
      dispatch,
      commit,
      state
    }) {
      //console.log("load locations action", JSON.stringify(state.locations));
      if (localStorage.getItem("locations")) {
        commit("loadLocalLocations");
      } else {
        dispatch('set');
      }
       
    },
    set({ commit }, data) {
      //console.log("set locations action", this.state.region.regionId);
      if(this.state.region.regionId != "" && this.state.region.regionId != undefined) {
        let url = `${baseDomain}/regions/${this.state.region.regionId}/locations/`;
        return new Promise((resolve, reject) => {
          commit("locations_request");
          api({
            url: url,
            method: "GET"
          })
            .then(resp => {
              //console.log("set locations resp", resp);
              this.state.locations = resp.results;
              
              localStorage.setItem("locations", JSON.stringify(resp.results));
              commit("locations_success", {locations: resp.results});
              resolve(resp);
            })
            .catch(err => {
              commit("locations_error");
              localStorage.removeItem("locations");
              reject(err);
            });
        });
      }
    },
    clear({ commit }) {
      return new Promise((resolve, reject) => {
            commit("clear");
            localStorage.removeItem("locations");
            this.state.locations = {};
            resolve("LOGGED_OUT");
      });
    }
  },
  getters: {
    locationsStatus: state => state.status,
    getLocations: state => state.locations
  }
};

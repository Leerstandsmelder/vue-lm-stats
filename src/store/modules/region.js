import api from "../../utils/api";

const baseDomain = process.env.VUE_APP_API_URL;

export const region = {
  namespaced: true,
  state: {
    status: "",
    regionId:  "",
    regionData: "",
    region: {}
  },
  mutations: {

    request(state) {
      state.status = "loading";
    },
    success(state, payload) {
      // console.log('success',payload);
      state.status = "loaded";
      state.regionId = payload.regionId;
      state.regionData = payload.regionData;
    },
    error(state) {
      state.status = "error";
    },
    clear(state) {
      state.status = "";
      state.regionId = "";
      state.regionData = "";
      state.region = {};
    },
  },
  actions: {
    loadLocalRegion({state}) {
      // console.log('loadLocalRegion action',state);

      return new Promise((resolve, reject) => {
        if (localStorage.getItem("region")) {
          var region = JSON.parse(localStorage.getItem("region"));
          state.regionId = region.uuid;
          state.regionData = region;
          state.status = "restore";
          resolve(region); 
        } else {
          reject();
        }
      })
    },
    load({
      dispatch,
      commit,
      state
    }) {
      // console.log("load region action", state.regionId);
      if (localStorage.getItem("region")) {
        dispatch("loadLocalRegion").then(response => {
          // console.log("response", response);
          dispatch('locations/load', null, { root: true });
        });
      } else {
        dispatch('set', {uuid: state.regionId}).then(response => {
          
        });
      }
    },
    set({ dispatch, commit }, data) {
      // console.log("set region action", data);
      if(data.uuid != "" && data.uuid != undefined) {
        let url = `${baseDomain}/regions/${data.uuid}`;
        return new Promise((resolve, reject) => {
          commit("request");
          api({
            url: url,
            method: "GET"
          })
            .then(resp => {
              console.log("set region resp", resp);
              this.state.regionId = resp.uuid;
              this.state.regionData = resp;
              this.state.region = resp;
              localStorage.setItem("region", JSON.stringify(resp));
              commit("success", {regionId: resp.uuid, regionData: resp});
              dispatch('locations/set', null, { root: true });    
              resolve(resp);
            })
            .catch(err => {
              commit("error");
              localStorage.removeItem("region");
              reject(err);
            });
        });
      }
    },
    clear({ dispatch, commit }) {
      return new Promise((resolve, reject) => {
            commit("clear");
            localStorage.removeItem("region");
            dispatch('locations/clear', null, { root: true });    
            resolve("cleared");
      });
    }

  },
  getters: {
    regionStatus: state => state.status,
    getregionData: state => state.regionData,
    getregionId: state => state.regionId,
    getregion: state => state.region,
  }
};

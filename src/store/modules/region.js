import api from "../../utils/api";

const baseDomain = process.env.VUE_APP_API_URL;

export const region = {
  namespaced: true,
  state: {
    status: "",
    regionId: localStorage.getItem("regionId") || "",
    regionData: localStorage.getItem("regionData") || "",
    region: {}
  },
  mutations: {

    region_request(state) {
      state.status = "loading";
    },
    region_register(state, regionId) {
      state.status = "registering";
      state.regionId = regionId;
    },
    region_success(state, payload) {
      console.log('region_success',payload.regionId);
      
      console.log('region_success',payload.regionData);

      state.status = "loaded";
      state.regionId = payload.regionId;
      state.regionData = payload.regionData;
    },
    region_error(state) {
      state.status = "error";
    },
    region_logout(state) {
      state.status = "";
      state.regionId = "";
      state.regionData = "";
    },
    loadLocalregionId(state) {
      if (localStorage.getItem("regionId")) {
        state.regionId = localStorage.getItem("regionId");
        state.status = "restore";
      }
    },
  },
  actions: {
    load({
      dispatch,
      commit,
      state
    }) {
      console.log("load region action", state.regionId);
      commit("loadLocalregionId");
      dispatch('set', {uuid: state.regionId});
    },
    set({ dispatch, commit }, data) {
      console.log("set region action", data);
      // let select = {
      //   regionId: data.id,
      // };
      //let url = `${baseDomain}/auth/local`;
      let url = `${baseDomain}/regions/${data.uuid}`;
      return new Promise((resolve, reject) => {
        commit("region_request");
        api({
          //url: `${baseDomain}/api/Clients/login`,
          url: url,
          //data: select,
          method: "GET"
        })
          .then(resp => {
            console.log("set region resp", resp);
            this.state.regionId = resp.data.uuid;
            this.state.regionData = resp.data;
            this.state.region = resp;
            console.log('setregion', resp.data)
            localStorage.setItem("regionId", resp.data.uuid);
            //localStorage.setItem("regionData", resp.regionData);
            commit("region_success", {regionId: resp.data.uuid, regionData: resp.data});
            dispatch('locations/load', null, { root: true })
            resolve(resp);
          })
          .catch(err => {
            //console.log("login catch", err.response);
            commit("region_error");
            localStorage.removeItem("regionId");
            //localStorage.removeItem("regionData");
            reject(err);
          });
      });
    },
  },
  getters: {
    regionStatus: state => state.status,
    getregionData: state => state.regionData,
    getregionId: state => state.regionId,
    getregion: state => state.region,
  }
};

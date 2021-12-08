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
    locations: {},
    groupedLocations: {},
    groupedLocationsByDate: {},
    activeLocation: null
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
      console.log('locations_success',payload.locations);

      state.status = "loaded";
      state.locations = payload.locations;
      // this.chartTypeData.series.push(entry.count);
      //         this.chartTypeData.labels.push(entry.type);
      // state.groupedLocations = _.groupBy(payload.locations, 'buildingType').map(element => {
      //   state.groupedLocations['series'].push(element[0])
      // }) 
      
      
      var series = _.chain(payload.locations)
      // Group the elements of Array based on `color` property
      .groupBy("buildingType")
      // `key` is group's name (color), `value` is the array of objects
      .map((value, key) => ({ key }))
      .value();
      var grouped = _.groupBy(payload.locations,"buildingType");
      console.log('groupedLocations_success_1', labels);
      series = _.map(grouped, function(value, key) {
        
        return value.length;
      });
      var labels = _.map(grouped, function(value, key) {
        return key;
      });
      //_.chain(payload.locations)
      // Group the elements of Array based on `color` property
      
      // `key` is group's name (color), `value` is the array of objects
      //.map((value, key) => ({ value }))
      //.value();
      console.log('groupedLocations_success2', series);

      state.groupedLocations =  {
        labels: labels,
        series: series
      };




      var grouped_date = _.chain(payload.locations).groupBy( monthName)
      .mapValues(items => _.map(items, 'name'))
      .value()
       //_.groupBy(payload.locations,"created");
      console.log('groupedLocations_success_1', grouped_date);
      var series_date = _.map(grouped_date, function(value, key) {
        
        return value.length;
      });
      var labels_date = _.map(grouped_date, function(value, key) {
        return key;
      });
      //_.chain(payload.locations)
      // Group the elements of Array based on `color` property
      
      // `key` is group's name (color), `value` is the array of objects
      //.map((value, key) => ({ value }))
      //.value();
      console.log('groupedLocations_success2', series_date);

      state.groupedLocationsByDate =  {
        labels: labels_date,
        series: series_date
      };

      // {series: { data: ['1','2','3']}, labels: ['one','two','three']}

      console.log('groupedLocations_success', state.groupedLocations);
    },
    locations_grouped(state, payload) {

    },
    locations_error(state) {
      state.status = "error";
    },
    locations_logout(state) {
      state.status = "";
      state.locations = "";
      
    },
    loadLocalLocations(state) {
      if (localStorage.getItem("locations")) {
        state.locations = localStorage.getItem("locations");
        state.status = "restore";
      }
    },
    loadLocalActiveLocation(state) {
      if (localStorage.getItem("activeLocation")) {
        state.activeLocation = JSON.parse(localStorage.getItem("activeLocation"));
        console.log('loadLocalActiveLocation: state.activeLocation',state.activeLocation)
      } else {
        console.log('state.activeLocation',state.activeLocation)
      }
    },
  },
  actions: {
    load({
      dispatch,
      commit,
      state
    }) {
      console.log("load locations action", state.locations);
      commit("loadLocalLocations");
      commit("loadLocalActiveLocation");
      dispatch('set');
    },
    setActive({ commit }, data) {
      return new Promise((resolve) => {
        console.log("setActive", data);
        localStorage.setItem("activeLocation", JSON.stringify(data));
        resolve(commit("loadLocalActiveLocation"));
      });
      
    },
    set({ commit }, data) {
      console.log("set locations action", data);
      let url = `${baseDomain}/regions/${this.state.regionId}/locations/`;
      return new Promise((resolve, reject) => {
        commit("locations_request");
        api({
          url: url,
          method: "GET"
        })
          .then(resp => {
            console.log("set locations resp", resp);
            this.state.locations = resp.data.results;
            
            localStorage.setItem("locations", resp.data.results);
            //localStorage.setItem("locationsData", resp.locationsData);
            commit("locations_success", {locations: resp.data.results});
            resolve(resp);
          })
          .catch(err => {
            console.log("locations_error catch", err.response);
            commit("locations_error");
            localStorage.removeItem("locations");
            reject(err);
          });
      });
    },
  },
  getters: {
    locationsStatus: state => state.status,
    getLocations: state => state.locations,
    getGroupedLocations: state => state.groupedLocations,
    getGroupedLocationsByDate: state => state.groupedLocationsByDate,
    getActive: state => state.activeLocation
  }
};

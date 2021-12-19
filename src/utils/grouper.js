import Vue from 'vue'
import _ from 'lodash';
import i18n from "../i18n";


export default {
  groupByField(field, filter_array) {
    var grouped_data = _.chain(filter_array).groupBy( field )
      .mapValues(items => items)
      .value();
      grouped_data = _.pickBy(grouped_data, function(value, key) {
        return value.length > 5
      });
       console.log('groupedBY_1', grouped_data);
      var series_data = _.map(grouped_data, function(value, key) {
        return value.length;
      });
      var labels_data = _.map(grouped_data, function(value, key) {
          return i18n.t(key) +' ('+ value.length + ')';
        
      });
      //console.log('groupedByField', series_data, labels_data);
      return {
        labels: labels_data,
        series: series_data
      };
  },
  groupInBetween(locations, startDate, endDate) {
    //console.log('locations',locations);
    if(locations.length > 0) {
      var dated_locs = locations.filter((item) => {
        return new Date(item.created).getTime() >= new Date(startDate).getTime() &&
               new Date(item.updated).getTime() <= new Date(endDate).getTime();
        });
        //console.log('locations FILTERED',dated_locs);
      return dated_locs;
    }
    return locations;  
  }
};

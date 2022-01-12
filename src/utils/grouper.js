import Vue from 'vue'
import _ from 'lodash';
import i18n from "../i18n";


export default {
  groupByField(field, filter_array, min_threshold = 3) {
    var grouped_data = _.chain(filter_array).groupBy( field )
      .mapValues(items => items)
      .value();
      grouped_data = _.pickBy(grouped_data, function(value, key) {
        return value.length > min_threshold
      });
      var series_data = _.map(grouped_data, function(value, key) {
        return value.length;
      });
      var labels_data = _.map(grouped_data, function(value, key) {
          return i18n.t(key) +' ('+ value.length + ')';
        
      });
      return {
        labels: labels_data,
        series: series_data
      };
  },
  groupInBetween(locations, startDate, endDate, dateField) {
    if(locations.length > 0) {
      var dated_locs = locations.filter((item) => {
        return new Date(item[dateField]).getTime() >= new Date(startDate).getTime() &&
               new Date(item[dateField]).getTime() <= new Date(endDate).getTime();
        });
      return dated_locs;
    }
    return locations;  
  }
};

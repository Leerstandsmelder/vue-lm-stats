import _ from 'lodash';

export default {
  groupByField(field, filter_array) {
    var grouped_data = _.chain(filter_array).groupBy( field )
      .mapValues(items => _.map(items, 'name'))
      .value()
      // console.log('groupedBY_1', grouped_data);
      var series_data = _.map(grouped_data, function(value, key) {
        return value.length;
      });
      var labels_data = _.map(grouped_data, function(value, key) {
        return key +' ('+ value.length + ')';
      });
      //console.log('groupedByField', series_data, labels_data);
      return {
        labels: labels_data,
        series: series_data
      };
  },
  groupInBetween(locations, startDate, endDate) {
    //console.log('locations',locations);
      var dated_locs = locations.filter((item) => {
        return new Date(item.created).getTime() >= new Date(startDate).getTime() &&
               new Date(item.updated).getTime() <= new Date(endDate).getTime();
        });
        //console.log('locations FILTERED',dated_locs);
      return dated_locs;
  }
};

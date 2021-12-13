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
        return key;
      });
      // console.log('groupedBy_2', series_data, labels_data);
      return {
        labels: labels_data,
        series: series_data
      };
  }
};

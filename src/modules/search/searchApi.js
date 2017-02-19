/**
 * Created by Krtkoff on 18.02.2017.
 */
angular
  .module('app.search')
  .factory('searchApi', searchApi);

function searchApi($resource) {

  var endoPoint = 'https://api.skypicker.com';

  return {

    /**
     * Resource flights
     *
     * @param {object} params: flight params
     * @return {promise<object>} response
     */
    'flight': function (params) {
      if (params) {
        return $resource(endoPoint + '/flights', params).get();
      }
    },

    /**
     * Resource airport
     *
     * @param {object} params: airport params
     * @return {promise<array>} response
     */
    'places' : function (params) {
      if (params) {
        return $resource(endoPoint + '/places', params).query();
      }
    }
  }

}
/**
 * Created by Krtkoff on 18.02.2017.
 */

angular
  .module('app.search')
  .service('kiwiSearch', kiwiSearch)
  .filter('propsFilter', propsFilter);

function kiwiSearch(searchApi) {

  return {
    flight: findFlight,
    place : findPlace
  };


  /**
   * Function returning all flights:
   *
   * @param {string} params: flight params
   * @return {promise <array>} A promise to flight request.
   */
  function findFlight(params) {

    var flight = {
      flyFrom   : params.from.id,
      to        : params.destination.id,
      dateFrom  : params.dateFrom && formatDate(params.dateFrom),
      dateTo    : params.dateFrom && formatDate(params.dateFrom),
      returnFrom: params.dateBack && formatDate(params.dateBack),
      returnTo  : params.dateBack && formatDate(params.dateBack),
      v         : 2,
      locale    : 'cs'
    };

    return searchApi.flight(flight).$promise;

  }


  /**
   * Function returning all flights:
   *
   * @param {string} params: flight params
   * @return {promise <array>} A promise for places.
   */
  function findPlace(params) {
    var place = {
      term  : params.from || '',
      v     : 2,
      locale: 'cs'
    };

    return searchApi.places(place).$promise;

  }


  /**
   * Function returning required date format (DD/MM/YYYY):
   *
   * @param {object} date: comon date
   * @return {object} date: date in (DD/MM/YYYY) format
   */
  function formatDate(date) {
    var newDate = new Date(date);
    return [newDate.getDate(), newDate.getMonth() + 1, newDate.getFullYear()].join('/');
  }


}


function propsFilter() {

  /**
   * Filter provider: Filter for maching propertis in object
   *
   * @param {array} items array of objects wich will be filtered
   * @param {object} props object key/value for matching
   * @return {array} out filtered array
   */
  return function (items, props) {

    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function (item) {

        var itemMatches = false,
            keys        = Object.keys(props),
            prop,
            text;

        for (var i = 0; i < keys.length; i++) {
          prop = keys[i];
          text = props[prop].toLowerCase();

          if (item[prop] && item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    }
    else {
      out = items;
    }

    return out;
  };
}
/**
 * Created by Krtkoff on 18.02.2017.
 */

angular
  .module('app.search')
  .service('kiwiSearch', kiwiSearch);

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
      flyFrom   : params.from,
      to        : params.destination,
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
   * @param {string} term: flight params
   * @return {promise <array>} A promise for places.
   */
  function findPlace(term) {
    var place = {
      term  : term || '',
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
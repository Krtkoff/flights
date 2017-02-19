/**
 * Created by Krtkoff on 18.02.2017.
 */

angular
  .module('app')
  .controller('AppCtrl', AppCtrl);


function AppCtrl($scope, kiwiSearch) {

  // scope functions
  $scope.search       = search;
  $scope.autocomplete = autocomplete;

  // initialize objects for view
  $scope.searchParams = {
    from       : '',
    destination: '',
    dateFrom   : '',
    dateBack   : ''
  };

  $scope.results  = [];
  $scope.airports = [];

  allAirports();

  // watcher for automatic reaction on model change
  $scope.$watch('searchParams.from', search);
  $scope.$watch('searchParams.destination', search);
  $scope.$watch('searchParams.dateFrom', search);
  $scope.$watch('searchParams.dateBack', search);



  function search() {
    if ($scope.searchParams.from || $scope.searchParams.destination || $scope.searchParams.dateFrom || $scope.searchParams.dateBack) {
      kiwiSearch.flight($scope.searchParams).then(function (results) {
          $scope.results = results;
        },
        function (err) {
          console.log(err);
        });
    }
  }


  function autocomplete() {

    var form = $scope.flights;

    if (!form.$pristine) {
      kiwiSearch.place($scope.searchParams).then(function (results) {

          $scope.airports = results;
        },
        function (err) {
          console.log(err);
        });
    }
  }

  // helpers functions
  function allAirports() {
    kiwiSearch.place({}).then(function (results) {
        $scope.airports = results;
        $scope.selected = {value: $scope.airports[0]};

      },
      function (err) {
        console.log(err);
      });
  }

}
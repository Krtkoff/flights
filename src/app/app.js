/**
 * Created by Krtkoff on 18.02.2017.
 */

angular
  .module('app')
  .controller('AppCtrl', AppCtrl);


function AppCtrl($scope, kiwiSearch, $timeout) {

  var searchtime = null;

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

  $scope.results   = [];
  $scope.airports  = [];
  $scope.airportsD = []; //secund field because of different autocomplete optins

  // watcher for automatic reaction on model change
  $scope.$watch('searchParams.from', function (newValue) {
    autocomplete(newValue, 'from')
  });
  $scope.$watch('searchParams.destination', function (newValue) {
    autocomplete(newValue, 'destination')
  });
  $scope.$watch('searchParams.dateFrom', search);
  $scope.$watch('searchParams.dateBack', search);


  function search() {
    searchtime = $timeout(function () {
      if ($scope.searchParams.from || $scope.searchParams.destination || $scope.searchParams.dateFrom || $scope.searchParams.dateBack) {
        kiwiSearch.flight($scope.searchParams).then(function (results) {
            $scope.results = results;
          },
          function (err) {
            console.log(err);
          });
      }
    }, 1500);

  }


  function autocomplete(place, input) {

    var form = $scope.flights;

    if (!form.$pristine) {

      kiwiSearch.place(place).then(function (results) {
          if (input === 'from') {
            $scope.airports = results;
          }
          else if (input === 'destination') {
            $scope.airportsD = results;
          }

          //delayed search
          $timeout.cancel(searchtime);
          $scope.search();

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
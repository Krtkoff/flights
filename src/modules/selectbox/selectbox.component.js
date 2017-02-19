/**
 * Created by Krtkoff on 19.02.2017.
 */

angular
  .module('app.selectbox')
  .component('selectbox', {
    controller  : selectboxCtrl,
    controllerAs: 'selectCtrl',
    bindings    : {
      list       : '=',
      model      : '=',
      placeholder: '@'
    },
    template    : '<input placeholder="{{selectCtrl.placeholder}}" type="text" ng-model="selectCtrl.value" ng-value="selectCtrl.value"/>' +
    '<div class="autocomplete" ng-show="selectCtrl.visibility">' +
    '<ul>' +
    '<li ng-repeat="item in selectCtrl.list"  ng-click="selectCtrl.selectItem(item)" >{{item.value}}</li>' +
    '</ul>' +
    '</div>'
  });

function selectboxCtrl($scope, $window) {

  var that = this;

  //initialize
  this.visibility = true;
  this.value      = '';
  this.selected   = false;

  //on click event
  this.selectItem = function (item) {
    that.selected   = true;
    that.model      = item.id;
    that.visibility = false;
    that.value      = item.value;
  };

  // typiing watcher
  $scope.$watch('selectCtrl.value', function (newValue) {
    if (newValue !== '' && !that.selected) {
      that.model      = newValue;
      that.visibility = true;
    }
    that.selected = false;
  });

}
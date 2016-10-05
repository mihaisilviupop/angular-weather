'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$geolocation', function ($scope, $geolocation) {
    $geolocation.watchPosition({
      timeout: 60000,
      maximumAge: 250,
      enableHighAccuracy: true
    });
    $scope.myPosition = $geolocation.position; // this object updates regularly, it has 'error' property which is a 'truthy' and also 'code' and 'message' property if an error occurs

    // //It has all the location data 
    // '$scope.myPosition.coords'

    // //It's truthy and gets defined when error occurs 
    // '$scope.myPosition.error'
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    var latLng = {};

    function showPosition(position) {
      latLng = {
        'lat': position.coords.latitude,
        'lng': position.coords.longitude
      };
      $scope.location_address = latLng;
    }
    function showError(err) {
      console.log("err", err);
    }
  }]);
'use strict';

angular.module('myApp.view1', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .factory("Countries", function ($http) {
    return $http.get('countries.json');
  })

  .controller('View1Ctrl', ['$scope', '$http', 'Countries', function ($scope, $http, Countries) {
    var apiId = 'c170242baa576ba9cab6a1926c40e3fb';
    var url = 'http://api.openweathermap.org/data/2.5/';
    var units = "metric";
    var lang = "en";
    var latLng = {};
    $scope.selectedCountry = undefined;

    Countries.success(function (data) {
      $scope.countries = data;
      console.log($scope.countries, $scope.states);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        latLng = {
          'lat': position.coords.latitude,
          'lng': position.coords.longitude
        };
        url += "weather?" + "lat=" + latLng.lat + "&lon=" + latLng.lng + "&units=" + units + "&lang=" + lang + "&appid=" + apiId;
        $http.get(url).then(function (response) {
          $scope.weather = response.data;
          console.log($scope.weather);
        });
      }, function (err) {
        console.error("error", err);
      })
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    $scope.getWeatherForCountry = function (country) {
      //http://api.openweathermap.org/data/2.5/find?q=Romania&type=like&appid=c170242baa576ba9cab6a1926c40e3fb 
      url += "find?q=" + country + "&type=like" + "&units=" + units + "&lang=" + lang + "&appid=" + apiId;
      $http.get(url).then(function (response) {
        $scope.weather = response.data.list[0];
        console.log($scope.weather);
      });
    }

  }]);
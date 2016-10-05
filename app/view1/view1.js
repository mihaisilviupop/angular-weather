'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {
    var apiId = 'c170242baa576ba9cab6a1926c40e3fb';
    var url = 'http://api.openweathermap.org/data/2.5/weather?';
    var units = "metric";
    var lang = "en";
    var latLng = {};
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        latLng = {
          'lat': position.coords.latitude,
          'lng': position.coords.longitude
        };
        url += "lat=" + latLng.lat + "&lon=" + latLng.lng + "&units=" + units + "&lang=" + lang + "&appid=" + apiId;
        $http.get(url).then(function (response) {
          $scope.weather = response.data;
          console.log($scope.weather);
        });
      },
        function (err) {
          console.log("err", err);
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }]);
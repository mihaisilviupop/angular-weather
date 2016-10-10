'use strict';

angular.module('myApp.view1', ['ngRoute', 'ui.bootstrap'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl',
      controllerAs: 'vm'
    });
  }])

  .factory("Countries", function ($http) {
    return $http.get('countries.json');
  })

  .controller('View1Ctrl', ['$rootScope', '$scope', '$http', 'Countries', '$q', function ($rootScope, $scope, $http, Countries, $q) {
    class Configs {
      constructor() {
        this.url = 'http://api.openweathermap.org/data/2.5/';
        this.apiId = 'c170242baa576ba9cab6a1926c40e3fb';
        this.units = "metric";
        this.lang = "en";
      }
      getCurrentPosition() {
        var deferred = $q.defer();
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            deferred.resolve(position);
          }, function (error) {
            deferred.reject(error);
          });
        } else {
          deferred.reject("Geolocation is not supported by this browser.");
        }
        return deferred.promise;
      }
    }

    class OpenWeatherClass extends Configs {
      getWeatherForCountry(country) {
        var url = this.url;
        url += "find?q=" + country + "&type=like" + "&units=" + this.units + "&lang=" + this.lang + "&appid=" + this.apiId;
        $http.get(url).then((response) => {
          $scope.weather = response.data.list[0];
        });
      }

      getWeatherForLocation() {
        this.getCurrentPosition().then((position) => {
          var url = this.url;
          url += "weather?" + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&units=" + this.units + "&lang=" + this.lang + "&appid=" + this.apiId;
          $http.get(url).then((response) => {
            $scope.weather = response.data;
          });
        }, function (error) {
          console.error(error);
        })

      }
    }
    this.openWeather = new OpenWeatherClass();
    this.openWeather.getWeatherForLocation();
    $scope.selectedCountry = undefined;
    Countries.success(function (data) {
      $scope.countries = data;
    });
  }]);
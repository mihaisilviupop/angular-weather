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

  .controller('View1Ctrl', ['$rootScope', '$scope', '$http', 'Countries', function ($rootScope, $scope, $http, Countries) {
    $rootScope.position = {
      'latitude': undefined,
      'longitude': undefined
    };
    $rootScope.positionIsSet = false;
    // function setWatch() {
    $rootScope.$watch('positionIsSet', function (newValue, oldValue) {
      console.log("huuray", newValue, oldValue);
    });
    // }
    //  setWatch();
    class Configs {
      constructor() {
        this.url = 'http://api.openweathermap.org/data/2.5/';
        this.apiId = 'c170242baa576ba9cab6a1926c40e3fb';
        this.units = "metric";
        this.lang = "en";
      }
      getCurrentPosition() {
        var havePosition = false;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            $rootScope.position.latitude = position.coords.latitude;
            $rootScope.position.longitude = position.coords.longitude;
            console.log("getCurrentPosition", $rootScope.position, $rootScope.positionIsSet);
            $rootScope.positionIsSet = true;
            console.log("getCurrentPosition", $rootScope.position, $rootScope.positionIsSet);
          }, function (error) {
            console.error("error", err);
          })
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }
    }

    class OpenWeatherClass extends Configs {
      getWeatherForCountry(country) {
        this.url += "find?q=" + country + "&type=like" + "&units=" + this.units + "&lang=" + this.lang + "&appid=" + this.apiId;
        $http.get(this.url).then((response) => {
          $scope.weather = response.data.list[0];
        });
      }

      getWeatherForLocation() {
        this.getCurrentPosition()
        console.log("getWeatherForLocation", $rootScope.position);
        // this.url += "weather?" + "lat=" + this.position.latitude + "&lon=" + this.position.longitude + "&units=" + this.units + "&lang=" + this.lang + "&appid=" + this.apiId;
        // $http.get(this.url).then((response) => {
        //   $scope.weather = response.data;
        // });
      }
    }
 $rootScope.positionIsSet = true;
    this.openWeather = new OpenWeatherClass();

    this.openWeather.getWeatherForLocation();
    $scope.selectedCountry = undefined;
    Countries.success(function (data) {
      $scope.countries = data;
    });
  }]);
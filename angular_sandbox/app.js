// global app
var myApp = angular.module("myApp", ["ngRoute", "ngResource"]);


// ROUTES

myApp.config(function($routeProvider){

  $routeProvider

  .when("/", {
    templateUrl: "pages/home.html",
    controller: "homeController"
  })

  .when("/forecast",{
    templateUrl: "pages/forecast.html",
    controller: "forecastController"
  })

  .when("/forecast/:days",{
    templateUrl: "pages/forecast.html",
    controller: "forecastController"
  })

});

// SERVICES

myApp.service("cityService", function(){
  this.city = "London"
});


// CONTROLLERS

myApp.controller("homeController",["$scope", "cityService", function($scope, cityService){

  $scope.city = cityService.city;

  $scope.$watch("city", function(){
    cityService.city = $scope.city;
  });

}]);


myApp.controller("forecastController",["$scope", "$resource", "$routeParams", "cityService", function($scope, $resource, $routeParams, cityService){

  $scope.city = cityService.city;

  $scope.days = $routeParams.days || 2;

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=82d1227d08e956dedf44ebc823cf80a3", {callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});

  $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days});
}]);


// DIRECTIVES

myApp.directive("searchResult", function(){
  return {
    templateUrl: "directives/searchResult.html",
    replace: true,
    scope:{

    }
  }
})

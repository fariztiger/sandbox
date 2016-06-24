var myApp = angular.module("myApp", []);

myApp.controller("mainController", ["$scope", "$timeout", "$filter",  function($scope, $timeout, $filter){

  $scope.name = "bob";

  $scope.lowercaseName = function(){
    return $filter("lowercase")($scope.name);
  };

  $scope.characterLimit = 5;

}]);

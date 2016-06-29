angular.module("app",['ngStorage'])
.controller("main", ["$scope", "$localStorage", function($scope, $localStorage){

  // it cannot parse undefined. Needs to be initialized if undefined.
  if ($localStorage.stuff === undefined){
    $localStorage.stuff = JSON.stringify([]);
  };

  if ($localStorage.thing === undefined){
    $localStorage.thing = JSON.stringify("");
  };

  $scope.thing = JSON.parse($localStorage.thing);
  $scope.stuff = JSON.parse($localStorage.stuff);

  $scope.save = function(thing){
    // save to local
    var stuff = JSON.parse($localStorage.stuff);
    stuff.push(thing);
    $localStorage.stuff = JSON.stringify(stuff);
    $scope.stuff = JSON.parse($localStorage.stuff);

  };



}]);
;

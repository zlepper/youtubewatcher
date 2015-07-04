angular.module("youtubewatcher").controller("MainCtrl", ["$scope", ($scope) ->
  console.log "Main controller loaded"

  $scope.$watch("search", ->
    $scope.$emit("search:changed")
  , true);
])
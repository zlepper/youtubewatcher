angular.module("youtubewatcher").controller("channelController", ["$scope", "$stateParams", "$http", ($scope, $stateParams, $http) ->
  console.log "Channel controller loaded"
  console.log $stateParams
  $http.get("/data/channelstream/" + $stateParams.shortname)
    .success((data) ->
      console.log data
      $scope.videos = data;
    )
])
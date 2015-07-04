angular.module("youtubewatcher").controller("channelController", ["$scope", "$stateParams", ($scope, $stateParams) ->
  console.log "Channel controller loaded"
  console.log $stateParams
])
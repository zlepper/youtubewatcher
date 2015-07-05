angular.module("youtubewatcher").controller("playerCtrl",
  ["$scope", "$sce", "$stateParams", ($scope, $sce, $stateParams) ->
    console.log "Player ctrl loaded"
    youtubeUrl = "https://www.youtube.com/embed/" + $stateParams.id
    $scope.playerUrl = $sce.trustAsResourceUrl(youtubeUrl)
    console.log $scope.playerUrl
  ])
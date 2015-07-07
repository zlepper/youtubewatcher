angular.module("youtubewatcher").controller("frontpageController", ["$scope", "$http", "$state", ($scope, $http, $state) ->
  console.log "Frontpage controller loaded"
  $scope.videos
  $scope.outOfData = false
  $scope.results

  $scope.$watch("results", ->
    if($scope.results.length < 50)
      $scope.loadMore();
  )

  $scope.loadMore = ->
    if($scope.outOfData)
      return
    console.log "Loading More"
    $scope.outOfData = true
    if($scope.videos)
      $http.get("/data/mainstream/" + $scope.videos.length)
      .success((data) ->
        console.log data
        $scope.videos = $scope.videos.concat(data);
        $scope.outOfData = false
        console.log $scope.videos.length
      )
      .error( ->
        $scope.outOfData = true
      )
    else
      $http.get("/data/mainstream/0")
      .success((data) ->
        console.log data
        $scope.videos = data
        $scope.outOfData = false
      )

  $scope.playerHidden = true
  $scope.$on("$stateChangeSuccess", ->
    $scope.playerHidden = !$state.is("frontpage.video")
  )

])
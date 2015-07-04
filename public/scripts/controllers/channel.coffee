

angular.module("youtubewatcher").controller("channelController", ["$scope", "$stateParams", "$http", ($scope, $stateParams, $http) ->
  console.log "Channel controller loaded"
  console.log $stateParams
  $scope.outOfData = false

  $scope.loadMore = ->
    if($scope.outOfData)
      return
    console.log "Loading More"
    $scope.outOfData = true
    if($scope.videos)
      $http.get("/data/channelstream/" + $stateParams.shortname + "/" + $scope.videos.length)
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
      $http.get("/data/channelstream/" + $stateParams.shortname + "/0")
        .success((data) ->
          console.log data
          $scope.videos = data
          $scope.outOfData = false
        )
])
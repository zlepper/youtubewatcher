angular.module("youtubewatcher").controller("frontpageController", ["$scope", "$http", ($scope, $http) ->
  console.log "Frontpage controller loaded"
  $scope.videos

  $http.get("/data/mainstream")
    .success((data) ->
      console.log data
      data.forEach((v) ->
        v.publishedAt = new Date(v.publishedAt);
      )
      $scope.videos = data
    )
    .error( (data, status, headers, config) ->
      console.log data
    )
])
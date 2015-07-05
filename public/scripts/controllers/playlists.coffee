angular.module("youtubewatcher").controller("playlistsController", ["$scope", "$http", "$state", ($scope, $http, $state) ->
  console.log "Playlist controller loaded"

  $http.get("/data/playlists")
    .success((data) ->
      console.log data
      $scope.playlists = data
    )

  $scope.changeState = (id) ->
    for i in [0...$scope.playlists.length]
      if $scope.playlists[i].id is id
        play = $scope.playlists[i]
    if play.videos.length <= 5
      $http.get("/data/playlists/" + id)
        .success((data) ->
          console.log data
          play.videos = data.reverse()
        )
    else
      play.videos = play.videos.slice(0,5)


  $scope.playerHidden = true
  $scope.$on("$stateChangeSuccess", ->
    $scope.playerHidden = !$state.is("playlists.video")
  )
])
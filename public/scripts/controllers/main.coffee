angular.module("youtubewatcher").controller("MainCtrl", ["$scope", "$state", "$animate", ($scope, $state, $animate) ->
  $scope.state = $state
  $scope.search = {}
  $scope.$watch("search", ->
    $scope.$emit("search:changed")
  , true);
  $scope.resetNavigation = ->
    if $state.is("frontpage.video")
      $state.go "frontpage"
    else if $state.is("channel.video")
      $state.go "channel", shortname: $state.params.shortname
    else if $state.is("playlists.video")
      $state.go "playlists"
  $scope.disableanimations = false
  $scope.$watch("disableanimations", ->
    console.log "Doing something to animations"
    $animate.enabled(!$scope.disableanimations)
  , true)

])
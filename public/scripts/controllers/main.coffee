angular.module("youtubewatcher").controller("MainCtrl", ["$scope", "$state", ($scope, $state) ->
  $scope.state = $state
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
])
angular.module("youtubewatcher", ["ui.router", "ngAnimate", "infinite-scroll"]).config([
  "$stateProvider", "$urlRouterProvider", "$locationProvider",  ($stateProvider, $urlRouterProvider, $locationProvider) ->
    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise("frontpage")
    $stateProvider.state("frontpage",
      url: "/frontpage"
      templateUrl: "/partials/frontpage"
      controller: "frontpageController"
    )
    .state("channel",
      url: "/channel/:shortname"
      templateUrl: "/partials/channel"
      controller: "channelController"
    )
    .state("playlists",
      url: "/playlists"
      templateUrl: "/partials/playlists"
      controller: "playlistsController"
    )
    .state("frontpage.video",
      url: "/:id"
      templateUrl: "/partials/player"
      controller: "playerCtrl"
    )
    .state("channel.video",
      url: "/:id"
      templateUrl: "/partials/player"
      controller: "playerCtrl"
    )
    .state("playlists.video",
      url: "/:id"
      templateUrl: "/partials/player"
      controller: "playerCtrl"
    )
])


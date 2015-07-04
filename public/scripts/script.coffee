angular.module("youtubewatcher", ["ui.router", "ngAnimate"]).config([
  "$stateProvider", "$urlRouterProvider", "$locationProvider",  ($stateProvider, $urlRouterProvider, $locationProvider) ->
    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise("frontpage")
    $stateProvider.state("frontpage",
      url: "/frontpage",
      templateUrl: "/partials/frontpage",
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
    .state("about",
      url: "/about"
      templateUrl: "/partials/about"
      #controller: "/aboutController"
    )
])


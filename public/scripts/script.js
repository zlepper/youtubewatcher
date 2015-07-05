// Generated by CoffeeScript 1.9.2
(function() {
  angular.module("youtubewatcher", ["ui.router", "ngAnimate", "infinite-scroll"]).config([
    "$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise("frontpage");
      return $stateProvider.state("frontpage", {
        url: "/frontpage",
        templateUrl: "/partials/frontpage",
        controller: "frontpageController"
      }).state("channel", {
        url: "/channel/:shortname",
        templateUrl: "/partials/channel",
        controller: "channelController"
      }).state("playlists", {
        url: "/playlists",
        templateUrl: "/partials/playlists",
        controller: "playlistsController"
      }).state("frontpage.video", {
        url: "/:id",
        templateUrl: "/partials/player",
        controller: "playerCtrl"
      }).state("channel.video", {
        url: "/:id",
        templateUrl: "/partials/player",
        controller: "playerCtrl"
      }).state("playlists.video", {
        url: "/:id",
        templateUrl: "/partials/player",
        controller: "playerCtrl"
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=script.js.map

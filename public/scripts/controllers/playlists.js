// Generated by CoffeeScript 1.9.2
(function() {
  angular.module("youtubewatcher").controller("playlistsController", [
    "$scope", "$http", "$state", function($scope, $http, $state) {
      console.log("Playlist controller loaded");
      $scope.search = {
        title: ""
      };
      $http.get("/data/playlists").success(function(data) {
        console.log(data);
        return $scope.playlists = data;
      });
      $scope.changeState = function(id) {
        var i, j, play, ref;
        for (i = j = 0, ref = $scope.playlists.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
          if ($scope.playlists[i].id === id) {
            play = $scope.playlists[i];
          }
        }
        if (play.videos.length <= 5) {
          return $http.get("/data/playlists/" + id).success(function(data) {
            console.log(data);
            return play.videos = data.reverse();
          });
        } else {
          return play.videos = play.videos.slice(0, 5);
        }
      };
      $scope.$parent.$watch("search", function(newValue, oldValue) {
        return $scope.search.title = newValue;
      });
      $scope.playerHidden = true;
      return $scope.$on("$stateChangeSuccess", function() {
        return $scope.playerHidden = !$state.is("playlists.video");
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=playlists.js.map

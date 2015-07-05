// Generated by CoffeeScript 1.9.2
(function() {
  angular.module("youtubewatcher").controller("channelController", [
    "$scope", "$stateParams", "$http", "$state", function($scope, $stateParams, $http, $state) {
      console.log("Channel controller loaded");
      console.log($stateParams);
      $scope.outOfData = false;
      $scope.loadMore = function() {
        if ($scope.outOfData) {
          return;
        }
        console.log("Loading More");
        $scope.outOfData = true;
        if ($scope.videos) {
          return $http.get("/data/channelstream/" + $stateParams.shortname + "/" + $scope.videos.length).success(function(data) {
            console.log(data);
            $scope.videos = $scope.videos.concat(data);
            $scope.outOfData = false;
            return console.log($scope.videos.length);
          }).error(function() {
            return $scope.outOfData = true;
          });
        } else {
          return $http.get("/data/channelstream/" + $stateParams.shortname + "/0").success(function(data) {
            console.log(data);
            $scope.videos = data;
            return $scope.outOfData = false;
          });
        }
      };
      $scope.playerHidden = true;
      return $scope.$on("$stateChangeSuccess", function() {
        return $scope.playerHidden = !$state.is("channel.video");
      });
    }
  ]);

}).call(this);

//# sourceMappingURL=channel.js.map

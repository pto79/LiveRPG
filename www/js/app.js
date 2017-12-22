// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('main', function($scope, $ionicPlatform, $cordovaGeolocation, $interval) {
  $scope.direction = "test";
  var lastLat = "";
  var lastLong = "";

  var getGPS = function() {

    $ionicPlatform.ready(function() {

      var posOptions = {timeout: 30000, enableHighAccuracy: false};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          console.log(position);
          var lat  = position.coords.latitude;
          var long = position.coords.longitude;
          lat = Math.floor(lat*100000);
          long = Math.floor(long*100000);
          //alert(position.coords.heading);
          if(lastLat != "" && lastLong != "")
          {
            if((lat == lastLat) && (long > lastLong)) //north
              $scope.direction = "east";
            else if((lat == lastLat) && (long < lastLong)) //south
              $scope.direction = "west";
            else if((long == lastLong) && (lat > lastLat)) //south
              $scope.direction = "north";
            else if((long == lastLong) && (lat < lastLat)) //south
              $scope.direction = "south";
            else if((lat > lastLat) && (long > lastLong)) //south
              $scope.direction = "northeast";
            else if((lat > lastLat) && (long < lastLong)) //south
              $scope.direction = "northwest";
            else if((lat < lastLat) && (long > lastLong)) //south
              $scope.direction = "southeast";
            else if((lat < lastLat) && (long < lastLong)) //south
              $scope.direction = "southwest";
            else if((lat == lastLat) && (long == lastLong)) //south
              $scope.direction = "stopping";
            $scope.direction = "stopping";
          }
          
          lastLat = lat;
          lastLong = long;
        }, function(err) {
          // error
          //alert('error');
        });
    })
  }
/*
  var watchOptions = {
    timeout : 3000,
    enableHighAccuracy: false // may cause errors if true
  };

  var watch = $cordovaGeolocation.watchPosition(watchOptions);
  watch.then(
    null,
    function(err) {
      // error
      $scope.gps = "gps fail";
    },
    function(position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      $scope.gps = position.timestamp;
  });  
*/
  //$interval(getGPS, 2000);

});

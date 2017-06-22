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
  $scope.gps = "test";

  var getGPS = function() {

$ionicPlatform.ready(function() {

  var posOptions = {timeout: 30000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      //alert(position.coords.heading);
      $scope.gps = position.coords.heading;
    }, function(err) {
      // error
      //alert('error');
    });
/*
  var watchOptions = {
    timeout : 30000,
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
      $scope.gps = position.coords.heading;
  });
*/
  })
}

  $interval(getGPS, 3000);

});

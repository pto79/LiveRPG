// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var heading = "test";
var showing = false;

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
.controller('main', function($scope, $ionicPlatform, $cordovaGeolocation, $interval, $ionicPopup, $ionicModal) {
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
              heading = "east";
            else if((lat == lastLat) && (long < lastLong)) //south
              heading = "west";
            else if((long == lastLong) && (lat > lastLat)) //south
              heading = "north";
            else if((long == lastLong) && (lat < lastLat)) //south
              heading = "south";
            else if((lat > lastLat) && (long > lastLong)) //south
              heading = "northeast";
            else if((lat > lastLat) && (long < lastLong)) //south
              heading = "northwest";
            else if((lat < lastLat) && (long > lastLong)) //south
              heading = "southeast";
            else if((lat < lastLat) && (long < lastLong)) //south
              heading = "southwest";
            else if((lat == lastLat) && (long == lastLong)) //south
              heading = "stopping";
            heading = "stopping";
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

    $ionicModal.fromTemplateUrl('templates/modal_new.html', {
        id: '1', // We need to use and ID to identify the modal that is firing the event!
        scope: $scope,
        backdropClickToClose: false,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModalNew = modal;
    });

    $scope.showModal = function(name) {
      if(!showing) {
        showing = true;
        $scope.objname = name;
        $scope.oModalNew.show();
      }
    }    
    $scope.hideModal = function() {
      showing = false;
      $scope.oModalNew.hide();
    }


    $scope.items = [
      {
          id: "63", 
          name: "basket",
          image: "img/basket.jpg"
      },
      {
          id: "64", 
          name: "tree",
          image: "img/tree.jpg"
      }
    ]
});

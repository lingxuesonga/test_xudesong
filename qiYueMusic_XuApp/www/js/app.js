// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'musicapp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'musicapp.services' is found in services.js
// 'musicapp.controllers' is found in controllers.js
angular.module('musicapp', ['ionic',
  'angularMoment',
  'angularSoundManager',
  'musicapp.controllers',
  'musicapp.services',
  'musicapp.factorys',
   'musicapp.routes'
])

.run(function($ionicPlatform, $rootScope, $state, $ionicModal) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $rootScope.isIOS = ionic.Platform.isIOS();
    $rootScope.isAndroid = ionic.Platform.isAndroid();

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });


  // Variables and functions for the music player

  $rootScope.currentTrack = null;
  $rootScope.currentTrackDetails = null;
  $rootScope.musicPlaying = false;
  $rootScope.musicPlayer = {};


  /**以下是个知识点
   * $ionicModal是完整的页面；
   * $ionicPopup是(Dialog)对话框样式的，直接用JavaScript设定对话框的一些参数，通常用于通知消息、确认等作用；
   * 播放页面 接收music id 并且传递到MusicModalCtrl中
   * **/
  $rootScope.createModal = function(i, trackId){

    if(!$rootScope.musicPlayer.album){
      $rootScope.musicPlayer.title = $rootScope.musicPlayer.playlist[i].title.label;
    }else{
      $rootScope.musicPlayer.title = $rootScope.musicPlayer.playlist[i].trackName;
    }

    $rootScope.musicPlayer.trackId = trackId;

    $ionicModal.fromTemplateUrl('templates/music-modal.html', {
      scope: $rootScope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $rootScope.modal = modal;
      $rootScope.openModal();
    });
  }

  $rootScope.openModal = function() {
    $rootScope.modal.show();
  };
  $rootScope.closeModal = function() {
    $rootScope.modal.hide();
  };


  $rootScope.hasFooter = function(){
    if($rootScope.musicPlaying){
      return 'has-footer'
    }
  }
})



/**
 创建日期： 2016/5/10.
 创建人：徐德松
 */
angular.module('musicapp.controllers',
                 [
                   'musicapp.homeController',
                   'musicapp.musicController',
                   'musicapp.teamworkController',
                   'musicapp.albumController',
                   'musicapp.activityController',
                 ])

//此为弹出播放窗口的controller  Ionic中[弹出式窗口]有两种（如下图所示），ionicModal和ionicModal和ionicPopup;
.controller('MusicModalCtrl', function($scope, $rootScope, $stateParams, $ionicSlideBoxDelegate, $ionicHistory, MusicFac){
  var trackId = $rootScope.musicPlayer.trackId;

  $scope.playTrack = function(track){

      if($rootScope.currentTrack != track.trackId){
        //Create New Sound
        $rootScope.musicPlayer.trackPosition = 0;
        $rootScope.musicPlayer.trackRange = 0;
        soundManager.destroySound($rootScope.currentTrack);

       //创建一个声音对象
        $rootScope.mySound = soundManager.createSound({
            id: track.trackId.toString(),
            url: track.previewUrl,
            //url: 'http://www.freshly-ground.com/data/audio/binaural/Mak.mp3',
            autoLoad: true,
            autoPlay: true,
            stream: true,

            //监听声音加载
            onload: function(){

            },
            onplay: function() {
              $rootScope.currentTrack = this.id;
              $rootScope.currentTrackDetails = track;
              $rootScope.musicPlaying = true;

            },
            onpause: function(){
              $rootScope.musicPlaying = false;
            },
            //进度条
            whileplaying: function() {
              $rootScope.musicPlayer.trackRange = Math.round((this.position / this.duration) * 100);
              $rootScope.musicPlayer.trackPosition = this.position;
              $rootScope.musicPlayer.trackDuration= this.duration;
              console.log(" $rootScope.mySound.duration声音的大小"+ $rootScope.mySound.duration);
              $rootScope.$apply();
            },
           //监听播放结束
            onfinish: function() {

              if($rootScope.activeSlide >= ($rootScope.musicPlayer.playlist.length -1) ){
                $rootScope.activeSlide = 0;
                $rootScope.$apply();
              }else{
                $rootScope.activeSlide = $rootScope.activeSlide + 1;
                $rootScope.$apply();
              }

            },
            volume: 90
          });

      }else{
        //Track already playing

      }
    }

    $scope.slideHasChanged = function(i){

      $rootScope.activeSlide = i;

      $rootScope.mySound.pause();

      if(!$rootScope.musicPlayer.album){
        var trackId = $rootScope.musicPlayer.playlist[i].id.attributes['im:id'];
        $rootScope.musicPlayer.title = $rootScope.musicPlayer.playlist[i].title.label;
      }else{
        var trackId = $rootScope.musicPlayer.playlist[i].trackId;
        $rootScope.musicPlayer.title = $rootScope.musicPlayer.playlist[i].trackName;
      }

      MusicFac.lookup(trackId).then(function(data){
        console.log(data);
        $scope.track = data.results[0];
        $scope.playTrack($scope.track);
        console.log( $scope.track);
      })
    }

    $scope.nextTrack = function(){

      if($rootScope.activeSlide >= ($rootScope.musicPlayer.playlist.length -1) ){
        $rootScope.activeSlide = 0;
      }else{
        $rootScope.activeSlide = $rootScope.activeSlide + 1;
      }

    }

    $scope.prevTrack = function(){

      if($rootScope.activeSlide <=0){
        $rootScope.activeSlide = ($rootScope.musicPlayer.playlist.length -1);
      }else{
        $rootScope.activeSlide = $rootScope.activeSlide - 1;
      }

    }

    $scope.playPause = function(){
      if($rootScope.musicPlaying){
        $rootScope.mySound.pause();
        $rootScope.musicPlaying = false;
      }else{
        $rootScope.mySound.play();
        $rootScope.musicPlaying = true;
      }
    }

    $scope.setPosition = function(val){
      var toVal = (val / 100) * $rootScope.musicPlayer.trackDuration;
      $rootScope.musicPlayer.trackPosition = toVal;
      soundManager.setPosition($rootScope.currentTrack, toVal);
    }

    $scope.getTrackDetails = function(){
      $rootScope.activeSlide = $rootScope.musicPlayer.index;
      MusicFac.lookup(trackId).then(function(data){
        $scope.track = data.results[0];
        $scope.playTrack($scope.track)
      })
    }

    $scope.getTrackDetails();


})



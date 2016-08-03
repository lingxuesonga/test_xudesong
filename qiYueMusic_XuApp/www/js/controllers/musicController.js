/****************************
 * 说明：music 所有controller
 * 创建时间：2016-5-13
 * 创建人：徐德松
 * **************************/
angular.module('musicapp.musicController', [])
  //音乐列表
  .controller('MusicCtrl', function($scope, $rootScope, $filter, MusicFac) {

    MusicFac.topSongs().then(function(data){
      console.log(data.feed.entry);
      $scope.filtered = $filter('orderBy')(data.feed.entry, 'title.label');//依照26个字母排序
      console.log($scope.filtered );
    });
    console.log($scope.filtered );


    //接收view 传递过来的music id
    $scope.setAudio = function(i, trackId){
      $rootScope.musicPlayer.playlist = $scope.filtered;
      $rootScope.musicPlayer.index = i;
      $rootScope.musicPlayer.album = false;
      //把 music id 传递给 播放页面
      $rootScope.createModal(i, trackId);
    }

  })

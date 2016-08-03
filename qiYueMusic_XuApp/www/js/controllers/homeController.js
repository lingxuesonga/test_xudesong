/****************************
 * 说明：首页 所有controller
 * 创建时间：2016-5-13
 * 创建人：徐德松
 * **************************/
angular.module('musicapp.homeController', [])
  //首页 展示
  .controller('HomeCtrl', function($scope, $rootScope, $filter, MusicFac,Base64ImgFactory) {

    //base64 图片解码
    $scope.featured = Base64ImgFactory.getBase64Img();

    MusicFac.topAlbums().then(function(data){
      $scope.topAlbums = data.feed.entry;
      console.log(data);
      console.log(data.feed.entry);
      console.log($scope.topAlbums);
    })

    MusicFac.topSongs().then(function(data){
      $scope.topSongs = data.feed.entry;
    })
    console.log($scope.topSongs);
    //接收view 传递过来的music id
    $scope.setAudio = function(i, trackId){
      $rootScope.musicPlayer.playlist = $scope.topSongs;
      $rootScope.musicPlayer.index = i;
      $rootScope.musicPlayer.album = false;
      //把 music id 传递给 播放页面
      $rootScope.createModal(i, trackId);
    }

  })
//唱片集 列表
.controller('AlbumDetailCtrl', function($scope, $rootScope, $stateParams, $state, $filter, MusicFac){
  var albumId = $stateParams.albumId;

  MusicFac.lookup(albumId).then(function(data){
    $scope.album = data.results[0];
  })

  MusicFac.lookupSongs(albumId).then(function(data){
    $scope.tracks = data.results;

    //Remove first track from iTunes result that is not a song.
    $scope.tracks.shift();
  })

  $scope.lookup = function(id, url, i){
    if(url){
      //$state.go('tab.new-detail', {trackId: id});
      $rootScope.musicPlayer.playlist = $scope.tracks;
      $rootScope.musicPlayer.index = i;
      $rootScope.musicPlayer.album = true;

      $rootScope.createModal(i, id);
    }
  }

})

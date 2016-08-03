/**
 * 说明：路由
 * 创建日期：2016/5/11.
 * 创建人：徐德松
 */
angular.module('musicapp.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // 容器
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      //首页
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'templates/tab-home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      // 词曲歌
      .state('tab.music', {
        url: '/music',
        views: {
          'tab-music': {
            templateUrl: 'templates/tab-music.html',
            controller: 'MusicCtrl'
          }
        }
      })
      //合伙
      .state('tab.teamwork', {
        url: '/teamwork',
        views: {
          'tab-teamwork': {
            templateUrl: 'templates/tab-teamwork.html',
            controller: 'teamworkCtrl'
          }
        }
      })
      //歌单
      .state('tab.album', {
        url: '/album',
        views: {
          'tab-album': {
            templateUrl: 'templates/tab-album.html',
            controller: 'albumCtrl'
          }
        }
      })
      //活动
      .state('tab.activity', {
        url: '/activity',
        views: {
          'tab-activity': {
            templateUrl: 'templates/tab-activity.html',
            controller: 'activityCtrl'
          }
        }
      })

      //唱片集 列表
      .state('tab.home-album-detail', {
        url: '/new/album/:albumId',
        views: {
          'tab-home': {
            templateUrl: 'templates/album-detail.html',
            controller: 'AlbumDetailCtrl'
          }
        }
      })

      .state('tab.music-detail', {
        url: '/music/:trackId',
        views: {
          'tab-music': {
            templateUrl: 'templates/music-detail.html',
            controller: 'MusicDetailCtrl'
          }
        }
      })


      .state('tab.home-detail', {
        url: '/home/:trackId',
        views: {
          'tab-home': {
            templateUrl: 'templates/music-detail.html',
            controller: 'MusicDetailCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/home');


  });

'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, PlayerFactory) {

  // load our initial data
  $http.get('/api/albums/')
  .then(res => $http.get('/api/albums/' + res.data[1]._id)) // temp: use first
  .then(res => res.data)
  .then(album => {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function (song, i) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      song.albumIndex = i;
    });
    // album.totalTime = StatsFactory.totalTime(album);
    // StatsFactory.totalTime(album)
    // .then(function(time){
    //   album.totalTime = time;
    // });

    $scope.album = album;
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  // main toggle

  $scope.toggle = function (song) {
    console.log(song);
    if (PlayerFactory.playing && PlayerFactory.currentSong === song) PlayerFactory.pause();
    else PlayerFactory.start(song, $scope.album.songs);
  };

  $scope.PlayerFactory = PlayerFactory;

  // $scope.toggle = function (song) {
  //   if ($scope.playing && song === $scope.currentSong) {
  //     $rootScope.$broadcast('pause');
  //   } else $rootScope.$broadcast('play', song);
  // };

  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // };

  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; };

  // // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // };
  // function next () { skip(1); };
  // function prev () { skip(-1); };

});

// juke.factory('StatsFactory', function ($q) {
//     var statsObj = {};
//     statsObj.totalTime = function (album) {
//         var audio = document.createElement('audio');
//         return $q(function (resolve, reject) {
//             var sum = 0;
//             var n = 0;
//             function resolveOrRecur () {
//                 if (n >= album.songs.length) resolve(sum);
//                 else audio.src = album.songs[n++].audioUrl;
//             }
//             audio.addEventListener('loadedmetadata', function () {
//                 sum += audio.duration;
//                 resolveOrRecur();
//             });
//             resolveOrRecur();
//         });
//     };
//     return statsObj;
// });

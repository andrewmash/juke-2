'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var playerObj = {};

  playerObj.audio = document.createElement('audio');
  playerObj.audio.addEventListener('ended', playerObj.next);
  playerObj.audio.addEventListener('timeupdate', function () {
    playerObj.progress = playerObj.audio.currentTime / playerObj.audio.duration;
  });

  playerObj.playing = false;
  playerObj.currentSong = null;
  playerObj.songList = [];
  playerObj.progress = 0;

  playerObj.start = function(song, songList) {
  	playerObj.currentSong = song;
  	playerObj.songList = songList;
  	playerObj.pause();
  	playerObj.audio.src = song.audioUrl;
  	playerObj.audio.load();
  	playerObj.audio.play();
  	playerObj.playing = true;
  };

  playerObj.pause = function() {
  	playerObj.audio.pause();
  	playerObj.playing = false;
  };

  playerObj.resume = function() {
  	playerObj.audio.play();
  	playerObj.playing = true;
  };

  playerObj.isPlaying = function() {
  	return playerObj.playing;
  };

  playerObj.getCurrentSong = function() {
  	return playerObj.currentSong;
  };

  playerObj.next = function() {
  	var currentIndex = 0;
  	playerObj.songList.forEach(function(song, index) {
  		if (song.audioUrl === playerObj.currentSong.audioUrl) currentIndex = index;
  	});
  	if (currentIndex < playerObj.songList.length - 1) currentIndex++;
  	else currentIndex = 0;
  	playerObj.start(playerObj.songList[currentIndex], playerObj.songList);
  };

  playerObj.previous = function() {
  	var currentIndex = 0;
  	playerObj.songList.forEach(function(song, index) {
  		if (song.audioUrl === playerObj.currentSong.audioUrl) currentIndex = index;
  	});
  	if (currentIndex > 0) currentIndex--;
  	else currentIndex = playerObj.songList.length - 1;
  	playerObj.start(playerObj.songList[currentIndex], playerObj.songList);
  };

  playerObj.getProgress = function() {
  	return playerObj.progress;
  };

  return playerObj;
});

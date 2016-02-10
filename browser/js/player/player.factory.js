'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
	var audio = document.createElement('audio');
	var songPlaying = false;
	var currentSongObj = null;
	var nextSongObj;
	var prevSongObj;
	var songList;
	var currentProgress = 0;
	setInterval(function(){
		console.log(currentProgress);
	}, 500);

Number.prototype.mod = function(n) { return ((this%n)+n)%n; };


	var playerObj = {

	currentSongObj: currentSongObj,
	nextSongObj: nextSongObj,
	prevSongObj: prevSongObj,
	songList: songList,



	start: function (songObj, songs) { //play
		if (songPlaying) { //checking if song is playing. if yes, pause it then start the other song
			this.pause();
		}
		if (songs) {
			songList = songs;		
			var nextSongIndex = songList.indexOf(songObj) + 1;
			var prevSongIndex = songList.indexOf(songObj) - 1;
			nextSongObj = songList[nextSongIndex.mod(songList.length)];
			console.log(nextSongObj);
			prevSongObj = songList[prevSongIndex.mod(songList.length)];
		}
		audio.src = songObj.audioUrl;
		audio.load();
		audio.addEventListener('timeupdate', function(){
			playerObj.getProgress();
			$rootScope.$digest();
		});
		audio.play();
		songPlaying = true;
		currentSongObj = songObj;
	},

	pause: function () { //pause
		// audio.load();
		audio.pause();
		songPlaying = false;
	},

	resume: function () { //resume
		audio.play();
		songPlaying = true;
	},

	isPlaying: function () { //returns boolean
		return songPlaying;
	},

	getCurrentSong: function () {
		return currentSongObj;
	},

	next: function () {
		console.log(songList);
		playerObj.start(nextSongObj, songList);
	},

	previous: function () {
		playerObj.start(prevSongObj, songList);
	},	

	getProgress: function () {
		
		if (!currentSongObj) {
			return currentProgress;
		} else {
			currentProgress = audio.currentTime/audio.duration;
			return currentProgress;
		}
	}

	// getProgress = function() {
	//     if (isNaN(audio.duration)) {
	//       return 0;
	//     } else {
	//       return audio.currentTime / audio.duration;
	//     }
	};
 	
 	return playerObj;
});

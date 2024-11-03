const songs = [
  { title: "Song 1", artist: "Artist 1", file: "song1.mp3" },
  { title: "Song 2", artist: "Artist 2", file: "song2.mp3" },
  { title: "Song 3", artist: "Artist 3", file: "song3.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const audioPlayer = document.getElementById("audioPlayer");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const playPauseButton = document.getElementById("playPauseButton");
const progressBar = document.getElementById("progressBar");

document.getElementById("playPauseButton").addEventListener("click", togglePlayPause);
document.getElementById("prevButton").addEventListener("click", playPreviousSong);
document.getElementById("nextButton").addEventListener("click", playNextSong);
document.getElementById("shuffleButton").addEventListener("click", toggleShuffle);
document.getElementById("repeatButton").addEventListener("click", toggleRepeat);
audioPlayer.addEventListener("ended", handleSongEnd);
audioPlayer.addEventListener("timeupdate", updateProgressBar);

function loadSong(songIndex) {
  const song = songs[songIndex];
  audioPlayer.src = song.file;
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
}

function togglePlayPause() {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseButton.textContent = "Play";
  } else {
    audioPlayer.play();
    playPauseButton.textContent = "Pause";
  }
  isPlaying = !isPlaying;
}

function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
  playPauseButton.textContent = "Pause";
  isPlaying = true;
}

function playNextSong() {
  if (isShuffle) {
    currentSongIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
  }
  loadSong(currentSongIndex);
  audioPlayer.play();
  playPauseButton.textContent = "Pause";
  isPlaying = true;
}

function toggleShuffle() {
  isShuffle = !isShuffle;
  document.getElementById("shuffleButton").textContent = isShuffle ? "Shuffle: On" : "Shuffle: Off";
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  document.getElementById("repeatButton").textContent = isRepeat ? "Repeat: On" : "Repeat: Off";
}

function handleSongEnd() {
  if (isRepeat) {
    audioPlayer.play();
  } else {
    playNextSong();
  }
}

function updateProgressBar() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress || 0;
}

progressBar.addEventListener("input", () => {
  audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

// Load the initial song
loadSong(currentSongIndex);

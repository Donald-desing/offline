document.getElementById("musicFiles").addEventListener("change", loadSongs);
document.getElementById("repeat").addEventListener("click", toggleRepeat);
document.getElementById("shuffle").addEventListener("click", toggleShuffle);
document.getElementById("next").addEventListener("click", playNextSong);
document.getElementById("prev").addEventListener("click", playPreviousSong);

const audioPlayer = document.getElementById("audioPlayer");
const songList = document.getElementById("songList");

let songs = [];
let currentIndex = 0;
let isRepeating = false;
let isShuffling = false;

function loadSongs(event) {
  const files = event.target.files;
  songs = Array.from(files);
  displaySongs();
}

function displaySongs() {
  songList.innerHTML = "";
  songs.forEach((song, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = song.name;
    listItem.addEventListener("click", () => playSong(index));
    songList.appendChild(listItem);
  });
}

function playSong(index) {
  currentIndex = index;
  const song = songs[currentIndex];
  const songURL = URL.createObjectURL(song);
  audioPlayer.src = songURL;
  document.getElementById("songName").textContent = song.name;
  audioPlayer.play();
}

function playNextSong() {
  if (isShuffling) {
    currentIndex = Math.floor(Math.random() * songs.length);
  } else {
    currentIndex = (currentIndex + 1) % songs.length;
  }
  playSong(currentIndex);
}

function playPreviousSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(currentIndex);
}

function toggleRepeat() {
  isRepeating = !isRepeating;
  document.getElementById("repeat").classList.toggle("active", isRepeating);
}

function toggleShuffle() {
  isShuffling = !isShuffling;
  document.getElementById("shuffle").classList.toggle("active", isShuffling);
}

// Automatically play the next song when the current one ends
audioPlayer.addEventListener("ended", () => {
  if (isRepeating) {
    playSong(currentIndex);
  } else {
    playNextSong();
  }
});

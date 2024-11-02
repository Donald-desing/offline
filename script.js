document.getElementById("musicFiles").addEventListener("change", loadSongs);
document.getElementById("createPlaylist").addEventListener("click", createPlaylist);
document.getElementById("playlistSelect").addEventListener("change", loadPlaylistSongs);
document.getElementById("addToPlaylist").addEventListener("click", addToPlaylist);
document.getElementById("repeat").addEventListener("click", toggleRepeat);
document.getElementById("shuffle").addEventListener("click", toggleShuffle);
document.getElementById("next").addEventListener("click", playNextSong);
document.getElementById("prev").addEventListener("click", playPreviousSong);

const audioPlayer = document.getElementById("audioPlayer");
const songList = document.getElementById("songList");

let playlists = {};  // Object to store playlists with song arrays
let currentPlaylist = 'Default';
let currentIndex = 0;
let isRepeating = false;
let isShuffling = false;

function createPlaylist() {
  const playlistName = document.getElementById("playlistNameInput").value.trim();
  if (playlistName && !playlists[playlistName]) {
    playlists[playlistName] = [];
    const option = document.createElement("option");
    option.value = playlistName;
    option.textContent = playlistName;
    document.getElementById("playlistSelect").appendChild(option);
    document.getElementById("playlistNameInput").value = '';
  }
}

function loadSongs(event) {
  const files = event.target.files;
  const songs = Array.from(files);
  playlists[currentPlaylist] = playlists[currentPlaylist].concat(songs);
  displaySongs(playlists[currentPlaylist]);
}

function displaySongs(songs) {
  songList.innerHTML = "";
  songs.forEach((song, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = song.name;
    listItem.addEventListener("click", () => playSong(index));
    songList.appendChild(listItem);
  });
}

function addToPlaylist() {
  const files = document.getElementById("musicFiles").files;
  const songs = Array.from(files);
  playlists[currentPlaylist] = playlists[currentPlaylist].concat(songs);
  displaySongs(playlists[currentPlaylist]);
}

function loadPlaylistSongs() {
  currentPlaylist = document.getElementById("playlistSelect").value;
  displaySongs(playlists[currentPlaylist] || []);
}

function playSong(index) {
  currentIndex = index;
  const song = playlists[currentPlaylist][currentIndex];
  const songURL = URL.createObjectURL(song);
  audioPlayer.src = songURL;
  document.getElementById("songName").textContent = song.name;
  audioPlayer.play();
}

function playNextSong() {
  if (isShuffling) {
    currentIndex = Math.floor(Math.random() * playlists[currentPlaylist].length);
  } else {
    currentIndex = (currentIndex + 1) % playlists[currentPlaylist].length;
  }
  playSong(currentIndex);
}

function playPreviousSong() {
  currentIndex = (currentIndex - 1 + playlists[currentPlaylist].length) % playlists[currentPlaylist].length;
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

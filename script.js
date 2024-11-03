let songs = [
  { id: 1, title: "Song 1", artist: "Artist 1", file: "song1.mp3" },
  { id: 2, title: "Song 2", artist: "Artist 2", file: "song2.mp3" }
];

let playlist = [];
let currentSongIndex = 0;
const audioPlayer = document.getElementById("audioPlayer");

window.onload = function() {
  loadSongLibrary();
  document.getElementById("addToPlaylistButton").addEventListener("click", addSelectedSongsToPlaylist);
  if (document.getElementById("playlistSongs")) loadPlaylist();
};

function loadSongLibrary() {
  const songList = document.getElementById("songList");
  songList.innerHTML = "";
  songs.forEach(song => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="song-checkbox" data-song-id="${song.id}">
      ${song.title} - ${song.artist}
    `;
    songList.appendChild(li);
  });
}

function addNewSong() {
  const title = prompt("Enter song title:");
  const artist = prompt("Enter artist name:");
  const file = prompt("Enter song file name:");
  if (title && artist && file) {
    const newSong = { id: songs.length + 1, title, artist, file };
    songs.push(newSong);
    loadSongLibrary();
  }
}

function addSelectedSongsToPlaylist() {
  const selectedSongs = document.querySelectorAll(".song-checkbox:checked");
  selectedSongs.forEach(checkbox => {
    const songId = parseInt(checkbox.getAttribute("data-song-id"));
    const song = songs.find(s => s.id === songId);
    if (!playlist.includes(song)) {
      playlist.push(song);
    }
  });
  savePlaylist();
  alert("Songs added to playlist!");
}

function savePlaylist() {
  localStorage.setItem("playlist", JSON.stringify(playlist));
}

function loadPlaylist() {
  const playlistSongs = document.getElementById("playlistSongs");
  const storedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
  playlistSongs.innerHTML = "";
  storedPlaylist.forEach((song, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${song.title} - ${song.artist}
      <button onclick="removeFromPlaylist(${index})">Remove</button>
      <button onclick="playSong(${index})">Play</button>
    `;
    playlistSongs.appendChild(li);
  });
}

function removeFromPlaylist(index) {
  const storedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
  storedPlaylist.splice(index, 1);
  localStorage.setItem("playlist", JSON.stringify(storedPlaylist));
  loadPlaylist();
}

function playSong(index) {
  const storedPlaylist = JSON.parse(localStorage.getItem("playlist")) || [];
  currentSongIndex = index;
  loadSongDetails(storedPlaylist[currentSongIndex]);
}

function loadSongDetails(song) {
  if (song) {
    document.getElementById("songDetails").innerText = `${song.title} - ${song.artist}`;
    audioPlayer.src = song.file;
    audioPlayer.play();
  }
}

function playPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSongDetails(playlist[currentSongIndex]);
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSongDetails(playlist[currentSongIndex]);
}

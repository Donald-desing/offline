const playlists = {};  // Store playlists with their respective songs
const songLibrary = [
  // Example songs; in a real scenario, this will be populated from the main song library
  { name: "Song 1", file: "song1.mp3" },
  { name: "Song 2", file: "song2.mp3" },
  { name: "Song 3", file: "song3.mp3" }
];

document.getElementById("createPlaylist").addEventListener("click", createPlaylist);
document.getElementById("addSelectedSongs").addEventListener("click", addSongsToPlaylist);
document.getElementById("playlistSelect").addEventListener("change", displayPlaylistSongs);

// Load songs into the song selection list on the playlist page
window.addEventListener("load", loadSelectableSongs);

function createPlaylist() {
  const playlistName = document.getElementById("newPlaylistName").value.trim();
  if (playlistName && !playlists[playlistName]) {
    playlists[playlistName] = [];
    const option = document.createElement("option");
    option.value = playlistName;
    option.textContent = playlistName;
    document.getElementById("playlistSelect").appendChild(option);
    document.getElementById("newPlaylistName").value = '';
  }
}

function loadSelectableSongs() {
  const selectableSongsList = document.getElementById("selectableSongs");
  selectableSongsList.innerHTML = "";
  songLibrary.forEach((song, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = song.name;
    listItem.dataset.index = index;
    listItem.addEventListener("click", () => toggleSongSelection(listItem));
    selectableSongsList.appendChild(listItem);
  });
}

function toggleSongSelection(listItem) {
  listItem.classList.toggle("selected");
}

function addSongsToPlaylist() {
  const selectedPlaylist = document.getElementById("playlistSelect").value;
  if (!selectedPlaylist) return;

  const selectedSongs = Array.from(document.querySelectorAll(".song-selection .selected"));
  selectedSongs.forEach(item => {
    const songIndex = item.dataset.index;
    const song = songLibrary[songIndex];
    if (!playlists[selectedPlaylist].includes(song)) {
      playlists[selectedPlaylist].push(song);
    }
  });

  displayPlaylistSongs(); // Refresh the playlist view
  selectedSongs.forEach(item => item.classList.remove("selected"));
}

function displayPlaylistSongs() {
  const selectedPlaylist = document.getElementById("playlistSelect").value;
  const playlistSongsList = document.getElementById("playlistSongs");
  playlistSongsList.innerHTML = "";

  if (selectedPlaylist && playlists[selectedPlaylist]) {
    playlists[selectedPlaylist].forEach((song, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = song.name;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => removeSongFromPlaylist(selectedPlaylist, index));

      listItem.appendChild(removeButton);
      playlistSongsList.appendChild(listItem);
    });
  }
}

function removeSongFromPlaylist(playlistName, songIndex) {
  playlists[playlistName].splice(songIndex, 1); // Remove song from playlist array
  displayPlaylistSongs(); // Refresh the playlist view
}

const songs = [
  { id: 1, title: "Song 1", artist: "Artist 1", file: "song1.mp3" },
  { id: 2, title: "Song 2", artist: "Artist 2", file: "song2.mp3" },
  { id: 3, title: "Song 3", artist: "Artist 3", file: "song3.mp3" }
];

const playlist = [];

window.onload = function() {
  loadSongLibrary();
  document.getElementById("addToPlaylistButton").addEventListener("click", addSelectedSongsToPlaylist);
};

// Function to load the song library
function loadSongLibrary() {
  const songList = document.getElementById("songList");
  songList.innerHTML = "";

  songs.forEach(song => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" class="song-checkbox" data-song-id="${song.id}">
      <span>${song.title} - ${song.artist}</span>
    `;
    songList.appendChild(li);
  });
}

// Function to add selected songs to the playlist
function addSelectedSongsToPlaylist() {
  const selectedSongs = document.querySelectorAll(".song-checkbox:checked");
  
  selectedSongs.forEach(checkbox => {
    const songId = parseInt(checkbox.getAttribute("data-song-id"));
    const song = songs.find(s => s.id === songId);
    
    if (!playlist.includes(song)) {
      playlist.push(song);
    }
  });
  
  alert("Selected songs added to the playlist!");
  console.log("Current Playlist:", playlist);
}

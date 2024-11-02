document.getElementById("musicFiles").addEventListener("change", loadSongs);
const audioPlayer = document.getElementById("audioPlayer");
const songList = document.getElementById("songList");

let songs = [];

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
  const song = songs[index];
  const songURL = URL.createObjectURL(song);
  audioPlayer.src = songURL;
  document.getElementById("songName").textContent = song.name;
  audioPlayer.play();
}

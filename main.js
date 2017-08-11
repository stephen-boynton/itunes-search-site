
//============= Globals ================================
let searchTerm = "";
let url = "";
let explicit = "no";
const results = document.querySelector(".results");
const form = document.querySelector(".search-form");
const urlBase = `https://itunes.apple.com/search?term=`;
const urlEnd = `&media=music&limit=20`
form.addEventListener("submit", appRun);
let destroy = false;
let previewURL = [];
let audioArray = [];

function returnURL (str) {
  url = urlBase + str + urlEnd;
  return url;
}

function getSongs (url) {
  fetch(url).then(function (data) {
    return data.json();
  }).then(function(data) {
    console.log(data);
    return data;
  }).then(buildSongs);
}

function buildSong(song, counter) {
  const div = document.createElement("div");
  previewURL.push(song.previewUrl);
  div.className = "song";
  div.innerHTML = `<img src= ${song.artworkUrl100}>
  <img src=img/playbtn.png class='playbtn' id='p${counter}'>
  <h3>${song.trackName}</h3>
  <h4>${song.artistName}</h4>`;
  results.appendChild(div);
  div.addEventListener("click", playSong);
}

function buildSongs(library) {
  let songs = library.results;
  let counter = 0;
  for (let i = 0; i < songs.length; i++) {
    buildSong(songs[i], counter);
    counter++;
   }
   populatePreviews();
}

function populatePreviews () {
  audioArray = new Array(19);
  for (let i = 0; i < audioArray.length; i++) {
    audioArray[i] = ['p' + i.toString(), previewURL[i]]
   }
}

function playSong (event) {
  const audio = document.querySelector("audio")
  let targetSong = event.target.id;
  for (let i = 0; i < audioArray.length; i++) {
    if (audioArray[i][0] == targetSong) audio.setAttribute("src", audioArray[i][1]);
  }
}

function destroySite() {
	let songArr = document.querySelectorAll(".song");
	for (let i = 0; i < songArr.length; i++) {
		let song = document.querySelector(".song");
		results.removeChild(song);
	}
  previewURL = [];
  audioArray = [];
}

function appRun (event) {
  event.preventDefault();
  if(destroy === true) destroySite();
  searchTerm = event.target[0].value;
  returnURL(searchTerm);
  getSongs(url);
  event.target[0].value = ""
  destroy = true;
}

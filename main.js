/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

// DON'T FORGET TO ENCODE TO URL LANG
//=========================================================================
/*
===============data names==========================
- artworkUrl100 - thumbnail
-trackName - track name

===============Seach types==========================
- https://itunes.apple.com/search?term= - the beginning key
- term - search term
-&media=music - limited to music
-&limit=20 - limited to 20 results
-&explicit=yes or no - give the option

*/

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
const previewURL = [];
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
  console.log(songs);
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
   console.log(audioArray);
}

function playSong (event) {
  const audio = document.querySelector("audio")
  let targetSong = event.target.id;
  console.log(targetSong);
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
}

function appRun (event) {
  event.preventDefault();
  if(destroy === true) destroySite();
  searchTerm = event.target[0].value;
  returnURL(searchTerm);
  console.log(url);
  getSongs(url);
  event.target[0].value = ""
  destroy = true;
}

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
let searchTerm = "jack johnson";
let explicit = "no";
const url = `https:\/\/itunes.apple.com/search?term=${searchTerm}&media=music&${explicit}&limit=20`;
const form = document.querySelector(".search-form");

form.addEventListener("submit", beginSearch)

function getSongs (url) {
  fetch(url).then(function (data) {
    return data.json();
  }).then(function(data) {
    console.log(data);
  })
}

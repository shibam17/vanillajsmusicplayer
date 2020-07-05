let songs = [
  {
    title: "faint.mp3",
    image: "./img/bg-1.jpg",
  },
  {
    title: "guilty.mp3",
    image: "./img/bg-2.jpg",
  },
  {
    title: "numb.mp3",
    image: "./img/bg-3.jpg",
  },
];

const imageCard = document.querySelectorAll("img");
const buttons = document.querySelector("#button");
const songTitle = document.querySelector("#songTitle");
const playPause = document.querySelector("#play .fas");
const fillBar = document.querySelector("#fill");
const volControl = document.querySelector("#vol-control");

let Song = new Audio();
window.onload = playSong;

let currentSong = 0;

//functions---------------------------------------------------------------

function playSong() {
  Song.src = songs[currentSong].title;
  Song.play();
  songTitle.textContent = songs[currentSong].title.slice(0, -4).toUpperCase();
}

function nextMode() {
  currentSong++;
  if (currentSong > 2) {
    currentSong = 0;
  }
  imageCard.forEach((img) => {
    img.src = songs[currentSong].image;
  });
  playSong();
  playMode();
}

function prevMode() {

  currentSong --;
  if(currentSong < 0){
    currentSong = 2;
  }
  imageCard.forEach((img) => {
        img.src = songs[currentSong].image;
      });
      playSong();
      playMode();
}

function playMode() {
  if (!Song.paused) {
    Song.pause();
    playPause.classList.remove("fa-pause");
    playPause.classList.add("fa-play");
  } else {
    Song.play();
    playPause.classList.remove("fa-play");
    playPause.classList.add("fa-pause");
  }
}

function increaseDecrease(checkID) {
  if (checkID === "voldown") {
    Song.volume -= 0.2;
  }
  if (checkID === "volup") {
    Song.volume += 0.2;
  }
}

function muteVol() {
  let isMuted = Song.muted;
  if (isMuted == false) {
    Song.muted = true;
  } else {
    Song.muted = false;
  }
}

//event listeners-------------------------------------------------------------------

buttons.addEventListener("click", (event) => {
  const checkID = event.target.id;
  switch (checkID) {
    case "prev":
      prevMode();
      break;
    case "next":
      nextMode();
      break;
    case "play":
      playMode();
      break;
  }
});

fillBar.addEventListener(
  "timeupdate",
  (Song.ontimeupdate = function () {
    let filler = (100 / Song.duration) * Song.currentTime;
    fillBar.style.width = filler + "%";
  })
);

volControl.addEventListener("click", (e) => {
  const checkID = e.target.id;
  if (checkID === "volmute") {
    muteVol();
  }
  increaseDecrease(checkID);
});

// var seekBar = document.getElementById("seek-bar");

// function scrub(e){
// 			const scrubTime =(e.offsetX / seekBar.offsetWidth) * song.duration;
// 			song.currentTime = scrubTime
// 			console.log(e);
// 		}

// fillBar.addEventListener('click',scrub);

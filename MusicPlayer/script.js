const musicContainer = document.querySelector("#music-container");

const playBtn = document.querySelector("#play")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")

const audio = document.querySelector("#audio")
const progress = document.querySelector("#progress")
const progressContainer = document.querySelector("#progress-container")
const title = document.querySelector("#title")
const cover = document.querySelector("#cover")

// Song Titles
const songs = ["Skin to Bone" ,"Numb", "Valentine's Day", ]

// Keep track of songs
let songIndex = 2

// Initialy load song details into DOM
  loadSong(songs[songIndex])

//   update song details
function loadSong(song){
    title.innerText = song
    audio.src = `music/${song}.mp3`
    cover.src = `images/${song}.jpg`
}

// PlaySong
function playSong(){
    musicContainer.classList.add("play")
    playBtn.querySelector("i.fas").classList.remove("fa-play")
    playBtn.querySelector("i.fas").classList.add("fa-pause")

    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove("play")
    playBtn.querySelector("i.fas").classList.remove("fa-pasue")
    playBtn.querySelector("i.fas").classList.add("fa-play")

    audio.pause()
}

// Prev song
function prevSong(){
    songIndex--

    if(songIndex < 0){
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex])
    playSong()
}

// next song
function nextSong(){
    songIndex++

    if(songIndex > songs.length - 1){
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}

// update progressBar
function updateProgress(e){
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) *100
   progress.style.width = `${progressPercent}%`
}

// Set Progress Bar 
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
  
    audio.currentTime = (clickX / width) * duration;
  }


// Eventlstners of bottuns
playBtn.addEventListener("click", ()=>{
    const isPlaying = musicContainer.classList.contains("play")
    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})




// change songs
prevBtn.addEventListener("click", prevSong)
nextBtn.addEventListener("click", nextSong)

// Time /Songs update
audio.addEventListener("timeupdate", updateProgress)

// click on progress Bar 
progressContainer.addEventListener("click", setProgress)

// Song ends 
audio.addEventListener("ended", nextSong)
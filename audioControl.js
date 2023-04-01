const audio = document.getElementById("background-audio");
const playBtn = document.getElementById("play-btn");
const muteUnmuteBtn = document.getElementById("mute-unmute-btn");
const volumeSlider = document.getElementById("volume-slider");

// Event listener for play button
playBtn.addEventListener("click", () => {
  audio.play();
  playBtn.style.display = "none";
});

// Event listener for mute-unmute button
muteUnmuteBtn.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    muteUnmuteBtn.innerText = "Mute";
  } else {
    audio.muted = true;
    muteUnmuteBtn.innerText = "Unmute";
  }
});

// Event listener for volume slider
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});
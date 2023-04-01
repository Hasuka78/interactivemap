const audio = document.getElementById("background-audio");
const muteUnmuteBtn = document.getElementById("mute-unmute-btn");
const volumeSlider = document.getElementById("volume-slider");

// Event listener for mute-unmute button
muteUnmuteBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    muteUnmuteBtn.innerText = "Mute";
  } else {
    audio.pause();
    muteUnmuteBtn.innerText = "Unmute";
  }
});

// Event listener for volume slider
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});
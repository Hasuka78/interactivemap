const playButtons = document.querySelectorAll(".play-btn");
const muteUnmuteButton = document.getElementById("mute-unmute-btn");
const volumeSlider = document.getElementById("volume-slider");
const audioElements = document.querySelectorAll("audio");

// Set initial volume of audio elements to match the volume slider value
audioElements.forEach((audio) => {
  audio.volume = volumeSlider.value;
});
let currentAudio = null;

playButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const audioId = button.getAttribute("data-audio");
    const audio = document.getElementById(audioId);

    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    currentAudio = audio;
  });
});

muteUnmuteButton.addEventListener("click", () => {
  if (currentAudio) {
    currentAudio.muted = !currentAudio.muted;
    muteUnmuteButton.innerText = currentAudio.muted ? "Unmute" : "Mute";
  }
});

// Add this event listener for the volume slider
volumeSlider.addEventListener("input", () => {
  if (currentAudio) {
    currentAudio.volume = volumeSlider.value;
  }
});
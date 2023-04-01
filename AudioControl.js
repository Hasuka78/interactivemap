const audioElement = document.getElementById("background-audio");
const muteUnmuteBtn = document.getElementById("mute-unmute-btn");
const volumeSlider = document.getElementById("volume-slider");

// Initially mute the audio
audioElement.muted = true;
muteUnmuteBtn.textContent = "Unmute";

// Toggle mute/unmute on button click and start playing if needed
muteUnmuteBtn.addEventListener("click", () => {
    if (audioElement.paused) {
        audioElement.play();
    }
    audioElement.muted = !audioElement.muted;
    muteUnmuteBtn.textContent = audioElement.muted ? "Unmute" : "Mute";
});

// Update volume based on the slider value
volumeSlider.addEventListener("input", () => {
    audioElement.volume = volumeSlider.value;
});

// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
// const play_button = document.querySelector('.player__button')
const sliders = player.querySelectorAll('.player__slider');
// const skip_buttons = player.querySelectorAll('.player__button')
const skipButtons = player.querySelectorAll('[data-skip]');

//Build our functions
function togglePlay() {
  // const method = video.paused ? 'play' : 'pause';
  // video[method]();
  if(video.paused) {
    video.play()
  } else {
    video.pause()
  }
};

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
};

function skip() {
  video.currentTime += parseFloat(this.dataset.skip); // that's a string so we need to parse that with parseFloat
};

function handleRangeUpdate() {
  video[this.name] = this.value;
};

function handleProgress() {
  // console.log('hello')
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
};

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
  // console.log(event)
};

function fullScreen() {
  // console.log(this.width)
  // this.fullScreen

}

// Hook up the event listeners

video.addEventListener( 'click', togglePlay);
video.addEventListener( 'play', updateButton);
video.addEventListener( 'pause', updateButton);
toggle.addEventListener( 'click', togglePlay);

skipButtons.forEach(button => button.addEventListener( 'click', skip));

sliders.forEach(slider => slider.addEventListener( 'change', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (event) =>  mousedown && scrub(event));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

video.addEventListener('click', fullScreen)



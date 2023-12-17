let timer;
let isCountdown = true;
let timeRemaining = 0;
let changecolor = document.getElementById("timer");

const minutesInput = document.createElement('input');
minutesInput.type = 'number';
minutesInput.placeholder = 'Minutes';
minutesInput.min = '0';
minutesInput.value = '0';

const secondsInput = document.createElement('input');
secondsInput.type = 'number';
secondsInput.placeholder = 'Seconds';
secondsInput.min = '0';
secondsInput.max = '59';
secondsInput.value = '0';

document.body.insertBefore(minutesInput, document.getElementById('controls'));
document.body.insertBefore(secondsInput, document.getElementById('controls'));

function startCountdown() {
  const minutes = parseInt(minutesInput.value, 10);
  const seconds = parseInt(secondsInput.value, 10);

  if (isNaN(minutes) || isNaN(seconds)) {
    alert('Please enter valid values for minutes and seconds.');
    return;
  }
  changecolor.style.color = 'greenyellow';
  timeRemaining = minutes * 60 + seconds;

  if (timeRemaining <= 0) {
    alert('Please enter a non-zero value for the timer.');
    return;
  }

  isCountdown = true;

  timer = setInterval(function () {
    const minutesRemaining = Math.floor(timeRemaining / 60);
    const secondsRemaining = timeRemaining % 60;

    document.getElementById('timer').innerText =
      `${String(minutesRemaining).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;

    if (timeRemaining === 0) {
      clearInterval(timer);
      var audio = new Audio('school-bell.mp3');
      audio.play();
      changecolor.style.color = 'red';
      isCountdown = false;
      startStopwatch();
    } else {
      timeRemaining--;

      // Change timer color to red after countdown stops
      if (!isCountdown) {
        document.getElementById('timer').classList.remove('countdown');
        document.getElementById('timer').classList.add('stopwatch');
      }
    }
  }, 1000);
}

function startStopwatch() {
  timeRemaining = 0;

  clearInterval(timer);

  timer = setInterval(function () {
    const minutesElapsed = Math.floor(timeRemaining / 60);
    const secondsElapsed = timeRemaining % 60;

    document.getElementById('timer').innerText =
      `${String(minutesElapsed).padStart(2, '0')}:${String(secondsElapsed).padStart(2, '0')}`;

    timeRemaining++;
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  document.getElementById('timer').innerText = '00:00';
  minutesInput.value = '0';
  secondsInput.value = '0';
  timeRemaining = 0;
  isCountdown = true;

  // Reset timer color to black
  document.getElementById('timer').classList.remove('stopwatch');
  document.getElementById('timer').classList.add('countdown');
}

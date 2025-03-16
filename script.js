let isRunning = false;
let isPomodoro = true; // Track if the timer is running for Pomodoro or break time
let timerInterval;
let pomodoroTime = 25 * 60; // Default 25 minutes in seconds
let breakTime = 5 * 60; // Default 5 minutes in seconds
let timeRemaining = pomodoroTime;

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const pomodoroInput = document.getElementById('pomodoroTime');
const breakInput = document.getElementById('breakTime');

// Function to update the timer display
function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
  secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
}

// Function to start or pause the timer
function toggleTimer() {
  if (isRunning) {
    clearInterval(timerInterval); // Pause the timer
    startPauseBtn.textContent = 'Start';
  } else {
    timerInterval = setInterval(() => {
      if (timeRemaining > 0) {
        timeRemaining--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        if (isPomodoro) {
          isPomodoro = false;
          timeRemaining = breakTime;
          alert('Pomodoro session is over! Time for a break.');
        } else {
          isPomodoro = true;
          timeRemaining = pomodoroTime;
          alert('Break time is over! Back to work!');
        }
        updateTimerDisplay();
        startPauseBtn.textContent = 'Start';
      }
    }, 1000);
    startPauseBtn.textContent = 'Pause';
  }
  isRunning = !isRunning;
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  timeRemaining = pomodoroTime; // Reset to Pomodoro time
  updateTimerDisplay();
  startPauseBtn.textContent = 'Start';
  isRunning = false;
  isPomodoro = true; // Reset to Pomodoro session
}

// Function to update Pomodoro and break times based on user input
function updateTimerSettings() {
  const newPomodoroTime = parseInt(pomodoroInput.value, 10) * 60;
  const newBreakTime = parseInt(breakInput.value, 10) * 60;

  if (!isRunning) {
    pomodoroTime = newPomodoroTime;
    breakTime = newBreakTime;
    timeRemaining = isPomodoro ? pomodoroTime : breakTime;
    updateTimerDisplay();
  }
}

// Event listeners
startPauseBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
pomodoroInput.addEventListener('change', updateTimerSettings);
breakInput.addEventListener('change', updateTimerSettings);

// Initialize the timer display
updateTimerDisplay();
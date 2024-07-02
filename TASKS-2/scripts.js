// Get DOM elements
const stopwatchDisplay = document.getElementById('stopwatchDisplay');
const startButton = document.getElementById('startBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn');
const lapButton = document.getElementById('lapBtn');
const lapTimesContainer = document.getElementById('lapList');
const water = document.getElementById('water');

let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCount = 1;

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        displayTime(elapsedTime);
        // Update water level based on elapsed time
        updateWaterLevel(elapsedTime);
    }, 10);
    startButton.disabled = true;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startButton.disabled = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    displayTime(elapsedTime);
    resetWaterLevel();
    lapTimesContainer.innerHTML = '';
    lapCount = 1;
    startButton.disabled = false;
}

function lapTimer() {
    const lapTime = elapsedTime;
    const formattedTime = formatTime(lapTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${formattedTime}`;
    lapTimesContainer.prepend(lapItem);
    lapCount++;
}

function displayTime(time) {
    const formattedTime = formatTime(time);
    stopwatchDisplay.textContent = formattedTime;
}

function formatTime(time) {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function updateWaterLevel(time) {
    const percentFilled = (time / (60 * 1000)) * 100; // Calculate percentage based on a 1-minute timer
    water.style.transform = `translateY(${100 - percentFilled}%)`;
}

function resetWaterLevel() {
    water.style.transform = `translateY(0%)`;
}

// Event listeners for buttons
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);

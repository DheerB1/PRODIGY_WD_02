let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const displayHours = document.getElementById('hours');
const displayMinutes = document.getElementById('minutes');
const displaySeconds = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.querySelector('.laps');

function updateDisplay() {
    const hours = String(Math.floor(elapsedTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((elapsedTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(Math.floor(elapsedTime % 60)).padStart(2, '0');

    displayHours.textContent = hours;
    displayMinutes.textContent = minutes;
    displaySeconds.textContent = seconds;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime * 1000;
        timer = setInterval(function() {
            const now = Date.now();
            elapsedTime = Math.floor((now - startTime) / 1000);
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    laps = [];
    lapsList.innerHTML = '';
}

function lapTimer() {
    if (isRunning) {
        laps.unshift(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${formatTime(elapsedTime)}`;
        lapsList.prepend(lapItem);
    }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

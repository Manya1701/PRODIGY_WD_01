let startTime, updatedTime, difference, tInterval, running = false, lapCounter = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', addLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        running = true;
        startStopBtn.innerText = 'Pause';
    } else {
        clearInterval(tInterval);
        running = false;
        startStopBtn.innerText = 'Start';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    display.innerText = '00:00:00';
    laps.innerHTML = '';
    startStopBtn.innerText = 'Start';
    lapCounter = 0;
    difference = 0;
}

function addLap() {
    if (running) {
        const lapTime = display.innerText;
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${++lapCounter}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerText = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}
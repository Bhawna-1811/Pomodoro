const bells = new Audio('sound_ping.mp3');
const startBtn = document.querySelector('.btn-start');
const resetBtn = document.querySelector('.btn-reset');
const session = document.querySelector('.minutes');
const sessionContainer = document.querySelector('.app-counter-box');
let myInterval;
let isSession = true;

const appTimer = () => {
    const sessionAmount = isSession ? 25 : 5; // 25 minutes session and 5 minutes break

    if (isSession) {
        startBtn.textContent = 'session';
    } else {
        startBtn.textContent = 'break';
    }

    let totalSeconds = sessionAmount * 60;

    const updateSeconds = () => {
        const minuteDiv = document.querySelector('.minutes');
        const secondDiv = document.querySelector('.seconds');

        totalSeconds--;

        let minutesLeft = Math.floor(totalSeconds / 60);
        let secondsLeft = totalSeconds % 60;

        if (secondsLeft < 10) {
            secondDiv.textContent = '0' + secondsLeft;
        } else {
            secondDiv.textContent = secondsLeft;
        }
        minuteDiv.textContent = `${minutesLeft}`;

        if (minutesLeft === 0 && secondsLeft === 0) {
            bells.play();
            clearInterval(myInterval);

            // Toggle between session and break
            isSession = !isSession;

            // Restart the timer
            appTimer();
        }
    };

    myInterval = setInterval(updateSeconds, 1000);
};

const resetTimer = () => {
    clearInterval(myInterval);
    isSession = true;
    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');

    minuteDiv.textContent = '25';
    secondDiv.textContent = '00';
    startBtn.textContent = 'start';
};

startBtn.addEventListener('click', appTimer);
resetBtn.addEventListener('click', resetTimer);






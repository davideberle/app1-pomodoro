class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        this.isWorkMode = true;
        
        // Timer durations in minutes
        this.durations = {
            work: 25,
            rest: 5
        };

        // DOM elements
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.modeToggleButton = document.getElementById('modeToggle');

        // Bind event listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.modeToggleButton.addEventListener('click', () => this.toggleMode());
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        document.title = `${timeString} - Pomodoro Timer`;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft === 0) {
                    this.playNotification();
                    this.pause();
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }

    reset() {
        this.pause();
        this.timeLeft = this.durations[this.isWorkMode ? 'work' : 'rest'] * 60;
        this.updateDisplay();
    }

    toggleMode() {
        this.isWorkMode = !this.isWorkMode;
        this.pause();
        this.timeLeft = this.durations[this.isWorkMode ? 'work' : 'rest'] * 60;
        this.updateDisplay();
        this.modeToggleButton.textContent = this.isWorkMode ? 'Rest Mode' : 'Work Mode';
        this.modeToggleButton.classList.toggle('rest-mode', !this.isWorkMode);
    }

    playNotification() {
        const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU');
        audio.play().catch(error => console.log('Audio play failed:', error));
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 
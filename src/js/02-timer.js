import '../css/common.css';
import 'flatpickr/dist/flatpickr.min.css';

import flatpickr from 'flatpickr';
import { Ukrainian } from 'flatpickr/dist/l10n/uk';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  locale: Ukrainian,
  enableTime: true,
  minuteIncrement: 1,
  dateFormat: 'd.m.Y H:i',
  defaultDate: Date.now(),
  onClose(selectedDates) {
    const isFutureDate = Date.now() < selectedDates[0];
    if (!isFutureDate) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    startBtn.disabled = false;
    targetTime = selectedDates[0];
  },
};
const fp = flatpickr('#datetime-picker', options);

let targetTime = null;

class Timer {
  constructor({ onTick }) {
    this.onTick = onTick;
    this.intervalId = null;
    this.isActive = false;
  }

  start() {
    if (this.isActive) return;

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const timeDiff = targetTime - currentTime;
      const time = this.convertMs(timeDiff);

      this.onTick(time);
    }, 1000);

    fp.input.disabled = true;
  }

  // stop() {
  //   clearInterval(this.intervalId);
  //   this.isActive = false;
  // }

  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.pad(Math.floor(ms / day));
    // Remaining hours
    const hours = this.pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.pad(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

function updateClockFace({ days, hours, minutes, seconds }) {
  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minutesRef.textContent = `${minutes}`;
  secondsRef.textContent = `${seconds}`;
}

const timer = new Timer({
  onTick: updateClockFace,
});

const startBtn = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', timer.start.bind(timer));

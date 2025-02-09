import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let timerId = null;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return iziToast.error({
        title: 'Error',
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    }
    selectedDate = selectedDates[0];
    refs.startButton.disabled = false;
  },
};

refs.startButton.addEventListener('click', createTimer);

flatpickr(refs.inputDate, options);

function createTimer() {
  timerId = setInterval(updateTimer, 1000);
  refs.startButton.disabled = true;
  refs.inputDate.disabled = true;
}

function updateTimer() {
  const time = selectedDate - new Date();
  const { days, hours, minutes, seconds } = convertMs(time);
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
  if (time < 1000) {
    clearInterval(timerId);
    refs.inputDate.disabled = false;
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

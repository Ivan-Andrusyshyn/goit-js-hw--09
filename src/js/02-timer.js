import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTime = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const minutesValue = document.querySelector('[data-minutes]');
const secindsValue = document.querySelector('[data-seconds]');

const hoursValue = document.querySelector('[data-hours]');
btnStart.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let intervalID;
    if (options.defaultDate <= selectedDates[0]) {
      btnStart.removeAttribute('disabled');
      btnStart.addEventListener('click', () => {
      clearInterval(intervalID);
        time.start();
        btnStart.setAttribute('disabled', 'disabled');
      });
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.setAttribute('disabled', 'disabled');
    }
    const time = {
      start() {
        const startTime = Date.now();
        intervalID = setInterval(() => {
          const currentTime = Date.now();
          const deltaTime = selectedDates[0] - currentTime;
          if (deltaTime < 0) {
            return clearInterval(intervalID);
          }
          const { days, hours, minutes, seconds } = convertMs(deltaTime);
          daysValue.textContent = days;
          hoursValue.textContent = hours;
          minutesValue.textContent = minutes;
          secindsValue.textContent = seconds;
        }, 1000);
      },
    };
    function addLeadingZero(value) {
      console.log(value);
      return String(value).padStart(2, '0');
    }

    function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = addLeadingZero(Math.floor(ms / day));
      const hours = addLeadingZero(Math.floor((ms % day) / hour));
      const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
      const seconds = addLeadingZero(
        Math.floor((((ms % day) % hour) % minute) / second)
      );

      return { days, hours, minutes, seconds };
    }
  },
};

flatpickr(dateTime, options);

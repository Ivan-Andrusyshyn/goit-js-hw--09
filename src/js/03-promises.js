import Notiflix from 'notiflix';
const form = document.querySelector('.form');

const inputAmount = document.querySelector('[name="amount"]');
const inputStep = document.querySelector('[name="step"]');
const inputDelay = document.querySelector('[name="delay"]');

let count = 0;
let interval = 0;

form.addEventListener('submit', makePromisesOnClick);
function makePromisesOnClick(ev) {
  ev.preventDefault();

  interval = Number(inputDelay.value);

  const maker = interval => {
    if (count < inputAmount.value) {
      count += 1;
      promisMake(inputDelay, inputStep, count, interval);
    } else {
      return clearInterval(timerId);
    }
  };
  const timerId = setInterval(maker, interval);
}
// let  msDelay = Number(inputDelay.value);
function promisMake(inputDelay, inputStep, count) {
  const promis = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve();
    } else {
      reject();
    }
  });
  promis
    .then(() => {
      // msDelay += Number(inputStep.value);
      Notiflix.Notify.success(`✅ Fulfilled promise ${count} in ${interval}ms`);
      interval += Number(inputStep.value);
    })
    .catch(() => {
      // msDelay += Number(inputStep.value);
      Notiflix.Notify.failure(`❌ Rejected promise ${count} in ${interval}ms`);
      interval += Number(inputStep.value);
    });
}

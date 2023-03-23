import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputAmount = document.querySelector('[name="amount"]');
const inputStep = document.querySelector('[name="step"]');
const inputDelay = document.querySelector('[name="delay"]');

form.addEventListener('submit', submitCreatePromise);

function submitCreatePromise(ev) {
  ev.preventDefault();

  let delay = Number(inputDelay.value);
  const delayStep = Number(inputStep.value);
  const amount = inputAmount.value;

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += delayStep;
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

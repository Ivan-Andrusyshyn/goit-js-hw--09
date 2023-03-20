const btnStart = document.querySelector('[data-start]');
// const btnStop = document.querySelector('[data-stop]');
console.log(btnStart);

btnStart.addEventListener('click', makeNewBgOnClick);

let intervalID;

function makeNewBgOnClick() {
  intervalID = setInterval(() => {
    const body = document.querySelector('body');
    console.log(body);
    body.style.backgroundColor = `${getRandomHexColor()}`;
  }, 1000);

  if (intervalID) btnStart.setAttribute('disabled', 'disabled');
  btnStart.nextElementSibling.removeAttribute('disabled');
}

btnStart.nextElementSibling.addEventListener('click', stopChangeColorOnClick);

function stopChangeColorOnClick() {
  clearInterval(intervalID);
  btnStart.removeAttribute('disabled');
  btnStart.nextElementSibling.setAttribute('disabled', 'disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

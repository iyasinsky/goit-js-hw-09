import '../css/common.css';

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalId = null;

startBtn.addEventListener('click', (e) => {
  e.target.disabled = 'true';
  stopBtn.disabled = '';

  intervalId = setInterval(() => {
    const newColor = getRandomHexColor();
    const body = document.body.style;

    body.backgroundColor = `${newColor}`;
  }, 1000);
});

stopBtn.addEventListener('click', (e) => {
  e.target.disabled = 'true';
  startBtn.disabled = '';

  clearInterval(intervalId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

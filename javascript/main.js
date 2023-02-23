// Scroller
let el = document.querySelector(".scroller");
let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;

window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  el.style.width = `${(scrollTop / height) * 100}%`;
});

// Clock
const hourEl = document.querySelector(".boxOne .clock .arrows .hour");
const minuteEl = document.querySelector(".boxOne .clock .arrows .minute");
const secondEl = document.querySelector(".boxOne .clock .arrows .second");

console.log(hourEl);

function updateClock() {
  const currentDate = new Date();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const second = currentDate.getSeconds();
  const hourDeg = (hour / 12) * 360;
  const minuteDeg = (minute / 60) * 360;
  const secondDeg = (second / 60) * 360;
  hourEl.style.transform = `rotate(${hourDeg}deg)`;
  minuteEl.style.transform = `rotate(${minuteDeg}deg)`;
  secondEl.style.transform = `rotate(${secondDeg}deg)`;
}
setInterval(updateClock, 1000);

// Calendar

document.querySelector(".dark-mode-switch").onclick = () => {
  document.querySelector(".boxTwo").classList.toggle("dark");
  document.querySelector(".boxTwo").classList.toggle("light");
};

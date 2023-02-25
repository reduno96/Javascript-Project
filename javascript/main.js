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

document.querySelector(".boxTwo .dark-mode-switch").onclick = () => {
  document.querySelector(".boxTwo").classList.toggle("dark");
  document.querySelector(".boxTwo").classList.toggle("light");
};
document.querySelector(".boxOne .dark-mode-switch").onclick = () => {
  document.querySelector(".boxOne").classList.toggle("dark");
  document.querySelector(".boxOne").classList.toggle("light");
};

isLeapYear = (year) => {
  return (
    (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

getFebDay = (year) => {
  return isLeapYear(year) ? 29 : 28;
};

let calendar = document.querySelector(".calendar");
const month_names = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month_picker = document.querySelector("#month-picker");

month_picker.onclick = () => {
  month_list.classList.add("show");
};

// GENERATE CALENDAR

generateCalendar = (month, year) => {
  let calendar_days = document.querySelector(".calendar-days");
  let calendar_header_year = document.querySelector("#year");
  calendar_days.innerHTML = "";

  let days_of_month = [
    31,
    getFebDay(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let currDate = new Date();
  if (!month === null || month === undefined) month = currDate.getMonth();
  if (!year) year = currDate.getFullYear();

  month_picker.innerHTML = month_names[month];
  calendar_header_year.innerHTML = year;

  let first_day = new Date(year, month, 1);

  for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement("div");
    let kk = days_of_month[month] + first_day.getDay() - 1;
    console.log(kk);
    if (i >= first_day.getDay()) {
      day.classList.add("calendar-day-hover");
      day.innerHTML = i - first_day.getDay() + 1;
      day.innerHTML += `<span></span>
                        <span></span>
                        <span></span>
                        <span></span>`;
      if (
        i - first_day.getDay() + 1 === currDate.getDate() &&
        year === currDate.getFullYear() &&
        month === currDate.getMonth()
      ) {
        day.classList.add("curr-date");
      }
    }
    calendar_days.appendChild(day);
  }
};

let month_list = calendar.querySelector(".month-list");

month_names.forEach((e, index) => {
  let month = document.createElement("div");
  month.innerHTML = `<div>${e}</div>`;
  month.onclick = () => {
    month_list.classList.remove("show");
    curr_month.value = index;
    generateCalendar(curr_month.value, curr_year.value);
  };
  month_list.appendChild(month);
});

document.querySelector("#prev-year").onclick = () => {
  --curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};

document.querySelector("#next-year").onclick = () => {
  ++curr_year.value;
  generateCalendar(curr_month.value, curr_year.value);
};
let currDate = new Date();

let curr_month = { value: currDate.getMonth() };
let curr_year = { value: currDate.getFullYear() };

generateCalendar(curr_month.value, curr_year.value);

// weather

let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");
let getWeather = () => {
  let cityValue = cityRef.value;
  console.log(cityValue);
  if (cityValue.length === 0) {
    result.innerHTML = `<h3> Please enter a city name </ h3>`;
  }
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
      <h2>${data.name}</h2> 
      <h4 class="weather">${data.weather[0].main}
      <h4/>
      <h4 class="desc">${data.weather[0].description}
      <h4/>
      <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
      <h1> ${data.main.temp} &#176; </h1>  
      <div class="temp-container">
        <div> 
        <h4 class="title">Min</h4>
        <h4class="temp">${data.main.temp_min}</h4>
        </div>
        <div> 
        <h4 class="title">Max</h4>
        <h4class="temp">${data.main.temp_max}</h4>
        </div>
      `;
    })
    .catch(() => {
      result.innerHTML = `<h3>City Not Found</h3>`;
    });
};

searchBtn.addEventListener("click", getWeather);

window.addEventListener("load", getWeather);

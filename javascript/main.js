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
  if (cityValue.length === 0) {
    result.innerHTML = `<h3 class="msg"> Please enter a city name </ h3>`;
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
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
        <h4 class="temp">${data.main.temp_min}</h4>
        </div>
        <div> 
        <h4 class="title">Max</h4>
        <h4 class="temp">${data.main.temp_max}</h4>
        </div>
      `;
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">SomeThing went Wrong"</h3>`;
      });
  }
};
result.innerHTML;
searchBtn.addEventListener("click", getWeather);

window.addEventListener("load", getWeather);

// Currency
const dropList = document.querySelectorAll(".drop-list select");
fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_list) {
    let selected;
    if (i == 0) {
      selected = currency_code == "MAD" ? "selected" : "";
    } else if (i == 1) {
      selected = currency_code == "USD" ? "selected" : "";
    }
    let optionTag = `<option value = "${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_list[
        code
      ].toLowerCase()}.png`;
    }
  }
}

window.addEventListener("load", () => {
  getEchangeRate();
});

getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getEchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getEchangeRate();
});

function getEchangeRate() {
  const amount = document.querySelector(".amount input");
  exchangerateTxt = document.querySelector(".exchange-rate");
  let amountval = amount.value;

  if (amount == "" || amountval == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  exchangerateTxt.innerHTML = "Getting Exchange Rate...";
  let urlCurr = `https://v6.exchangerate-api.com/v6/${currApi}/latest/${fromCurrency.value}`;

  fetch(urlCurr)
    .then((response) => response.json())
    .then((result) => {
      let exchangerate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = (amountval * exchangerate).toFixed(2);
      exchangerateTxt.innerHTML = `${amountval} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangerateTxt.innerText = "SomeThing went Wrong";
    });
}

// Calculator

const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";

for (let key of keys) {
  const value = key.dataset.key;
  key.addEventListener("click", () => {
    if (value == "clear") {
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value == "backspace") {
      input = input.slice(0, -1);
      display_input.innerHTML = CleanInput(input);
    } else if (value == "=") {
      let result = eval(input);
      display_output.innerHTML = result;
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }
      display_input.innerHTML = CleanInput(input);
    } else {
      input += value;
      display_input.innerHTML = CleanInput(input);
    }
  });
}

function CleanInput(input) {
  let input_array = input.split("");
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "*") {
      input_array[i] = ` <span class ="operator">x</span> `;
    } else if (input_array[i] == "/") {
      input_array[i] = ` <span class ="operator">/</span> `;
    } else if (input_array[i] == "+") {
      input_array[i] = ` <span class ="operator">+</span> `;
    } else if (input_array[i] == "-") {
      input_array[i] = ` <span class ="operator">-</span> `;
    } else if (input_array[i] == "(") {
      input_array[i] = ` <span class ="operator">(</span> `;
    } else if (input_array[i] == ")") {
      input_array[i] = ` <span class ="operator">)</span> `;
    } else if (input_array[i] == "%") {
      input_array[i] = ` <span class ="operator">%</span> `;
    }
  }
  return input_array.join("");
}

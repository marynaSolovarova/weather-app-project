function displayCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#exampleInputEmail1").value;
  search(cityInput);
}
function search(city) {
  let units = "metric";
  let apiKey = "e996ce2294c18887fdd7702f5f183cb1";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${endPoint}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}
search("New York");
let submitButton = document.querySelector("#search-engine");
submitButton.addEventListener("submit", displayCity);

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${currentDay} ${hours}:${minutes}`;
}

function celsiusDisplay(event) {
  event.preventDefault();
  celsiusTemperature.classList.add("active");
  farenheitTemperature.classList.remove("active");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemp);
}
function farenheitDisplay(event) {
  event.preventDefault();
  celsiusTemperature.classList.remove("active");
  farenheitTemperature.classList.add("active");
  let temp = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = Math.round(fahrenheitTemp);
}
let celsiusTemperature = document.querySelector("#celsius");
let farenheitTemperature = document.querySelector("#farenheit");
celsiusTemperature.addEventListener("click", celsiusDisplay);
farenheitTemperature.addEventListener("click", farenheitDisplay);
let celsiusTemp = null;

function getForecast(coordinates) {
  let apiKey = "e996ce2294c18887fdd7702f5f183cb1";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  let tempElement = document.querySelector("#temperature");
  celsiusTemp = response.data.main.temp;
  let temp = Math.round(celsiusTemp);
  tempElement.innerHTML = temp;
  document.querySelector("#city-display").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let currentDayAndTime = document.querySelector("#today");
  currentDayAndTime.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showPosition(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "metric";
  let apiKey = "e996ce2294c18887fdd7702f5f183cb1";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${endPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}

let gpsButton = document.querySelector("#gps-button");
gpsButton.addEventListener("click", showPosition);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-3">
          <div class="day">${day}</div>
          <img  class="icon-down"
            src="http://openweathermap.org/img/wn/50d@2x.png"
           
          />

          <div class="temperature">18° / 27°</div>
        </div>`;
  });
  forecastHTML = forecastHTML + `</div >`;
  forecastElement.innerHTML = forecastHTML;
}
//<i class="fa-solid fa-cloud-sun weather-icon-down"></i>

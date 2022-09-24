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
  let temp = document.querySelector("#temperature");
  temp.innerHTML = "17°";
}
function farenheitDisplay(event) {
  let temp = document.querySelector("#temperature");
  temp.innerHTML = "66°";
}
let celsiusTemperature = document.querySelector("#celsius");
let farenheitTemperature = document.querySelector("#farenheit");
celsiusTemperature.addEventListener("click", celsiusDisplay);
farenheitTemperature.addEventListener("click", farenheitDisplay);
function showTemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temperature");
  let temp = Math.round(response.data.main.temp);
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
}
////class="fa-solid fa-cloud-sun weather-icon"
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

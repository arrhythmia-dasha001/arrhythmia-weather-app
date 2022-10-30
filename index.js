function currentDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return day;
}
function currentHours(hour) {
  let hours = hour.getHours();
  if (hour < 10) {
    return "0" + hours;
  }
  return hours;
}
function currentMinutes(minute) {
  let minutes = minute.getMinutes();
  if (minute < 10) {
    return "0" + minutes;
  }
  return minutes;
}

let dayElement = document.querySelector("#dayOfWeek");
let currentTime = new Date();
dayElement.innerHTML = currentDate(currentTime);
let hourElement = document.querySelector("#hours");
hourElement.innerHTML = currentHours(currentTime);
let minutesElement = document.querySelector("#minutes");
minutesElement.innerHTML = currentMinutes(currentTime);

// Search weather
function changeCity(response) {
  let cityInSearchLine = response.data.name;
  let cityElement = document.querySelector("#selected-city");
  cityElement.innerHTML = cityInSearchLine;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.main.humidity;
  humidityElement.innerHTML = humidity;
  let speedWind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = speedWind;
  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = temp;
}

function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#enter-a-city");
  let KeyApi = "26ee923a5181d1bd1f46f4d149a79d07";
  let urlApiSearch = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${KeyApi}&units=metric`;
  console.log(urlApiSearch);
  axios.get(urlApiSearch).then(changeCity);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Current Temperature + Geolocation
function temp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currenttempElement = document.querySelector("#temperature");
  currenttempElement.innerHTML = currentTemp;
  let currentnameTown = response.data.name;
  let nameTown = document.querySelector("#selected-city");
  nameTown.innerHTML = currentnameTown;
  let currentHumidity = response.data.main.humidity;
  let currentWind = Math.round(response.data.wind.speed);
  let currentHumidityElement = document.querySelector("#humidity");
  let currentWindElement = document.querySelector("#wind");
  currentHumidityElement.innerHTML = currentHumidity;
  currentWindElement.innerHTML = currentWind;
}

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "26ee923a5181d1bd1f46f4d149a79d07";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(temp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);

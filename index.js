let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  let apiKey = "e76643bfa6d843d9c5ecb52ecebf3c40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperture);
}
function showTemperture(responce) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${responce.data.weather[0].icon}@2x.png`
  );
  celsiusTemperture = responce.data.main.temp;
  let temperture = document.querySelector("#temperature");
  temperture.innerHTML = Math.round(responce.data.main.temp);
  let description = document.querySelector("#description");
  description.innerHTML = responce.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${responce.data.main.humidity}%`;
  let wind = document.querySelector("#wind");
  let wind1 = Math.round(responce.data.wind.speed);
  wind.innerHTML = `Wind: ${wind1} km/h`;
  console.log(responce.data);
}

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
//--------------------------------------
function showingDegree(event) {
  event.preventDefault();

  let degree = document.querySelector("#temperature");
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let degreeElement = Math.round(celsiusTemperture);

  degree.innerHTML = degreeElement;
}

function showingFahrenheit(event) {
  event.preventDefault();

  let tempertureElement = document.querySelector("#temperature");
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let fahrenheitDegree = (celsiusTemperture * 9) / 5 + 32;

  tempertureElement.innerHTML = Math.round(fahrenheitDegree);
}

let celsiusTemperture = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showingFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showingDegree);

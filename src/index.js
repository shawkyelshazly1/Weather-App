import "./style.css";
const APIEKY = "7493088841fd29c74419235a2fac14a3";

let tempUnit = "c";
let city = "cairo";

let searchBar = document.querySelector("#search_bar");
let searchBtn = document.querySelector("#search_btn");
let tempSwitcherBtn = document.querySelector(".temp_selector");
let cels = document.querySelector(".cels");
let feh = document.querySelector(".feh");

tempSwitcherBtn.addEventListener("change", (e) => {
  if (tempUnit == "c") {
    tempUnit = "f";
    cels.classList.toggle("active");
    feh.classList.toggle("active");
    getWeather(city);
  } else {
    tempUnit = "c";
    cels.classList.toggle("active");
    feh.classList.toggle("active");
    getWeather(city);
  }
});

async function getWeather(keyword) {
  city = keyword;
  let URL = "";
  if (tempUnit === "f") {
    URL = `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=${APIEKY}&units=imperial`;
  } else {
    URL = `https://api.openweathermap.org/data/2.5/weather?q=${keyword}&appid=${APIEKY}&units=metric`;
  }

  let response = await fetch(URL, { mode: "cors" });
  if (response.status !== 200) {
    document.querySelector(".error").classList.add("show");
  } else {
    document.querySelector(".error").classList.remove("show");
    let weatherData = await response.json();
    let { main, wind, name, sys } = weatherData;
    updateValues(
      name,
      sys.country,
      main.temp,
      main.feels_like,
      main.humidity,
      wind.speed
    );
  }
}

function updateValues(city, country, temp, feelsLike, humidity, windSpeed) {
  document.querySelector(".city").textContent = `${city},${country}`;
  document.querySelector(".temp").textContent = `${temp.toFixed(0)}`;
  document.querySelector(
    ".feels_like"
  ).textContent = `Feels Like: ${feelsLike.toFixed(0)}`;
  document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
  if (tempUnit === "f") {
    document.querySelector(".temp").classList.add("f");
    document.querySelector(".feels_like").classList.add("f");
    document.querySelector(
      ".wind_speed"
    ).textContent = `Wind Speed: ${windSpeed.toFixed(1)} Miles/H`;
  } else {
    document.querySelector(".temp").classList.remove("f");
    document.querySelector(".feels_like").classList.remove("f");
    document.querySelector(".wind_speed").textContent = `Wind Speed: ${(
      windSpeed * 3.6
    ).toFixed(1)} KM/H`;
  }
}

searchBtn.addEventListener("click", (e) => {
  let keyword = searchBar.value;
  getWeather(keyword);
});

searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    let keyword = searchBar.value;
    getWeather(keyword);
  }
});

window.onload = getWeather(city);

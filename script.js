const apiKey = "309f7d94b615b8ccc37b28c459d59071"; // Replace with your API key

const searchButton = document.getElementById("search-button");
const cityNameInput = document.getElementById("city-search");
const cityNameDisplay = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const currentTemp = document.getElementById("current-temp");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const forecastList = document.getElementById("forecast-list");
const searchHistoryList = document.getElementById("search-history-list");

let searchHistory = loadSearchHistory();

// Function to fetch weather data
function fetchWeatherData(city) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=<span class="math-inline">\{city\}&appid\=</span>{apiKey}&units=imperial`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === "404") {
        alert("City not found.");
        return;
      }

      displayCurrentWeather(data);

      fetchForecast(data.coord.lat, data.coord.lon);
    });
}

// Function to fetch 5-day forecast data
function fetchForecast(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=<span class="math-inline">\{lat\}&lon\=</span>{lon}&appid=${apiKey}&units=imperial`;

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => displayForecast(data));
}

// Function to display current weather
function displayCurrentWeather(data) {
  cityNameDisplay.textContent = data.name + " (" + new Date().toLocaleDateString() + ")";
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  currentTemp.textContent = "Temperature: " + data.main.temp + "°F";
  humidity.textContent = "Humidity: " + data.main.humidity + "%";
  windSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";

  saveSearchHistory(data.name); // Save search to history
}

// Function to display 5-day forecast
function displayForecast(data) {
  forecastList.innerHTML = ""; // Clear previous forecast

  for (let i = 0; i < data.list.length; i += 8) { // Get data at intervals for the daily forecast
    const dailyData = data.list[i];

    const forecastItem = document.createElement("li");
    forecastItem.classList.add("forecast-item");

    const date = new Date(dailyData.dt * 1000).toLocaleDateString();
    const iconUrl = `http://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`;

    forecastItem.innerHTML = `
        <p class="forecast-date"><span class="math-inline">\{date\}</p\>
<img class\="forecast\-icon" src\="</span>{iconUrl}" alt="">
        <p>Temp: ${dailyData.main.temp} °F</p>
        <p>Humidity: ${dailyData.main.humidity} %</p>
        <p>Wind: ${dailyData.wind.speed} MPH</p>
    `;

    forecastList.appendChild(forecastItem);
  }
}

// Function to load search history from localStorage
function loadSearchHistory() {
  // Implementation goes here (provided below)
}

// Function to save search history to localStorage
function saveSearchHistory(city) {
  // Implementation goes here (provided below)
}

// Event listener for search button
searchButton.addEventListener("click", () => {
  const city = cityNameInput.value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  fetchWeatherData(city);
// ... (Rest of your script.js code from the previous example)

// Function to load search history from localStorage
function loadSearchHistory() {
  let history = localStorage.getItem("weatherSearchHistory");
  if (history) {
    return JSON.parse(history);
  } else {
    return []; // Return empty array if nothing in localStorage
  }
}

// Function to save search history to localStorage
function saveSearchHistory(city) {
  // Don't add duplicate cities
  if (searchHistory.includes(city)) return;

  searchHistory.push(city); 
  localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));
  renderSearchHistory(); // Update the displayed search history
}

// Function to render the search history in the UI
function renderSearchHistory() {
  searchHistoryList.innerHTML = '';

  searchHistory.forEach(city => {
    const historyItem = document.createElement("li");
    historyItem.classList.add("search-history-item");
    historyItem.textContent = city;

    // Event listener to re-fetch weather when history item is clicked
    historyItem.addEventListener('click', () => {
      fetchWeatherData(city); 
    });

    searchHistoryList.appendChild(historyItem);
  });
}

// Load and display initial search history on page load
renderSearchHistory();

// Example - Load default location (Riverside, California) on page load
fetchWeatherData("Riverside, California"); 



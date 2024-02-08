const apiKey = "309f7d94b615b8ccc37b28c459d59071"; // Replace with your OpenWeatherMap API key
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-search");
const cityNameDisplay = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const currentTemp = document.getElementById("current-temp");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const forecastList = document.getElementById("forecast-list");
const searchHistoryList = document.getElementById("search-history-list");

let searchHistory = loadSearchHistory();

// Fetch current weather data 
function fetchWeatherData(city) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", currentWeatherUrl);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      if (data.cod === "404") {
        alert("City not found.");
        return;
      }
      displayCurrentWeather(data);
      fetchForecast(data.coord.lat, data.coord.lon);
    } else {
      handleAPIError(city, xhr);
    }
  };

  xhr.onerror = function() { 
    handleAPIError(city, xhr);
  };

  xhr.send();
}

// Fetch 5-day forecast data
function fetchForecast(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", forecastUrl);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      displayForecast(data);
    } else {
      handleAPIError('forecast', xhr); 
    }
  };

  xhr.onerror = function() { 
    handleAPIError('forecast', xhr); 
  };

  xhr.send();
}

// Display current weather data
function displayCurrentWeather(data) {
  cityNameDisplay.textContent = data.name + " (" + new Date().toLocaleDateString() + ")";
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  currentTemp.textContent = "Temperature: " + data.main.temp + "°F";
  humidity.textContent = "Humidity: " + data.main.humidity + "%";
  windSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";
  saveSearchHistory(data.name); 
}

// Display 5-day forecast data
function displayForecast(data) {
  forecastList.innerHTML = ""; 

  for (let i = 0; i < data.list.length; i += 8) { 
    const dailyData = data.list[i];

    const forecastItem = document.createElement("li");
    forecastItem.classList.add("forecast-item");

    const date = new Date(dailyData.dt * 1000).toLocaleDateString();
    const iconUrl = `http://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`;

    forecastItem.innerHTML = `
            <p class="forecast-date">${date}</p>
            <img class="forecast-icon" src="${iconUrl}" alt="">
            <p>Temp: ${dailyData.main.temp} °F</p>
            <p>Humidity: ${dailyData.main.humidity} %</p>
            <p>Wind: ${dailyData.wind.speed} MPH</p>
        `;

    forecastList.appendChild(forecastItem);
  }
}

// Load search history from localStorage
function loadSearchHistory() {
  const storedHistory = localStorage.getItem("searchHistory");
  return storedHistory ? JSON.parse(storedHistory) : []; 
}

// Save search history to localStorage
function saveSearchHistory(city) {
  if (!searchHistory.includes(city)) { 
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    renderSearchHistory();
  }
}

// Render the search history 
function renderSearchHistory() {
    searchHistoryList.innerHTML = ''; 

    searchHistory.forEach(city => {
    const historyItem = document.createElement('li');
    historyItem.classList.add('search-history-item');
    historyItem.textContent = city;

    historyItem.addEventListener('click', () => { 
      fetchWeatherData(city); 
    });

    searchHistoryList.appendChild(historyItem);
  });
}

// Error Handling on API Requests
function handleAPIError(city, xhr) {
  console.error('Error fetching data for ' + city + ':', xhr.status, xhr.statusText);
  if (xhr.status === 404) {
    alert("City not found.");
  } else {
    alert("There was a problem retrieving weather data. Please try again later.");
  }
}

// Event listener for search button
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim() 
  if (city) { 
    fetchWeatherData(city);
    cityInput.value = ''; 
  } else {
    alert("Please enter a city name.");
  }
});

// Load and display initial search history on page load
renderSearchHistory();

// Example - Load default location (Riverside, California) on page load
fetchWeatherData("Riverside, California"); 

fetchWeatherData("Riverside, California"); 



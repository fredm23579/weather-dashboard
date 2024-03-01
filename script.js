
  const historyList = document.getElementById('searchHistory');
  const cityButton = document.createElement('li');
  cityButton.innerHTML = `<button class="btn btn-secondary btn-block city-button">${city}</button>`;
  cityButton.querySelector('button').addEventListener('click', function() {
    fetchWeatherData(city);
  });
  historyList.appendChild(cityButton);
}
function loadSearchHistory() {
  let cities = JSON.parse(localStorage.getItem('weatherDashboardCities')) || [];
  if(!cities.includes(defaultCity)) {
    cities.push(defaultCity);
  }
  document.getElementById('searchHistory').innerHTML = '';
  cities.forEach(addCityButton);
}

window.onload = function() {
  loadSearchHistory();
  fetchWeatherData(defaultCity); // Fetch weather for default city on load
};
function displayCurrentWeather(data) {
  const iconClass = getIconClass(data.weather[0].main); // Get class based on weather
  const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  const weatherHTML = `
    <h3>Current Weather for ${data.name}</h3>
    <img src="${iconUrl}" class="${iconClass}" alt="${data.weather[0].description}">
    <p>Temperature: ${data.main.temp} °F</p>
    <p>Wind Speed: ${data.wind.speed} mph</p>
    <p>Humidity: ${data.main.humidity}%</p>
  `;
  document.getElementById('weatherDisplay').innerHTML = weatherHTML;
}

function displayForecast(data) {
  let forecastHTML = '<h3>5-Day Forecast:</h3><div class="d-flex flex-wrap justify-content-between">';
  data.list.forEach((forecast, index) => {
    if (index % 8 === 0) {
      const iconClass = getIconClass(forecast.weather[0].main); // Get class based on weather
      const iconUrl = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
      forecastHTML += `
        <div class="forecast-card">
          <h5>${new Date(forecast.dt_txt).toLocaleDateString()}</h5>
          <img src="${iconUrl}" class="${iconClass}" alt="${forecast.weather[0].description}">
          <p>Temp: ${forecast.main.temp} °F</p>
          <p>Wind: ${forecast.wind.speed} mph</p>
          <p>Humidity: ${forecast.main.humidity}%</p>
        </div>
      `;
    }
  });
  forecastHTML += '</div>';
  document.getElementById('forecastDisplay').innerHTML = forecastHTML;
}

// Function to determine the icon class based on weather conditions
function getIconClass(weatherCondition) {
  switch(weatherCondition.toLowerCase()) {
    case 'clear':
      return 'sunny';
    case 'clouds':
      return 'cloudy';
    case 'rain':
      return 'rainy';
       default:
      return '';
  }
}

window.onload = loadSearchHistory;

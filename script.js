module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  }
  
  // JavaScript to handle city search and display weather information
document.getElementById('search-btn').addEventListener('click', function() {
    var cityName = document.getElementById('city-search').value;
    var apiKey = '6bcbafbbb6b80088967801dc260b977b'; // Your OpenWeather API key
    var weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    
    fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
        // Display current weather information
        document.getElementById('city-name').textContent = data.name + ' (Current)';
        document.getElementById('current-temp').textContent = 'Temp: ' + data.main.temp + ' °F';
        document.getElementById('current-wind').textContent = 'Wind: ' + data.wind.speed + ' MPH';
        document.getElementById('current-humidity').textContent = 'Humidity: ' + data.main.humidity + '%';
        
        // Get 5-day forecast data
        var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
        return fetch(forecastUrl);
      })
      .then(response => response.json())
      .then(data => {
        var forecastEl = document.getElementById('forecast');
        forecastEl.innerHTML = ''; // Clear previous forecasts
        
        // Process and display 5-day forecast
        for (let i = 0; i < data.list.length; i+=8) { // API returns weather in 3-hour intervals
          var dayData = data.list[i];
          var forecastCard = document.createElement('div');
          forecastCard.classList = 'bg-white shadow-lg rounded-lg p-4 text-center';
          forecastCard.innerHTML = `
            <h3 class="font-bold text-gray-800">${new Date(dayData.dt_txt).toLocaleDateString()}</h3>
            <img src="https://openweathermap.org/img/w/${dayData.weather[0].icon}.png" alt="${dayData.weather[0].description}">
            <p class="text-gray-700">Temp: ${dayData.main.temp} °F</p>
            <p class="text-gray-700">Wind: ${dayData.wind.speed} MPH</p>
            <p class="text-gray-700">Humidity: ${dayData.main.humidity}%</p>
          `;
          forecastEl.appendChild(forecastCard);
        }
      })
      .catch(error => console.error('Error:', error));
  });
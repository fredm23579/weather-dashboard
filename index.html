<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"></link>
  <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Open Sans', sans-serif;
    }
  </style>
</head>
<body class="bg-gray-100">
  <div class="container mx-auto p-5">
    <h1 class="text-3xl font-bold text-gray-800 text-center mb-4">Weather Dashboard</h1>
    
    <!-- Search section -->
    <div class="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-4 mb-4">
      <div class="flex-1 md:mr-2">
        <label for="city-search" class="block text-gray-700 text-sm font-bold mb-2">Search for a City:</label>
        <input id="city-search" type="text" placeholder="Enter City Name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <button id="search-btn" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 md:mt-0">Search</button>
    </div>

    <!-- City Weather Information -->
    <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h2 id="city-name" class="text-2xl font-bold text-gray-800"></h2>
      <p id="current-temp" class="text-gray-700"></p>
      <p id="current-wind" class="text-gray-700"></p>
      <p id="current-humidity" class="text-gray-700"></p>
    </div>

    <!-- 5-Day Forecast -->
    <h2 class="text-2xl font-bold text-gray-800 mb-4">5-Day Forecast:</h2>
    <div id="forecast" class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <!-- Forecast cards will be injected here by JavaScript -->
    </div>
  </div>

  <script>
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
  </script>
</body>
</html>

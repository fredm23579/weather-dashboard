document.getElementById('search-btn').addEventListener('click', function() {
    var cityName = document.getElementById('city-search').value;
    fetchCurrentWeather(cityName);
    fetchWeatherForecast(cityName);
});

function fetchCurrentWeather(cityName) {
    var apiKey = '6bcbafbbb6b80088967801dc260b977b';
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('city-title').textContent = `Current Weather for ${data.name}`;
            document.getElementById('current-weather-data').innerHTML = `
                <p>Temperature: ${data.main.temp} °F</p>
                <p>Wind Speed: ${data.wind.speed} mph</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        })
        .catch(error => console.error('Error:', error));
}

function fetchWeatherForecast(cityName) {
    var apiKey = 'YOUR_API_KEY';
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = ''; // Clear previous content

            // Process the 5-day forecast data
            for (let i = 0; i < data.list.length; i += 8) { // The API returns 3-hourly forecast, so we take every 8th entry for a daily forecast
                const forecast = data.list[i];
                const date = new Date(forecast.dt_txt);
                forecastContainer.innerHTML += `
                    <div class="forecast-day">
                        <h3>${date.toLocaleDateString()}</h3>
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
                        <p>${forecast.weather[0].main}</p>
                        <p>Temp: ${forecast.main.temp} °F</p>
                        <p>Wind: ${forecast.wind.speed} mph</p>
                        <p>Humidity: ${forecast.main.humidity}%</p>
                    </div>
                `;
            }
        })
        .catch(error => console.error('Error:', error));
}

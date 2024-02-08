// Replace 'YOUR_API_KEY' with your actual API key from OpenWeatherMap
const apiKey = '975333c4c08534e5a5371761f64ed860';

document.getElementById('search-btn').addEventListener('click', function() {
    var cityName = document.getElementById('city-search').value.trim();
    fetchCurrentWeather(cityName, apiKey);
    fetchWeatherForecast(cityName, apiKey);
});

function fetchCurrentWeather(cityName, apiKey) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Ensure data is valid here before trying to access its properties
            if (data && data.weather) {
                document.getElementById('city-title').textContent = `Current Weather for ${data.name}`;
                document.getElementById('current-weather-data').innerHTML = `
                    <p>Temperature: ${data.main.temp} °F</p>
                    <p>Wind Speed: ${data.wind.speed} mph</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                `;
            } else {
                // Handle errors or no data scenario
                console.error('No weather data available');
            }
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
        });
}

function fetchWeatherForecast(cityName, apiKey) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Ensure data is valid here before trying to access its properties
            if (data && data.list) {
                const forecastContainer = document.getElementById('forecast-container');
                forecastContainer.innerHTML = ''; // Clear previous content

                // Process the 5-day forecast data
                for (let i = 0; i < data.list.length; i += 8) {
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
            } else {
                // Handle errors or no data scenario
                console.error('No forecast data available');
            }
        })
        .catch(error => {
            console.error('Error fetching weather forecast:', error);
        });
}

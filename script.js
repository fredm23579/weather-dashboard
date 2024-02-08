document.addEventListener('DOMContentLoaded', function() {
    var cities = ['San Diego', 'Atlanta', 'Denver', 'Seattle', 'San Francisco', 'Orlando', 'New York', 'Chicago', 'Austin'];
    var cityListDiv = document.getElementById('city-list');

    cities.forEach(function(city) {
        var button = document.createElement('button');
        button.textContent = city;
        button.onclick = function() {
            fetchWeather(city);
        };
        cityListDiv.appendChild(button);
    });

    document.getElementById('search-button').onclick = function() {
        var city = document.getElementById('city-input').value;
        fetchWeather(city);
    };

    function fetchWeather(city) {
        var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=309f7d94b615b8ccc37b28c459d59071&units=imperial';
        fetch(url)
        .then(function(response) { return response.json(); })
        .then(function(data) {
            displayWeather(data);
        });
    }

    function displayWeather(data) {
        var currentWeatherDiv = document.getElementById('current-weather');
        currentWeatherDiv.innerHTML = '<h2>' + data.name + ' (' + new Date().toLocaleDateString() + ')</h2>' +
            '<p>Temp: ' + data.main.temp + '°F</p>' +
            '<p>Wind: ' + data.wind.speed + ' MPH</p>' +
            '<p>Humidity: ' + data.main.humidity + ' %</p>';
        // Fetch and display the forecast here...
    }
    
    // Fetch default city weather on load
    fetchWeather('Atlanta');
});


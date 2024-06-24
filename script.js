document.getElementById('fetch-weather').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    const apiKey = '2ba8e3f598134c55ae6134047242406';  // Replace with your valid API key
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error.message);
            }
            const weatherInfoDiv = document.getElementById('weather-info');
            weatherInfoDiv.innerHTML = `
                <h2>${data.location.name}</h2>
                <p>Temperature: ${data.current.temp_c} °C</p>
                <p>Weather: ${data.current.condition.text}</p>
                <p>Humidity: ${data.current.humidity} %</p>
                <p>Wind Speed: ${data.current.wind_kph} kph</p>
            `;
        })
        .catch(error => {
            const weatherInfoDiv = document.getElementById('weather-info');
            weatherInfoDiv.innerHTML = `
                <p>Error fetching the weather data: ${error.message}</p>
            `;
            console.error('Error fetching the weather data:', error);
        });
});

const apiKey = '24dc96794ed278be199a9ff5b8012075'; // Replace with your actual API key
const searchButton = document.getElementById('search-button');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('weather-card');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const conditions = document.getElementById('conditions');
const weatherIcon = document.getElementById('weather-icon');
const rainChance = document.getElementById('rain-chance'); // New element for rain chance
const windSpeed = document.getElementById('wind-speed'); // New element for wind speed
const notFound = document.getElementById('not-found'); // New element for not found message

// Mapping of weather conditions to image file names
const weatherImages = {
    "Clear": "clear.svg",
    "Clouds": "clouds.svg",
    "Rain": "rain.svg",
    "Drizzle": "drizzle.svg",
    "Snow": "snow.svg",
    "Thunderstorm": "thunderstorm.svg",
    "Mist": "mist.svg",
    "Smoke": "smoke.svg",
    "Haze": "haze.svg",
    "Dust": "dust.svg",
    "Fog": "fog.svg",
    "Sand": "sand.svg",
    "Ash": "ash.svg",
    "Squall": "squall.svg",
    "Tornado": "tornado.svg"
};

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim(); // Trim whitespace
    if (!city) {
        alert('Please enter a city name.'); // Input validation
        return;
    }
    fetchWeather(city);
});

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            cityName.textContent = data.name;
            temperature.textContent = `Temperature: ${data.main.temp} °C`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            conditions.textContent = `Conditions: ${data.weather[0].description}`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`; // Update wind speed

            const condition = data.weather[0].main;
            weatherIcon.src = weatherImages[condition] || "default.png"; 
            
            rainChance.textContent = data.rain ? `Chance of Rain: ${data.rain['1h'] ? data.rain['1h'] : 0}%` : 'Chance of Rain: 0%';

            weatherCard.style.display = 'block';
            notFound.style.display = 'none'; // Hide not found message
            cityInput.value = ''; // Clear input field after search
        } else {
            weatherCard.style.display = 'none'; // Hide weather card
            notFound.style.display = 'block'; // Show not found message
        }
    } catch (error) {
        alert('An error occurred while fetching the weather data. Please try again later.'); // Catch any fetch errors
    }
}

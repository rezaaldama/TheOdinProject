const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');

const iconMap = {
  snow: '❄️',
  rain: '🌧️',
  fog: '🌫️',
  wind: '💨',
  cloudy: '☁️',
  'partly-cloudy-day': '⛅',
  'partly-cloudy-night': '☁️',
  'clear-day': '☀️',
  'clear-night': '🌙',
};

const getWeatherData = async (city) => {
  city = city.toLowerCase();
  const url = `https://weather.visualcrossing.com/
               VisualCrossingWebServices/rest/services/timeline/${city}?
               unitGroup=metric&key=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    updateUI(data);
  } catch (err) {
    alert(err.message);
    console.error('Fetch Error:', err);
  }
};

const updateUI = (data) => {
  document.getElementById('location').textContent = data.resolvedAddress;
  document.getElementById('temp-val').textContent = Math.round(
    data.currentConditions.temp,
  );
  document.getElementById('condition-text').textContent =
    data.currentConditions.conditions;
  document.getElementById('feels-like').textContent =
    `${Math.round(data.currentConditions.feelslike)}°C`;
  document.getElementById('humidity').textContent =
    `${data.currentConditions.humidity}%`;

  const iconCode = data.currentConditions.icon;
  document.getElementById('icon').textContent = iconMap[iconCode] || '🌡️';
};

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) getWeatherData(city);
});

getWeatherData('Amsterdam');

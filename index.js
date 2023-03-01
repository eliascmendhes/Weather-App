async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function updateUI(data) {
  const weatherContainer = document.querySelector("#weather-container");
  weatherContainer.innerHTML = `
    <h2>${data.name}</h2>
    <p>${Math.round(data.main.temp - 273.15)}°C</p>
    <p>${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${
      data.weather[0].icon
    }.png" alt="${data.weather[0].description}">
  `;
}

const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", async () => {
  const locationInput = document.querySelector("#location-input");
  const city = locationInput.value.trim();
  const data = await getWeatherData(city);
  updateUI(data);
});

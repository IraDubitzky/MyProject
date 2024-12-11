const API_KEY = '0066a3f859e0b620c908bb57b5d7200b';
const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}&q=`;
const inputCity = document.getElementById('inputCity');
const button = document.querySelector('button');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const errorMsg = document.getElementById('errorMsg');

async function getWeather(city) {
    const response = await fetch(URL + city);
    const data = await response.json();
    console.log(data);
    displayWeather(data);

}

function displayWeather(weatherData) {
    if (weatherData.cod === 200) {
        errorMsg.innerText = '';
        weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
        city.innerText = weatherData.name;
        temperature.innerText = weatherData.main.temp + 'C';
        description.innerText = weatherData.weather[0].description;
    }
    else {
        errorMsg.innerText = 'City is not founded...';
        weatherIcon.src = '';
        city.innerText = '';
        temperature.innerText = '';
        description.innerText = '';
    }
}

button.addEventListener('click', () => {
    getWeather(inputCity.value);
})

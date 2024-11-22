import API_KEY from './API_KEY.js';

let API_WEATHER_URL;
let API_CITIES_URL;

const searchInput = document.querySelector('.search--form_input');
const searchButton = document.querySelector('.search--form_button');
const weatherInfo = document.querySelector('.weather');

let city_name = "";

async function getCities(city_name) {
    API_CITIES_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=10&appid=${API_KEY}`;
    const response = await fetch(API_CITIES_URL);
    const data = await response.json();
    return data;
    
}

searchInput.addEventListener('keyup', async (e) => {
    city_name = e.target.value;    
    let cities = await getCities(city_name);
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.name;
        document.querySelector('#cities').appendChild(option);
    })
});

searchButton.addEventListener('click', async (e) => {
    e.preventDefault();
    API_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;
    const response = await fetch(API_WEATHER_URL);
    const data = await response.json();
    console.log(data);
    const temp = Math.round(data.main.temp - 273.15);
    const weather = `
    <div class="weather--card">
        <h2 class="weather--card_title">${data.name}</h2>
        <p class="weather--card_temp">${temp}°C</p>
        <p class="weather--card_description">${data.weather[0].description}</p>
    </div>
    `;
    weatherInfo.innerHTML = weather;
});


    


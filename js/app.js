let API_WEATHER_URL;
let API_CITIES_URL;

const searchInput = document.querySelector('.search--form_input');
const searchButton = document.querySelector('.search--form_button');
const compareButton = document.querySelector('#search--form_button_compare');
const weatherInfo = document.querySelector('.weather');
const flags = await getFlags();

let city_name = "";

async function getCities(city_name) {
    API_CITIES_URL = `https://13-weather-l0mq87u22-sam-sepiols-projects-c25eb3a9.vercel.app/cities/${city_name}`;
    const response = await fetch(API_CITIES_URL);
    const data = await response.json();
    return data;
}

async function getWeather(city_name) {
    API_WEATHER_URL = `https://13-weather-l0mq87u22-sam-sepiols-projects-c25eb3a9.vercel.app/weather/${city_name}`;
    const response = await fetch(API_WEATHER_URL);
    const weather = await response.json();
    return weather;
}

async function getFlags() {
    return fetch('../json/flags.json')
        .then(response => response.json())
        .catch(error => console.error(error));
}

function emojiWeather(weather) {    
    switch (weather.list[0].weather[0].main) {
        case 'Rain':
            return '🌧️';
        case 'Clouds':
            return '☁️';
        case 'Snow':
            return '❄️';
        case 'Clear':
            return '☀️';
        case 'Drizzle':
            return '🌦️';
        case 'Thunderstorm':
            return '⛈️';
        case 'Sunny':
            return '☀️';
        default:
            return '';

    }
}

function emojiTemperature(weather) {
    let temp = weather.list[0].main.temp - 273.15;
    switch (true) {
        case (temp <= 0):
            return '🥶'; 
        case (temp > 0 && temp <= 10):
            return '😐'; 
        case (temp > 10 && temp <= 20):
            return '😊'; 
        case (temp > 20 && temp <= 30):
            return '😎'; 
        case (temp > 30):
            return '🥵'; 
        default:
            return '';
    }
    
}

function emojiFlags(weather) {    
    const flag = flags.find(flag => flag.code === weather.city.country);
    if (flag) {
        return flag.emoji;
    }
}

searchInput.addEventListener('keyup', async (e) => {

    
    city_name = e.target.value;    
    let cities = await getCities(city_name);

    for (const city of cities) {
        let optionValue = city.name + ', ' + city.country + ', ' + city.state;
        
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            continue;
        }
        if (!city.state) {
            optionValue = city.name + ', ' + city.country;
        }
        
        const option = document.createElement('option');
        option.value = optionValue;
        document.querySelector('#cities').appendChild(option);
    }
});

searchButton.addEventListener('click', async (e) => {
    const previousCard = document.querySelector('.weather--card');
    if (previousCard) {
        previousCard.remove();
    }
    
    e.preventDefault();
    city_name = searchInput.value;
    let weather = await getWeather(city_name);
    console.table(weather);
    let temperature = Math.round(weather.list[0].main.temp - 273.15);


    let card = document.createElement('div');
    card.classList.add('weather--card');

    let title = document.createElement('h2');
    title.classList.add('weather--card_title');
    title.textContent = city_name + ' ' + emojiFlags(weather);

    let temp = document.createElement('p');
    temp.classList.add('weather--card_temp');
    temp.textContent = emojiTemperature(weather) + ' ' + temperature + '°C';

    let description = document.createElement('p');
    description.classList.add('weather--card_description');
    description.textContent = emojiWeather(weather) + ' ' + weather.list[0].weather[0].description;

    card.appendChild(title);
    card.appendChild(temp);
    card.appendChild(description);

    weatherInfo.appendChild(card);
});

compareButton.addEventListener('click', async (e) => {
    e.preventDefault();
    city_name = searchInput.value;
    let city = await getCities(city_name);
    let lat = city[0].lat;
    let lon = city[0].lon;
    let weather = await getWeather(lat, lon);
    let temperature = Math.round(weather.list[0].main.temp - 273.15);


    let card = document.createElement('div');
    card.classList.add('weather--card');

    let title = document.createElement('h2');
    title.classList.add('weather--card_title');
    title.textContent = city_name + ' ' + emojiFlags(weather);

    let temp = document.createElement('p');
    temp.classList.add('weather--card_temp');
    temp.textContent = emojiTemperature(weather) + ' ' + temperature + '°C';

    let description = document.createElement('p');
    description.classList.add('weather--card_description');
    description.textContent = emojiWeather(weather) + ' ' + weather.list[0].weather[0].description;

    card.appendChild(title);
    card.appendChild(temp);
    card.appendChild(description);

    weatherInfo.appendChild(card);

});
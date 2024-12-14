let API_WEATHER_URL;
let API_CITIES_URL;
let API_IMAGE_URL;

const searchInput = document.querySelector('.search--form_input');
const searchButton = document.querySelector('.search--form_button');
const compareButton = document.querySelector('#search--form_button_compare');
const weatherInfo = document.querySelector('.weather');
const background = document.querySelector('body');
const flags = await getFlags();
const defaultBackground = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
const backgroundLink = document.querySelector('.footer--link');
let city_name = "";

function getUserLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                return resolve([position.coords.latitude, position.coords.longitude]);
            },
            error => {
                reject(error);
            }
        );
    });
}

async function getCities(city_name) {
    API_CITIES_URL = `https://13-weather-api.vercel.app/cities/${city_name}`;
    try {
        const response = await fetch(API_CITIES_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return;
    }
}

async function getWeather(city_name) {
    API_WEATHER_URL = `https://13-weather-api.vercel.app/weather/${city_name}`;
    try {
        const response = await fetch(API_WEATHER_URL);
        const weather = await response.json();
        return weather;
    } catch (error) {
        console.error(error);
        return;
    }
}

async function getLocationWeather() {
    const [latitude, longitude] = await getUserLocation();
    const latitudeShort = latitude.toString().slice(0, 5);
    const longitudeShort = longitude.toString().slice(0, 5);
    API_WEATHER_URL = `https://13-weather-api.vercel.app/weather/${latitudeShort}/${longitudeShort}`;
    try {
        const response = await fetch(API_WEATHER_URL);
        const weather = await response.json();
                
        return weather;
    } catch (error) {
        console.error(error);
        return;
    }
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

async function getRandomBackground() {
    API_IMAGE_URL = `https://13-weather-api.vercel.app/image`;
    try {
        // const response = await fetch(API_IMAGE_URL);
        // const data = await response.json();
        
        // const image = data.urls.full;
        // background.style.backgroundImage = `url(${image})`;
        background.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${defaultBackground})`;
    } catch (error) {
        background.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${defaultBackground})`;
        backgroundLink.href = defaultBackground;
        console.error(error);
        return;
    }
}

function time() {
    const date = new Date();
    const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateString = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    
    document.querySelector('.clock--date').textContent = dateString;
    document.querySelector('.clock--time').textContent = timeString;
}

async function displayLocationWeather() {
    try {
        const weather = await getLocationWeather();
        const temperature = Math.round(weather.list[0].main.temp - 273.15);
        const city_name = weather.city.name + ', ' + weather.city.country;

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
    } catch (error) {
        console.error(error);
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
    const previousCards = document.querySelectorAll('.weather--card');
    previousCards.forEach(card => card.remove());
    
    e.preventDefault();
    city_name = searchInput.value;
    let weather = await getWeather(city_name);
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
    searchInput.value = '';
});

compareButton.addEventListener('click', async (e) => {
    e.preventDefault();
    city_name = searchInput.value;
    let weather = await getWeather(city_name);
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
    searchInput.value = '';
});




setInterval(time, 1000);
getRandomBackground();
getUserLocation();
displayLocationWeather();



import API_KEY from './API_KEY.js';

let API_WEATHER_URL;
let API_CITIES_URL;

const searchInput = document.querySelector('.search--form_input');
const searchButton = document.querySelector('.search--form_button');
const weatherInfo = document.querySelector('.weather');
const flags = await getFlags();

let city_name = "";

async function getCities(city_name) {
    API_CITIES_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=10&appid=${API_KEY}`;
    const response = await fetch(API_CITIES_URL);
    const data = await response.json();
    return data;
    
}

async function getWeather(lat, lon) {
    API_WEATHER_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(API_WEATHER_URL);
    const weather = await response.json();
    return weather;
}

async function getFlags() {
    return fetch('../js/flags.json')
        .then(response => response.json())
        .catch(error => console.error(error));
}

// function emoji(weather) {
//     switch (weather.) {
//         case value:
            
//             break;
    
//         default:
//             break;
//     }
// }

searchInput.addEventListener('keyup', async (e) => {

    
    city_name = e.target.value;    
    let cities = await getCities(city_name);

    for (const city of cities) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            continue;
        }
        const option = document.createElement('option');
        option.value = city.name + ', ' + city.country + ', ' + city.state;
        document.querySelector('#cities').appendChild(option);
    }
});

searchButton.addEventListener('click', async (e) => {
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
    title.textContent = city_name;

    let temp = document.createElement('p');
    temp.classList.add('weather--card_temp');
    temp.textContent = temperature + '°C';

    let description = document.createElement('p');
    description.classList.add('weather--card_description');
    description.textContent = weather.list[0].weather[0].description;

    card.appendChild(title);
    card.appendChild(temp);
    card.appendChild(description);

    weatherInfo.appendChild(card);
    console.log(weather);
    

});


    


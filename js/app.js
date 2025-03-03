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

async function getWeather(city_name) {
    const API_WEATHER_URL = `https://13-weather-api.vercel.app/weather/${city_name}`;
    try {
        const response = await fetch(API_WEATHER_URL);
        const weather = await response.json();

        if (!weather) {
            console.log('No weather found');
            return;
        }

        const country = weather.city.country;
        const flag = await emojiFlags(country);

        const tempEmoji = emojiTemperature(weather);
        const weatherEmoji = emojiWeather(weather);

        if (!tempEmoji || !weatherEmoji || !flag) {
            console.log('No emoji found');
            return;
        }

        return { weather, flag, tempEmoji, weatherEmoji };
    } catch (error) {
        console.error(error);
        return;
    }
}

async function getLocationWeather(location) {
    if (!location) {
        console.log('No location found');
        return;
    }

    const lat = location[0].toString().slice(0, 5);
    const lon = location[1].toString().slice(0, 5);

    const API_WEATHER_URL = `https://13-weather-api.vercel.app/weather/${lat}/${lon}`;
    
    try {
        const response = await fetch(API_WEATHER_URL);
        const weather = await response.json();

        if (!weather) {
            console.log('No weather found');
            return;
        }

        const country = weather.city.country;
        const flag = await emojiFlags(country);

        const tempEmoji = emojiTemperature(weather);
        const weatherEmoji = emojiWeather(weather);

        if (!tempEmoji || !weatherEmoji || !flag) {
            console.log('No emoji found');
            return;
        }

        return { weather, flag, tempEmoji, weatherEmoji };
    } catch (error) {
        console.error(error);
        return;
    }
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
    let temp = weather.list[0].main.temp;
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

function emojiFlags(country) {
    const flags = require('@/data/flags.json');
    
    const flag = flags.find(flag => flag.code === country);
    if (flag) {
        return flag.emoji;
    }
    return '';
}

export { getWeather, getLocationWeather };
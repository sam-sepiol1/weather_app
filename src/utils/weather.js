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
    return '';
}
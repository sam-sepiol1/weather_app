async function getCities(city_name) {
    let API_CITIES_URL = `https://13-weather-api.vercel.app/cities/${city_name}`;
    try {
        const response = await fetch(API_CITIES_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return;
    }
}

export { getCities };
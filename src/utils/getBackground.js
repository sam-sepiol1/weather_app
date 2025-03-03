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
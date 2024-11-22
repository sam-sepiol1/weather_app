# Pseudo Code for Weather App

## HTML

1. Create a form with an input field for the city name.
2. Add a submit button to the form.
3. Create a section to display the weather forecast.

## CSS

1. Style the form and input field.
2. Style the submit button.
3. Style the weather forecast display section.

## JavaScript

1. Add an event listener to the form for the submit event.
2. On form submit:
    - Prevent the default form submission.
    - Get the city name from the input field.
    - Fetch autocomplete suggestions from the GEOCODING API.
    - Display autocomplete suggestions to the user.
3. When the user selects a suggestion:
    - Fetch the 5-day weather forecast from the OpenWeatherMap API using the selected city.
    - Parse the API response.
    - Display the weather forecast for the next 5 days in the weather forecast section.

## API Integration

1. GEOCODING API:
    - Use the API to get autocomplete suggestions based on the user's input.
2. OpenWeatherMap 5 Day Weather Forecast API:
    - Use the API to get the weather forecast for the selected city.

## Error Handling

1. Handle errors for network issues.
2. Handle errors for invalid city names.
3. Display appropriate error messages to the user.

## Project Structure

```
/WeatherApp
|-- /admin
|   |-- pseudo code.md
|   |-- instruction.md
|-- /css
|   |-- style.css
|-- /js
|   |-- app.js
|-- /styles
|   |-- _styles.scss
|-- index.html
|-- style.scss
|-- readme.md
```

mkdir -p WeatherApp/{admin,css,js,styles} && touch {css/style.css,js/app.js,styles/_styles.scss,index.html,style.scss}

# Functional Programming Weather App with Vanilla JavaScript

This project is a Functional Programming (FP) implementation of a Weather App using asynchronous JavaScript functions. The app utilizes the OpenWeatherMap API for weather data and the Countries API for city suggestions.

### [*Live site*](https://rakibhossainraju.github.io/weather-app/)


## Features

- **Functional Approach**: The code follows a functional programming paradigm, promoting immutability and pure functions.
- **Async/Await**: Asynchronous functions are employed to handle API requests, enhancing responsiveness.
- **Clean UI Interaction**: The UI is managed through functional programming principles, with clear separation of concerns for enhanced readability.

## Functions

### `makeWeatherApiRequest(cityName)`

Asynchronously fetches weather data for a given city.

### `makeCountryApiRequest()`

Asynchronously retrieves a list of cities from the Countries API.

### `updateUiWithWeatherData(weatherData, uiElements)`

Updates the UI with weather data, extracting relevant information and setting corresponding HTML elements.

### `generateSuggestionLiTemplate(textContent)`

Generates an HTML template for a suggested city name.

### `showSuggestedCityNameOnUi(uiElements, filteredCities)`

Displays suggested city names on the UI based on user input.

### `initializeApp()`

Sets up the app by defining event listeners, handling form submissions, and managing UI interactions.

## Usage

1. Clone the repository.
2. Open the `index.html` file in a web browser.
3. Enter a city name in the search bar and submit the form to get weather information.

## Functional Programming Principles

- **Immutability**: Functions are designed to avoid mutating data, promoting the creation of new data structures.
- **Pure Functions**: Functions are side-effect-free and deterministic, ensuring consistent behavior with the same inputs.
- **Async/Await**: Asynchronous operations are handled using `async/await` for cleaner and more readable code.
- **Separation of Concerns**: Functions are specialized for specific tasks, enhancing code maintainability and modularity.

Feel free to explore and modify the code to suit your preferences or extend the functionality. Enjoy exploring the world of functional programming with this Weather App!

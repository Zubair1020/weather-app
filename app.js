async function makeWeatherApiRequest(cityName) {
  const apiKey = "6d07dbd973fa3969b78bcb1de1e58f0c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw {
        message: `Weather API request failed with status ${res.status}`,
        status: res.status,
      };
    }

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

//accessing only the city names;
async function makeCountryApiRequest() {
  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries");
    if (!res.ok) {
      throw {
        message: `Country API request failed with status ${res.status}`,
        status: res.status,
      };
    }
    const { data } = await res.json();
    const cities = data
      .map((countyWithDetails) => countyWithDetails.cities)
      .reduce((cities, array) => cities.concat(array), []);

    return cities;
  } catch (error) {
    throw error;
  }
  // const citiesMapData = data.map((data) => data.cities);
  // const cities = [];
  // citiesMapData.forEach((citiesData) => {
  //   cities.push(...citiesData);
  // });
}

function updateUiWithWeatherData(weatherData, uiElements) {
  const {
    weather,
    main: { temp, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = weatherData;

  const { description, icon } = weather[0];

  const {
    weatherImgElement,
    weatherDetailsElement,
    temperatureElement,
    cityNameElement,
    countryNameElement,
    humidityElement,
    windSpeedElement,
  } = uiElements;
  const imageUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  weatherDetailsElement.textContent = description;
  weatherImgElement.style.backgroundImage = `url(${imageUrl})`;
  cityNameElement.textContent = name;
  countryNameElement.textContent = country;
  temperatureElement.textContent = Math.round(temp);
  humidityElement.textContent = humidity;
  windSpeedElement.textContent = speed;
}

function generateSuggestionLiTemplate(textContent) {
  const li = `<li class="search-bar__suggestion">${textContent}</li>`;
  return li;
}

function showSuggestedCityNameOnUi(uiElements, filteredCities) {
  const listElements = filteredCities.map((cityName) =>
    generateSuggestionLiTemplate(cityName)
  );
  uiElements["suggestionsElement"].innerHTML = listElements.join("");

  const suggestedLiElements = uiElements["suggestionsElement"].querySelectorAll(
    ".search-bar__suggestion"
  );
  suggestedLiElements.forEach((liElement) => {
    liElement.addEventListener("click", function () {
      uiElements["inputElement"].value = this.innerText;
      uiElements["suggestionsElement"].innerHTML = "";
      uiElements["suggestionsElement"].classList.remove("active");
    });
  });
}

function initializeApp() {
  const qs = document.querySelector.bind(document);
  const uiElements = {
    formElement: qs(".search-bar"),
    inputElement: qs(".search-bar__input"),
    suggestionsElement: qs(".search-bar__suggestions"),
    inputWrapperElement: qs(".search-bar__input-wrapper"),
    weatherImgElement: qs(".weather-card__weather-image"),
    weatherDetailsElement: qs(".weather-card__weather-description"),
    temperatureElement: qs(".weather-card__temperature-value"),
    cityNameElement: qs(".weather-card__city"),
    countryNameElement: qs(".weather-card__country"),
    humidityElement: qs(".weather-card__humidity-text-value"),
    windSpeedElement: qs(".weather-_wind-text-value"),
  };

  //a small f() to add some style.
  uiElements["inputWrapperElement"].addEventListener("click", function () {
    this.classList.add("active");
  });
  uiElements["formElement"].addEventListener("submit", handelSubmit);
  uiElements["inputElement"].addEventListener("input", handelTyping);

  function handelSubmit(event) {
    event.preventDefault();
    //select the input value from the (form = this) vai input name
    const cityName = this.searchBarInput.value.trim();

    if (!cityName) {
      alert("Please enter a valid city name first");
      return;
    }
    makeWeatherApiRequest(cityName)
      .then((weatherData) => {
        updateUiWithWeatherData(weatherData, uiElements);
        this.searchBarInput.value = "";
        uiElements["suggestionsElement"].innerHTML = "";
      })
      .catch((error) => {
        switch (error.status) {
          case 404:
            alert(
              "The city name does not exist.\nPlease try to add a valid city name"
            );
            break;
          default:
            console.log(error.message);
        }
      });
  }

  function handelTyping() {
    const cityPrefix = this.value.trim();

    if (!cityPrefix) {
      uiElements["suggestionsElement"].classList.remove("active");
      return;
    }

    makeCountryApiRequest().then((cities) => {
      const filteredCities = cities
        .filter((city) =>
          city.toLowerCase().startsWith(cityPrefix.toLowerCase())
        )
        .slice(0, 5);
      filteredCities.length
        ? (showSuggestedCityNameOnUi(uiElements, filteredCities),
          uiElements["suggestionsElement"].classList.add("active"))
        : uiElements["suggestionsElement"].classList.remove("active");
    });
  }
}

window.onload = initializeApp;

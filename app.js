// Select elements
const NOTIFICATION =  document.getElementById('notification')
const WEATHER_ICON = document.querySelector('.weather-icon')
const TEMPERATURE_VALUE = document.querySelector('.temperature-value p')
const TEMPERATURE_DESCRIPTION = document.querySelector('.temperature-description p')
const TEMPERATURE_LOCATION = document.querySelector('.location p')

// App const and variables
const KELVIN = 273
// Api Key
const KEY = '67243aef030242d32b8c96eaecb9c3f7'

// Select Weather
const WEATHER = {
    temperature: {
        value: 22,
        unit: 'celsius'
    },

    description: 'nublado',
    iconId: '01d',
    city: 'Montevideo',
    country: 'UY'
};

// Check if browser supports Geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    NOTIFICATION.style.display = "block";
    NOTIFICATION.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// Get location from the browser
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

// Show error if geolocation does not works
function showError(error){
    NOTIFICATION.style.display = "block";
    NOTIFICATION.innerHTML = `<p>${error.message}</p>`;
}

// Get weather from API 
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;

    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        WEATHER.temperature.value = Math.floor(data.main.temp - KELVIN);
        WEATHER.description = data.weather[0].description;
        WEATHER.iconId = data.weather[0].icon;
        WEATHER.city = data.name;
        WEATHER.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

// Change icon and value of the Weather
function displayWeather(){
    WEATHER_ICON.innerHTML =
    `<img src="icon/${WEATHER.iconId}.svg"/>`;

    TEMPERATURE_VALUE.innerHTML =
    `${WEATHER.temperature.value}°<span>C</span>`;

    TEMPERATURE_DESCRIPTION.innerHTML = 
    WEATHER.description;

    TEMPERATURE_LOCATION.innerHTML =
    `${WEATHER.city}, ${WEATHER.country}`;
}


// Change unit from Fahrenheit to Celsius
function cToF(temperature){
    return (temperature * 9/5) + 32;
}

// // Event Click to change unit from F to C
TEMPERATURE_VALUE.addEventListener('click', function(){

    if (WEATHER.temperature.value === 'undefined') return;

    if (WEATHER.temperature.unit == 'celsius') {
        let fahrenheit = cToF(WEATHER.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        TEMPERATURE_VALUE.innerHTML = `${fahrenheit}°<span>F</span>`;
        WEATHER.temperature.unit = 'fahrenheit'

    } else {
        TEMPERATURE_VALUE.innerHTML = `${WEATHER.temperature.value}°<span>C</span>`;
        WEATHER.temperature.unit = 'celsius'
    }
})
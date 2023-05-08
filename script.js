const searchBox = document.querySelector('.search-box');
const searchButton = document.querySelector('.search-button');
const degrees = document.querySelector('.degrees');
let searchValue = "";
const API = "9c8a28d57e8832db50554c367dc2c06e";
let apiResponse = [];
const currentCity = document.querySelector('.current-city');
const descriptionWeather = document.querySelector('.description-weather')
const feelsLike = document.querySelector('.feels-like')

function onChangeInput(event) {
    //console.log(event.target.value)
    searchValue = event.target.value
}

function searchWeather() {
    if (searchValue != "") {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&APPID=${API}&units=metric&lang=ru`).then(response => response.json()).then(response => {
            degrees.innerHTML = `${Math.floor(response.main.temp)}°C`
            descriptionWeather.innerHTML = `${response.weather[0].description}`;
            feelsLike.innerHTML = `Чувствуется как: ${Math.floor(response.main.feels_like)}°C`
            console.log(response)
        })
    }
}

searchBox.addEventListener("input", onChangeInput)
searchButton.addEventListener("click", searchWeather)

function getPositionSuccess(position) {
    //console.log(position)
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=ru`).then(response => response.json()).then(response => {
        searchValue = response.city
        searchBox.value = response.city
        searchWeather()
        currentCity.innerHTML = `${response.city}, ${response.countryName}`
        //console.log(response)
    })
}
function getPositionFailed() {
    alert("Ошибка получения данных")
}

navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionFailed)

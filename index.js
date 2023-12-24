const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchContainer = document.querySelector("[data-searchForm]");
const loadingContainer = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-weather-info");
const searchInput = document.querySelector("[data-searchInput]");
const searchForm = document.getElementById("searchForm");

let currentTab = userTab; 
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");

function switchTab(clickedTab) {
    if (clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if (!searchContainer.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchContainer.classList.add("active");
        } else {
            searchContainer.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click", () => {
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});

function getfromSessionStorage(){
    let localCoordinates = sessionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        grantAccessContainer.classList.add("active");
    } else {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    grantAccessContainer.classList.remove("active");
    loadingContainer.classList.add("active");
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        loadingContainer.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (error) {
        console.error("Error fetching user weather info:", error);
    }
}

function renderWeatherInfo(weatherInfo) {
    const cityName= document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-country-icon]");
    const description = document.querySelector('[data-weatherDesc]');
    const weatherIcon = document.querySelector('[data-weatherIcon]');
    const temp = document.querySelector('[data-temp]');
    const windspeed = document.querySelector('[data-windspeed]');
    const humidity = document.querySelector('[data-humidity]');
    const cloudiness = document.querySelector('[data-cloud]');
 
    cityName.innerText = weatherInfo?.name || "Unknown";
    countryIcon.src = `https://flagcdn.com/144x108/${(weatherInfo?.sys?.country || '').toLowerCase()}.png`;
    
    description.innerText = weatherInfo.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = `${weatherInfo?.main?.temp.toFixed(2)} °C`;
    windspeed.innerText = `${weatherInfo?.wind?.speed.toFixed(2)} m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity.toFixed(2)} %`;
    cloudiness.innerText = `${weatherInfo?.clouds?.all.toFixed(2)} %`;
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        grantAccessButton.style.display = 'none'; 
    }
}

function showPosition(position){
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude
    };
    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click", getLocation());

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;
    if (cityName === "") {
        return;
    } else {
        fetchSearchWeatherInfo(cityName);
    }
});

async function fetchSearchWeatherInfo(city) {
    loadingContainer.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        if (!data.sys) {
            throw data;
        }
        loadingContainer.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (err) {
        console.error("Error fetching search weather info:", err);
    }
}

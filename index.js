// call an API
/*{

const api_key = "d1845658f92b31c64bd94f06f7188c9c";

async function showWeather() {
 
    try{  let latitude = 22.7133;
    let longitude = 90.3496;


    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api_key}`);
    const data = await response.json();
    
    console.log( "weather", data);
let newpara = document.createElement('p');
newpara.textContent = `${data?.main?.temp.toFixed(2)}°f`;
document.body.appendChild(newpara);
 }catch(err){
    console.log("Error");
 }

  
}

 
showWeather();
}
// finding out longitude and latitude
function getlocatio()
{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log("NO GEOLOCATION");
    }

}
function showPosition(position){
    let lat = position.coords.latitude;
    let longi = position.coords.longitude;
     
    console.log(lat);
    console.log(longi);
      
}

getlocatio();
*/ 

const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
const searchContainer = document.querySelector("[data-searchForm]");
const loadingContainer = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-weather-info");

// Initial variable
let currentTab = userTab; 
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
currentTab.classList.add("current-tab");

function switchTab(clickedTab) {
    if (clickedTab != currentTab) {
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchContainer.classList.contains("active")) {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchContainer.classList.add("active");
        }
        else{
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
// check if co-ordinates are already present in session storage
function getfromSessionStorage(){
 let localCoOrinate = sessionStorage.getItem("user-coordinates");
 if(!localCoOrinate){
    grantAccessContainer.classList.add("active");
 }
 else{
    const coordinates = JSON.parse(localCoOrinate);
    fetchUserInfo(coordinates);
 }
}

async function fetchUserInfo(coordinates){
    const {lat,lon} = coordinates;
    grantAccessContainer.classList.remove("active");
    loadingContainer.classList.add("active");
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);

        const data = await response.json();

        loadingContainer.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    } catch (error) {
        
    }
}

function renderWeatherInfo(){

    const cityName= document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-country-icon]");
    const description = document.querySelector('[data-weatherDesc]');
    const weatherIcon = document.querySelector('[data-weatherIcon]');
    const temp = document.querySelector('[data-temp]');
    const windspeed = document.querySelector('[data-windspeed]');
    const humidity = document.querySelector('[data-humidity]');
    const cloudiness = document.querySelector('[data-cloud]');

}
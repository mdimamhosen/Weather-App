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
const searchContainer = document.querySelector(".search-container");
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
    }
}

userTab.addEventListener("click", () => {
    switchTab(userTab);
});

searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});

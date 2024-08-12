// ee1da1770ebae1852587f0cfc3c9ee51
// Sk4.ahsan.blad44

// SETTING DATE OBJECT
const dateObject = new Date()
const months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
]; 
const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const currentMonth = months[dateObject.getUTCMonth()]
const curretDayNum = dateObject.getUTCDate()
const currentDayNam = daysOfWeek[ dateObject.getUTCDay()]



// DOM DATA DECLARATION 
let DOMdate = document.getElementById("date")
let DOMtemp = document.getElementById('temperature')
let DOMhumidity = document.getElementById("humidity")
let DOMvisibility = document.getElementById("visibility")
let DOMwind = document.getElementById("wind")
let DOMdescription = document.getElementById("description")
let locationInput = document.getElementById('search-input')

// SETTING DATE
DOMdate.innerHTML = `${currentDayNam},${curretDayNum} ${currentMonth} `;
console.log(currentMonth);


// CONNECTING TO THE API
let fetchWeatherAPI = async ()=>{
    
   
    try {
        let theLocation = '';
        if (locationInput.value == '') {
            theLocation = 'new york';
        }else{
            theLocation = locationInput.value;
        }
        console.log(locationInput.value);
        // if locationInput.value == '' ?  locationInput.value = 'new york':locationInput;
        let weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${theLocation}&appid=ee1da1770ebae1852587f0cfc3c9ee51`,
        {
            headers : {
                Accept : "application/json"
            }
        }
    )
    let weatherData = await weatherPromise.json()
    console.log(weatherData);
    // TEMPRATUR
    DOMtemp.innerHTML = `${Math.floor(weatherData.main.temp - 273)}°`
    // WIND
    DOMwind.innerHTML = `${Math.floor(weatherData.wind.speed )} km/h`
    // HUMIDITY
    DOMhumidity.innerHTML = `${weatherData.main.humidity } %`
    // VISIBILITY
    if (weatherData.visibility >= 1000) {
        DOMvisibility.innerHTML =` ${(weatherData.visibility / 1000).toFixed(weatherData.visibility % 1000 !== 0 ? 1 : 0)} k`;
        
    }else{
        DOMvisibility.innerHTML = weatherData.visibility ;
    }
    // DESCRIPTION
    DOMdescription.innerHTML = weatherData.weather[0].description

    //  = `${  Math.floor(weatherData.visibility )} k`
    } catch (error) {
        console.log(error);
    }
    
}
fetchWeatherAPI()

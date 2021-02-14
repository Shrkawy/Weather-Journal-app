/* Global Variables */
const tempValue = document.getElementById('temp');
const tempLocation = document.getElementById('location');
const tempDescription = document.getElementById('description');
const tempContent = document.getElementById('content');
const btn = document.getElementById('generate');
const dateElement = document.getElementById('date');

// Weather Objects
const weather = {};
weather.temperature = {
    unit: "f"
};
let serverData = {};

// Create a new date instance dynamically with JS
function displayDate() {
    const date = new Date();
    const toDayDate = { month: "short", day: "numeric", weekday: "short" };
    dateElement.innerHTML = date.toLocaleDateString("en-US", toDayDate);
}

// Button EventListener 

btn.addEventListener('click', async () => {
    let zipCode = document.getElementById('zip').value;
    let feeling = document.getElementById('feelings').value;

    if (!zipCode) {
        return alert('Please Enter your Zip Code')
    }
    if (!feeling) {
        return alert('please enter your feeling')
    }
    getWeather(zipCode, feeling)
})

// Fetch API Function
const getWeather = async (zipCode, feeling) => {
    const APIKey = '0a3a43374ac9f65e3079075ad719768f';
    let API = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${APIKey}&units=imperial`;

    try {
        const res = await fetch(API);
        const data = await res.json();
        await changeWeatherObject(data, feeling);
        await postWeather('/post-weather', weather);
        await getServerWeather('/get-weather');
        displayWeather();
    } catch (error) {
        console.log(error);
        alert('Something went wrong! please try again');
    }
};

// Update weather object
const changeWeatherObject = async (data, feeling) => {
    weather.feeling = feeling;
    weather.temperature.value = Math.floor(data.main.temp);
    weather.description = data.weather[0].description;
    weather.city = data.name;
    weather.country = data.sys.country;
}

// POST Function to send data to server
const postWeather = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res.json();
}

// GET function to get data from server
const getServerWeather = async url => {
    try {
        const res = await fetch(url);
        const data = await res.json();
        serverData = data;
    } catch (error) {
        console.log(error);
        alert('Something went wrong! please try again');
    }
}

// Update UI Function
const displayWeather = () => {
    tempValue.innerHTML = `temprature: ${serverData.temperature.value}°<span>F</span>`;
    tempLocation.innerHTML = `I'm living in ${serverData.city}, ${serverData.country}`;
    tempDescription.innerHTML = `Status: ${serverData.description}`;
    tempContent.innerHTML = `I'm feeling ${serverData.feeling}`;
    displayDate();
};
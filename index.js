//Grabbing HTML elements
const form = document.querySelector('form:first-of-type')
const weatherSection = document.getElementById('weather')

form.onsubmit = async e => {
    //Prevent default form function
    e.preventDefault()
    // //Grab user input
    const searchTerm = form.search.value.trim()
    //Check for a user input
    if(!searchTerm) return
    //reset form
    form.search.value = ""
    try {
        //fetch API information
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather/?units=imperial&appid=f11e5038feccf0030bec41086ba452c4&q=${searchTerm}`)
        //Display error if no location found
        if (res.status !== 200) throw new Error('Location Not Found')
        //transform to json
        const weatherData = await res.json()
        //display weather information
        renderWeather(weatherData)
    //catch errors
    } catch(err) {
        weatherSection.innerHTML = err.message
    }
}

//function for displaying weather information
const renderWeather = ({
    //putting specific data from openweather for use
    name,
    dt,
    sys: {
        country
    },
    coord: {
        lat,
        lon
    },
    main: {
        temp,
        feels_like
    },
    weather: [{
        icon,
        main,
        description
    }]
}) => {

    //Last updated time converter
    const date = new Date (dt * 1000)
    const timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })

    //weather information section & reset
    weatherSection.innerHTML = `<h2>${name}, ${country}</h2>
    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="__BLANK">Click to view map</a>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${main}">
    <p style="text-transform: capitalize">${description}</p>
    <br>
    <p>Current: ${temp}&deg F</p>
    <p>Perceived: ${feels_like}&deg F</p>
    <br>
    <p>Last updated: ${timeString}</p>`
}
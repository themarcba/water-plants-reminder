const fetch = require('node-fetch')

// Fetch weather data for fiven date
const fetchWeatherData = async (date) => {
    const url = new URL('https://api.weatherapi.com/v1/history.json')
    url.search = new URLSearchParams({
        key: process.env.WEATHER_API_KEY,
        query: process.env.LOCATION,
        dt: date.toISOString().split('T')[0],
    })
    const response = await fetch(url)
    const data = await response.json()
    return data
}

module.exports = { fetchWeatherData }

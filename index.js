// .env
require('dotenv').config()

// NPM imports ---------------------------------------------
const cron = require('node-cron')

// Local imports
require('./express') // Starts web server inside
const twilio = require('./helpers/twilio')
const db = require('./helpers/db')
const { fetchWeatherData } = require('./helpers/fetch')
const {
    getPercipitationAverage,
    getAverageDayTemperature,
} = require('./helpers/weather')

// Constants -----------------------------------------------
const PERCIPITATION_TRIGGER_POINT = 0.5
const TEMPERATURE_TRIGGER_POINT = 25

// Morning routine -----------------------------------------
const runMorning = async () => {
    try {
        const weatherData = await fetchWeatherData(new Date())
        const precipitationAverage = getPercipitationAverage(weatherData)

        if (precipitationAverage < PERCIPITATION_TRIGGER_POINT) {
            twilio.send(
                `Water the plants 🌱💧.\nPrecipitation average this morning: ${precipitationAverage} mm/hr`,
            )
            db.write(
                `Water the plants 🌱💧. Precipitation average this morning: ${precipitationAverage} mm/hr`,
            )
        } else {
            console.log('It rained enough. No need to water the plants.')
            db.write('It rained enough. No need to water the plants.')
        }
    } catch (error) {
        console.log(error.message)
    }
}

// Evening routing -----------------------------------------
const runEvening = async () => {
    try {
        const weatherData = await fetchWeatherData(new Date())
        const temperatureAverage = getAverageDayTemperature(weatherData)
        if (temperatureAverage > TEMPERATURE_TRIGGER_POINT) {
            twilio.send(
                `Water the plants 🌱💧.\Today was an exceptionally warm day with an average of ${temperatureAverage}°C`,
            )
            db.write(
                `Water the plants 🌱💧. Today was an exceptionally warm day with an average of ${temperatureAverage}°C`,
            )
        } else {
            db.write(
                `Today was not an exceptionally warm day (${temperatureAverage} C). No need to water the plants!`,
            )
        }
    } catch (error) {
        console.log(error.message)
    }
}

// Schedule routines
cron.schedule('0 8 * * *', function () {
    runMorning()
})
cron.schedule('0 18 * * *', function () {
    runEvening()
})

runMorning()

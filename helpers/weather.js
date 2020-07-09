// Check if weather data is complete.
// Throw error if something's wrong
const checkDataForCompletion = (data) => {
    // The data needs to be there!
    if (!data || !data.forecast || !data.forecast.forecastday) {
        throw Error('Weather data incomplete')
    }
}

// Get percipitation average over the first 12 hours of the day
// Based on weather data, fetched in weather.js
const getPercipitationAverage = (data) => {
    checkDataForCompletion(data)

    // Filter hours before midday
    const hours = data.forecast.forecastday[0].hour.filter((hour) => {
        const refTime = new Date(hour.time)
        const midday = new Date(hour.time).setHours(12, 0, 0, 0)
        return refTime <= midday
    })

    // Calculate sum
    const sum = hours.reduce((acc, hour) => (acc += hour.precip_mm), 0)

    // Return average
    return (sum / hours.length).toFixed(3)
}


// Get average tempoerature of the day
// Based on weather data, fetched in weather.js
const getAverageDayTemperature = (data) => {
    return data.forecast.forecastday[0].day.avgtemp_c
}

module.exports = { getPercipitationAverage, getAverageDayTemperature }

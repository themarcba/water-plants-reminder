const db = require('./db')

// Init Twilio client
const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
)

// Censor phone number
const censorNumber = (number) => {
    return `${number.slice(0, 4)}*******${number.slice(number.length - 2)}`
}

// Send SMS
const send = (text) => {
    const numbers = process.env.TWILIO_NUMBERS_TO.split(',')

    // Production mode. REALLY send it
    if (process.env.NODE_ENV === 'production') {
        numbers.forEach((number) => {
            client.messages
                .create({
                    body: text,
                    from: process.env.TWILIO_NUMBER_FROM,
                    to: number,
                })
                .then((message) =>
                    db.write(`SMS sent to ${censorNumber(number)}!`),
                )
                .done()
        })
    }
    // Development mode. Just write in the logs
    else {
        numbers.forEach((number) => {
            db.write(
                `Did not send SMS to ${censorNumber(
                    number,
                )} because the app is not running in production mode`,
            )
        })
    }
}

module.exports = { send }

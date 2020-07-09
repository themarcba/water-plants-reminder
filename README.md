# water-plants-reminder

This is a small over-engineered project I did to remind me to water my outside plants.

It runs at 8am and 6pm via `node-cron` and does the following:

-   In the mornings: Check if there will be or has been rain in the morning. (First 12 hours of the day). If that's not the case, send me an SMS via [Twilio](https://www.twilio.com) to remind me to water the plants.
-   In the evenings: Check if the average has been higher than `TEMPERATURE_TRIGGER_POINT` (defined in `index.js`). If that's the case, send me an SMS to water the plants again, because they need more water when it stays warm throughout the day.

## Tools used

-   [ClimaCell API](https://www.climacell.co/weather-api/) to fetch the weather data
-   [node-cron](https://www.npmjs.com/package/node-cron) to schedule the daily checks
-   [Twilio](https://twilio.com) to send the SMS
-   [lowdb](https://www.npmjs.com/package/lowdb) to keep a log

## How to use

### Environment variables

The following environment variables need to be set:

| Variable name        | Description                                                     | Example                              |
| -------------------- | --------------------------------------------------------------- | ------------------------------------ |
| `LOCATION`           | Location for which the weather API will look up the weather for | _New York City_                      |
| `WEATHER_API_KEY`    | ClimaCell API key                                               | _badc0ffeebadc0ffeeb4dc0ffeeb4dc_    |
| `TWILIO_ACCOUNT_SID` | Twilio Account SID                                              | _ACf00123f00123f00123f00123f00123f0_ |
| `TWILIO_AUTH_TOKEN`  | Twilio auth token                                               | _c4tbedc4tbedc4tbedc4tbedc4tbedc4_   |
| `TWILIO_NUMBER_FROM` | Number from which the SMS will be sent from                     | _+1234567890_                        |
| `TWILIO_NUMBERS_TO`  | Numbers to which the SMS will be send to (comma-separated)      | _+9876543210_                        |
| `PORT`               | Port on which the web server will run (default `3000`)          | _443_                                |

### Install

```bash
npm install
```

### Run development mode

```bash
npm run dev
```

### Run production mode

```bash
npm run start
```

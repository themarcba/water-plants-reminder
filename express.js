const express = require('express')
const db = require('./helpers/db')
const app = express()
const port = process.env.PORT || 3000

// Serve static frontend
app.use(express.static('./frontend'))

// JSON API for the logs
app.get('/log', (req, res) => {
    res.json(db.readAll())
})

// Init Ecpress server
app.listen(port, () => console.log(`Server running (:${port})`))

module.exports = app

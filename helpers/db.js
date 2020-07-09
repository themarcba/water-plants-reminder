const shortid = require('shortid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db.json')
const db = low(adapter)

// Create file if it doesn't already exist
db.defaults({ weather: [] }).write()

// Write a message to the log
const write = (message) => {
    db.get('weather')
        .push({ id: shortid.generate(), date: new Date(), message })
        .write()
}

// Read all messages from the log
const readAll = () => {
    db.read()
    return db.get('weather')
}

module.exports = { write, readAll }

require('dotenv/config')

const express = require('express')
const hbs = require('hbs')
const app = express()

require('./config')(app)

app.locals.appTitle = 'Characters'

require('./routes')(app)

require('./error-handling')(app)

module.exports = app

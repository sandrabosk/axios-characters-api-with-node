require('dotenv/config')

const express = require('express')

const app = express()

require('./config')(app)

app.locals.appTitle = `Axios`

require('./routes')(app)

require('./error-handling')(app)

module.exports = app

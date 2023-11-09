
require("dotenv/config")


const express = require("express")


const app = express()





app.locals.appTitle = `Characters!`


// const index = require("./routes/index.routes")
// app.use("/", index)                                                     //todo esto lo resume

// const charactersRoutes = require("./routes/characters.routes")
// app.use("/", charactersRoutes)

require("./config")(app)
require('./routes')(app)

require("./error-handling")(app)

module.exports = app

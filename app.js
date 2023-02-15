require("dotenv/config");
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);


app.locals.appTitle = 'CRUD XX_!'

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const charactersRoutes = require("./routes/characters.routes");
app.use("/characters", charactersRoutes);

require("./error-handling")(app);

module.exports = app;

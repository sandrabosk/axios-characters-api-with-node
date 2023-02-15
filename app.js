require("dotenv/config");
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);

app.locals.appTitle = `Character API`;

// Routes
const index = require("./routes/index.routes");
app.use("/", index);

const charactersRoutes = require("./routes/characters.routes");
app.use("/characters", charactersRoutes);

// Errors
require("./error-handling")(app);

module.exports = app;

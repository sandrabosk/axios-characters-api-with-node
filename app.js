require("dotenv/config");

const express = require("express");
const app = express();
const hbs = require("hbs");

require("./config")(app);

const projectName = "axios-characters-api";
const capitalized = require("./utils/capitalized");
app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

require('./routes')(app)

require("./error-handling")(app);

module.exports = app;

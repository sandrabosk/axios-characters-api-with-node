
require("dotenv/config");


require("./db");


const express = require("express");


const hbs = require("hbs");

const app = express();


require("./config")(app);


const capitalized = require("./utils/capitalized");
const projectName = "axios-characters-api";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;


require('./routes')(app)


require("./error-handling")(app);

module.exports = app;

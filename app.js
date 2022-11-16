
require("dotenv/config");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);


const capitalized = require("./utils/capitalized");
const projectName = "Charact";

app.locals.appTitle = `${capitalized(projectName)}`;

// 👇 Start handling routes here
require("./routes")(app)


require("./error-handling")(app);

module.exports = app;

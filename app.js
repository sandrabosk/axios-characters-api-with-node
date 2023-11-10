require("dotenv/config");
require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const capitalized = require("./utils/capitalized");
const projectName = "axios-characters-api";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here

require("./routes/index")(app)

require("./error-handling")(app);

module.exports = app;

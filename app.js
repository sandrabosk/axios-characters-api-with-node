
require("dotenv/config");


require("./db");


const express = require("express");


const hbs = require("hbs");

const app = express();


require("./config")(app);




const index = require("./routes/index.routes");
app.use("/", index);
require('./routes')(app)

const charactersRoutes = require("./routes/characters.routes");
app.use("/", charactersRoutes);


require("./error-handling")(app);

module.exports = app;

require("dotenv/config");

const express = require("express");
const app = express();

require("./config")(app);
app.locals.appTitle = `Characters APP`;

const index = require("./routes/index.routes");
app.use("/", index);

require("./routes")(app)

require("./error-handling")(app);

module.exports = app;

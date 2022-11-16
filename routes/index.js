
module.exports = app => {

    const indexRouter = require("./index.routes");
    app.use("/", indexRouter);

    const characteRoutes = require("./characters.routes");
    app.use("/characters", characteRoutes)
}
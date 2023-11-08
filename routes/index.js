module.exports = app => {

    const charactersRoutes = require("./characters.routes");
    app.use("/characters", charactersRoutes);

    const index = require("./index.routes")
    app.use("/", index)
}


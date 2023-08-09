module.exports = app => {

    const index = require("./index.routes");
    app.use("/", index);

    const charactersRoutes = require("./characters.routes");
    app.use("/", charactersRoutes);

}
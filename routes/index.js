module.exports = app => {
    const indexRoutes = require("./routes/index.routes");
    app.use("/", indexRoutes);
    const charactersRoutes = require("/characters.Routes")
    app.use("/personajes", characterRoutes)
}
module.exports = app => {

    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const characterRoutes = require("./characters.routes")
    app.use("/", characterRoutes)
}
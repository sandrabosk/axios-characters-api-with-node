module.exports = app => {

    // Index routes
    const indexRouter = require("./index.routes")
    app.use("/", indexRouter)


    // Characters routes
    const charactersRouter = require("./characters.routes")
    app.use("/personajes", charactersRouter)


}
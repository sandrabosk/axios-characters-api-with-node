module.exports = app => {

    const indexRouter = require('./index.routes')
    app.use('/', indexRouter)

    const charactersRouter = require('./characters.routes')
    app.use('/characters', charactersRouter)

}
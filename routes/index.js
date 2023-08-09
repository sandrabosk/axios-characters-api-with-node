module.exports = app => {
	const indexRoutes = require('./index.routes')
	app.use('/', indexRoutes)

	const charactersRoutes = require('./characters.routes.js')
	app.use('/', charactersRoutes)
}

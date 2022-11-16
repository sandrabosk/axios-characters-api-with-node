module.exports = (app) => {
	// Index
	const index = require("./index.routes");
	app.use("/", index);

	// Character
	const charactersRoutes = require("./characters.routes");
	app.use("/", charactersRoutes);
};

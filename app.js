// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "axios-characters-api";

app.locals.appTitle = `${capitalized(projectName)} created with IronLauncher`;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const charactersRoutes = require("./routes/characters.routes");
app.use("/", charactersRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;










// const express = require('express');
// const router = express.Router();

// const charactersApiHandler = require('../services/characters-api.service');



// router.get("/listado", (req, res, next) => {

//     charactersApiHandler
//         .getAllCharacters()
//         .then(response => res.render('characters/list', { characters: response.data }))
//         .catch(err => next(err))
// })


// router.get("/detalles/:character_id", (req, res, next) => {

//     const { character_id } = req.params

//     charactersApiHandler
//         .getOneCharacter(character_id)
//         .then(response => res.render('characters/details', { character: response.data }))
//         .catch(err => next(err))


// })

// router.get("/crear", (req, res, next) => {
//     res.render('characters/create')
// })

// router.post("/crear", (req, res, next) => {

//     const { name, weapon, occupation } = req.body

//     charactersApiHandler
//         .saveCharacter({ name, weapon, occupation })
//         .then(response => res.redirect(`/personajes/detalles/${response.data.id}`))
//         .catch(err => next(err))
// })


// router.get("/editar/:character_id", (req, res, next) => {

//     const { character_id } = req.params

//     charactersApiHandler
//         .getOneCharacter(character_id)
//         .then(response => res.render('characters/edit', { character: response.data }))
//         .catch(err => next(err))

// })


// router.post("/editar/:character_id", (req, res, next) => {

//     const { name, weapon, occupation } = req.body
//     const { character_id } = req.params

//     charactersApiHandler
//         .editCharacter(character_id, { name, weapon, occupation })
//         .then(response => res.redirect(`/personajes/detalles/${response.data.id}`))
//         .catch(err => next(err))
// })


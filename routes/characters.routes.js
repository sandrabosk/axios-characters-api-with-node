const router = require("express").Router();
const axios = require("axios");

const charactersApiHandler = require('../services/characters-api.service');

/* GET home page */
router.get("/characters", (req, res, next) => {

    charactersApiHandler
        .getAllCharacters()
        .then(responseFromAPI => res.render("characters/list-characters", { characters: responseFromAPI.data }))
        .catch(err => next(err))
});

router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res, next) => {

    const { name, weapon, occupation, debt } = req.body

    charactersApiHandler
        .createCharacter({ name, weapon, occupation, debt })
        .then(responseFromAPI => res.redirect(`/characters/${responseFromAPI.data.id}`))
        .catch(err => next(err))
})

router.get("/characters/:id", (req, res, next) => {

    const { id } = req.params
    charactersApiHandler
        .getOneCharacter(id)
        .then(responseFromAPI => res.render("characters/details-character", { character: responseFromAPI.data }))
        .catch(err => next(err))
});

router.get("/characters/:id/edit", (req, res, next) => {

    const { id } = req.params
    charactersApiHandler
        .getOneCharacter(id)
        .then(responseFromAPI => res.render("characters/edit-character", { character: responseFromAPI.data }))
        .catch(err => next(err))
})

router.post("/characters/:id/edit", (req, res, next) => {

    const { name, weapon, occupation, debt } = req.body
    const { id } = req.params

    charactersApiHandler
        .editCharacter(id, { name, weapon, occupation, debt })
        .then(responseFromAPI => res.redirect(`/characters/${responseFromAPI.data.id}`))
        .catch(err => next(err))
})

router.post("/characters/:id/delete", (req, res, next) => {

    const { id } = req.params

    charactersApiHandler
        .deleteCharacter(id)
        .then(() => res.redirect("/characters"))
        .catch(err => next(err))
})












module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
const router = require("express").Router();
const axios = require("axios");
const charactersApiHandler = require('../services/characters-api.service');

/* GET home page */

router.get("/characters", (req, res, next) => {

    charactersApiHandler
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))
})

router.get("/characters/:character_id", (req, res, next) => {
    const { character_id } = req.params

    charactersApiHandler
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
});

router.get("/character/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/character/create", (req, res, next) => {

    const { name, weapon, occupation } = req.body

    charactersApiHandler
        .saveCharacter({ name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})

router.get("/characters/:character_id/edit", (req, res, next) => {

    const { character_id } = req.params

    charactersApiHandler
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))

})

router.post("/characters/:character_id/edit", (req, res, next) => {

    const { name, weapon, occupation } = req.body
    const { character_id } = req.params

    charactersApiHandler
        .editCharacter(character_id, { name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})

router.post("/characters/:character_id/delete", (req, res, next) => {
    const { character_id } = req.params
    charactersApiHandler
        .deleteCharacter(character_id)
        .then(res.redirect("/characters"))
        .catch(err => next(err))
})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
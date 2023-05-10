const router = require("express").Router();
const axios = require("axios");

const charactersApiHandler = require('../services/characters-api.service');
const { responseFromAPI } = require("express");

router.get("/characters", (req, res, next) => {

    charactersApiHandler
        .getAllCharacters()
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render('characters/list-characters', { characters: responseFromAPI.data })
        })
        .catch(err => console.error(err))
});

router.get('/character/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/character/create', (req, res, next) => {
    const { name, weapon, occupation } = req.body

    charactersApiHandler
        .saveCharacter({ name, weapon, occupation })
        .then(responseFromAPI => res.redirect(`/character/${responseFromAPI.data.id}`))
        .catch(err => next(err))
})

router.get("/character/:id", (req, res, next) => {

    const { id } = req.params

    charactersApiHandler
        .getOneCharacter(id)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get("/character/edit/:id", (req, res, next) => {

    const { id } = req.params

    charactersApiHandler
        .getOneCharacter(id)
        .then(responseFromAPI => res.render('characters/edit-character', { character: responseFromAPI.data }))
        .catch(err => next(err))
})


router.post("/character/edit/:id", (req, res, next) => {

    const { name, weapon, occupation } = req.body
    const { id } = req.params

    charactersApiHandler
        .editCharacter(id, { name, weapon, occupation })
        .then(responseFromAPI => res.redirect(`/character/${responseFromAPI.data.id}`))
        .catch(err => next(err))
})

router.post('/characters/delete/:id', (req, res, next) => {
    const { id } = req.params

    charactersApiHandler
        .deleteCharacter(id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
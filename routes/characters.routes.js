const express = require('express');
const router = require("express").Router();

const ApiService = require('../services/characters.service')

const charactersApi = new ApiService()

/* GET home page */
router.get("/characters", (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res, next) => {

    const { name, weapon, occupation } = req.body

    charactersApi
        .saveCharacter({ name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.get('/characters/:character_id/edit', (req, res, next) => {

    const { character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))

})

router.post('/characters/:character_id/edit', (req, res, next) => {

    const { character_id } = req.params
    const { name, weapon, occupation } = req.body

    charactersApi
        .editCharacter(character_id, { name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.post('/characters/:character_id/delete', (req, res, next) => {

    const { character_id } = req.params

    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))

})

router.get("/characters/:character_id", (req, res, next) => {

    const { character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});



module.exports = router;


const express = require('express');
const router = express.Router();

const ApiService = require('../services/characters.service')

const charactersApi = new ApiService()



router.get("/characters", (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))
})



router.get("/characters/:character_id", (req, res, next) => {

    const { character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
})

router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/create", (req, res, next) => {

    const { name, weapon, occupation } = req.body

    charactersApi
        .saveCharacter({ name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.get("/characters/edit/:character_id", (req, res, next) => {

    const { character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})

router.post("/characters/edit/:character_id", (req, res, next) => {

    const { character_id } = req.params
    const { name, weapon, occupation } = req.body

    charactersApi
        .editCharacter(character_id, { name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.post("/characters/:character_id/delete", (req, res, next) => {

    const { character_id } = req.params

    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})





module.exports = router;



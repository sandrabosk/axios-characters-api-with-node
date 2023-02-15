const router = require("express").Router();
const axios = require("axios");

const ApiService = require('../services/characters.service')
const charactersApi = new ApiService()

// List
router.get("/list", (req, res, next) => {
    charactersApi
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))
})

// Details
router.get("/details/:character_id", (req, res, next) => {
    const { character_id } = req.params
    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
})

// Create
router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/create", (req, res, next) => {
    const { name, weapon, occupation } = req.body

    charactersApi
        .saveCharacter({ name, weapon, occupation })
        .then(() => res.redirect('/characters/list'))
        .catch(err => next(err))
})

// Edit
router.get("/edit/:character_id", (req, res, next) => {
    const { character_id } = req.params
    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})

router.post("/edit/:character_id", (req, res, next) => {
    const { character_id } = req.params
    const { name, weapon, occupation } = req.body
    charactersApi
        .editCharacter(character_id, { name, weapon, occupation })
        .then(() => res.redirect('/characters/list'))
        .catch(err => next(err))
})

// Delete
router.post("/delete/:character_id", (req, res, next) => {
    const { character_id } = req.params
    // res.send('siiiuuuu')
    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters/list'))
        .catch(err => next(err))
})

module.exports = router;
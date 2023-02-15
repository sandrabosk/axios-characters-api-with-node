const router = require("express").Router()
const axios = require("axios")

const ApiService = require('../services/characters.service')

const charactersApi = new ApiService()


//Characters List
router.get('/characters', (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))
})


//Create Character
router.get('/characters/create', (req, res, next) => {

    res.render('characters/create-character')
})

router.post('/characters/create', (req, res, next) => {

    const { name, weapon, occupation, debt } = req.body

    charactersApi
        .saveCharacter({ name, weapon, occupation, debt })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})


//Character Details
router.get('/characters/:id', (req, res, next) => {

    const { id } = req.params

    charactersApi
        .getOneCharacter(id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
})


//Edit Character
router.get('/characters/edit/:id', (req, res, next) => {

    const { id } = req.params

    charactersApi
        .getOneCharacter(id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})

router.post('/characters/edit/:id', (req, res, next) => {

    const { id } = req.params
    const { name, weapon, occupation, debt } = req.body

    charactersApi
        .editCharacter(id, { name, weapon, occupation, debt })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})


//Delete Character
router.post('/characters/delete/:id', (req, res, next) => {

    const { id } = req.params

    charactersApi

        .deleteCharacter(id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})


module.exports = router


// https://ih-crud-api.herokuapp.com/characters
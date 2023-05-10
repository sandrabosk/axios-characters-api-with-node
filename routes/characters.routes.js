const router = require("express").Router();
const axios = require("axios");

const charactersApiHandler = require('../services/characters-api.service');

// GET home page 
router.get('/characters', (req, res, next) => {

    charactersApiHandler
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))
})

//details
router.get('/character/:id', (req, res, next) => {

    const { id } = req.params

    charactersApiHandler
        .getOneCharacter(id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))

})


//crear
router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res, next) => {

    const { name, weapon, debt, occupation } = req.body

    charactersApiHandler
        .saveCharacter({ name, weapon, debt, occupation })
        .then(response => res.redirect('/characters'))
        .catch(err => next(err))
})


//editar
router.get('/character/:id/edit', (req, res, next) => {

    const { id } = req.params

    charactersApiHandler
        .getOneCharacter(id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))

})

router.post('/character/:id/edit', (req, res, next) => {

    const { name, weapon, debt, occupation } = req.body
    const { id } = req.params

    charactersApiHandler
        .editCharacter(id, { name, weapon, debt, occupation })
        .then(response => res.redirect('/characters'))
        .catch(err => next(err))
})

router.post('/character/:id/delete', (req, res, next) => {
    const { id } = req.params

    charactersApiHandler
        .deleteCharacter(id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
const router = require("express").Router();
const axios = require("axios");

const ApiService = require('../services/characters.service')

const charactersApi = new ApiService()

//Go to characters list
router.get('/', (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.error(err))
});

//Create a character
router.get('/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/create', (req, res, next) => {

    const { name, occupation, debt, weapon } = req.body

    charactersApi
        .createCharacter({ name, occupation, debt, weapon })
        .then(() => res.redirect('/characters'))
        .catch(err => console.error(err))
})

//Edit a character
router.get('/edit/:id', (req, res, next) => {

    const { id } = req.params

    charactersApi
        .getOneCharacter(id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => console.error(err))
})

router.post('/update/:id', (req, res, next) => {

    const { id } = req.params
    const { name, occupation, debt, weapon } = req.body

    charactersApi
        .editCharacter(id, { name, occupation, debt, weapon })
        .then(() => res.redirect('/characters'))
        .catch(err => console.error(err))
})

router.post('/delete/:id', (req, res, next) => {

    const { id } = req.params

    charactersApi
        .deleteCharacter(id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.error(err))
})

//Show a character details
router.get('/:charId', (req, res, next) => {

    const { charId } = req.params

    charactersApi
        .getOneCharacter(charId)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => console.error(err))
});

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
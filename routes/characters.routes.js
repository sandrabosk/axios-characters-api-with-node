const router = require("express").Router();

const charactersApi = require('../services/characters.service');

/* GET home page */

router.get('/characters', (req, res, next) => {

    charactersApi
        .getAllCharacters()
        // res.send("holaaaaaaaaa")
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))
})

//CREAR 

router.get('/characters/create', (req, res) => {
    // res.send("holaaaaaaaaaaa")
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res, next) => {

    const { name, weapon, occupation } = req.body

    const newCharacter = { name, weapon, occupation }

    charactersApi
        .saveCharacter(newCharacter)
        .then(() => res.redirect('/characters'))
        .catch(err => (err))
})


//EDITAR
router.get('/characters/edit/:id', (req, res, next) => {

    const { id: character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})

router.post('/characters/edit/:id', (req, res, next) => {

    const { id: character_id } = req.params
    const { name, weapon, occupation } = req.body

    const newCharacter = { name, weapon, occupation }

    charactersApi
        .editCharacter(character_id, newCharacter)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.get('/characters/:id', (req, res, next) => {

    const { id: character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
})


router.post('/characters/delete/:id', (req, res, next) => {

    const { id: character_id } = req.params

    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

module.exports = router;


    // https://ih-crud-api.herokuapp.com/characters
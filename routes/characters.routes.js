//initial setup
const router = require("express").Router();

const charactersAPI = require('../services/characters.service')

//characters list 

router.get('/characters', (req, res, next) => {

    charactersAPI
        .getAllCharacters()
        .then(response => {
            const characters = response.data
            res.render('characters/list-characters', { characters })
        })
        .catch(err => next(err))
})

//create a new character (render)

router.get('/characters/create', (req, res) => {
    res.render('characters/create-character')
})

//create a new character (handler)

router.post('/characters/create', (req, res, next) => {

    const { name, occupation, weapon } = req.body

    const newCharacter = { name, occupation, weapon }

    charactersAPI
        .createCharacter(newCharacter)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

//character details

router.get('/characters/:id', (req, res, next) => {

    const { id: character_id } = req.params

    charactersAPI
        .getOneCharacter(character_id)
        .then(response => {
            const character = response.data
            res.render('characters/details-character', { character })
        })
        .catch(err => next(err))
})


//edit character(render)

router.get('/characters/:id/edit', (req, res, next) => {

    const { id: character_id } = req.params

    charactersAPI
        .getOneCharacter(character_id)
        .then(response => {
            const character = response.data
            res.render('characters/edit-character', { character })
        })
        .catch(err => next(err))
})

// edit character (handler)

router.post('/characters/:id/edit', (req, res, next) => {

    const { id: character_id } = req.params
    const { name, occupation, weapon } = req.body

    const newCharacter = { name, occupation, weapon }

    charactersAPI
        .updateCharacter(character_id, newCharacter)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})


//delete character

router.post('/characters/:id/delete', (req, res, next) => {

    const { id: character_id } = req.params

    charactersAPI
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

//export setup 
module.exports = router;
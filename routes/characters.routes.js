const express = require('express')
const router = express.Router()

const charactersService = require('../services/characters.services')



router.get("/", (req, res, next) => {

    charactersService
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))

})

router.get('/:id', (req, res, next) => {

    const { id: character_id } = req.params

    charactersService
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
})



router.get('/crear', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/crear', (req, res, next) => {

    const { name, occupation, weapon } = req.body

    const character_data = { name, occupation, weapon}

    charactersService
        .saveCharacter(character_data)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})




router.get('/edit/:character_id/', (req, res, next) => {

    const { character_id } = req.params

    charactersService
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})


router.post('/:character_id', (req, res, next) => {

    const { name, occupation, weapon } = req.body
    const { character_id } = req.params

    const character_data = { name, occupation, weapon }

    charactersService
        .editCharacter(character_id, character_data)
        .then(() => res.redirect(`/characters`))
        .catch(err => next(err))
})

router.post('/:character_id/delete', (req, res, next) => {

   
    const { character_id } = req.params

    charactersService
        .deleteCharacter(character_id)
        .then(() => res.redirect(`/characters`))
        .catch(err => next(err))
})

module.exports = router


// https://ih-crud-api.herokuapp.com/characters
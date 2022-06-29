const router = require("express").Router();

const { response } = require("express");
const charactersService = require("./../services/characters.service");
const CharactersService = require('./../services/characters.service')



/* GET home page */
router.get('/characters-list', (req, res) => {

    CharactersService
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.error(err))
})

//create character
router.get('/characters/create', (req, res) => {
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res) => {

    const { name, weapon, occupation } = req.body
    const characterData = { name, weapon, occupation }

    CharactersService
        .saveCharacters(characterData)
        .then(response => res.redirect('/characters-list'))
        .catch(err => console.log(err))

})

//character details
router.get('/characters/:character_id', (req, res, next) => {

    CharactersService
        .getOneCharacters(req.params.character_id)
        .then(response => {
            const character = response.data
            res.render('characters/details-character', character)
        })
        .catch(err => console.error(err))
})

//edit character
router.get('/characters/:character_id/edit', (req, res) => {

    const { character_id } = req.params

    CharactersService
        .getOneCharacters(character_id)
        .then(response => {
            const character = response.data
            res.render('characters/edit-character', character)
        })
        .catch(err => console.log(err))
})

router.post('/characters/:character_id/edit', (req, res) => {
    
    const { character_id } = req.params
    const newCharacterData = req.body

    charactersService
        .editCharacters(character_id, newCharacterData)
        .then(response => res.redirect('/characters-list'))
        .catch(err => console.log(err))
})

//delete characters
router.get('/characters/:character_id/delete', (req, res) => {

    const { character_id } = req.params

    charactersService
        .deleteCharacters(character_id)
        .then(response => res.redirect('/characters-list'))
        .catch(err => console.log(err))
})

module.exports = router
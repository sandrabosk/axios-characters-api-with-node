const router = require("express").Router();

const { response } = require("express");
const charactersService = require('./../services/characters.service')


router.get('/characters', (req, res, next) => {

    charactersService
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))

})

router.get('/characters/:id', (req, res, next) => {

    charactersService

        .getOneCharacter(req.params.id)
        .then(response => {            
            res.render('characters/details-character', { character: response.data })})
        .catch(err => console.log(err))

})


router.get('/characters/create', (req, res) => {
    res.render('character/new-character', {character: response.data} )
})



router.post('/characters/create', (req, res) => {

    const { name, weapon, occupation } = req.body

    const characterData = { name, weapon, occupation }

    charactersService

        .saveCharacter(characterData)
        .then(response => res.redirect('/character'))
        .catch(err => console.log(err))
})

module.exports = router;
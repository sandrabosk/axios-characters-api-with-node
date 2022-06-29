const router = require("express").Router();
const axios = require("axios");
const charactersService = require('./../services/characters.service')

/* GET all characters */
router.get("/characters", (req, res, next) => {


    charactersService
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.log(err))


});

// Ver detalles
router.get("/characters/:id", (req, res, next) => {
    const { id } = req.params

    charactersService
        .getOneCharacter(id)
        .then(response => {
            const character = response.data
            res.render('characters/details-character', { character })
        })
        .catch(err => console.log(err))

});

// Editar personaje
router.get('/character/:id/edit', (req, res) => {
    const { id } = req.params
    charactersService
        .getOneCharacter(id)
        .then(response => {
            const character = response.data
            res.render('characters/edit-character', character)
        })
        .catch(err => console.log(err))
})

router.post('/character/:id/edit', (req, res) => {

    const { id } = req.params
    const newCharacterData = req.body

    charactersService
        .editCharacter(id, newCharacterData)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})



// Crear personaje

router.get('/character/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/character/create', (req, res, next) => {
    const { name, weapon, occupation } = req.body

    const characterData = { name, weapon, occupation }

    charactersService
        .saveCharacter(characterData)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})









// // Delete character
router.get('/character/:id/delete', (req, res) => {

    const { id } = req.params

    charactersService
        .deleteCharacter(id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
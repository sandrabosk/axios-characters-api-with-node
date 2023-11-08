const router = require("express").Router();
const axios = require("axios");

const charactersService = require('./../services/characters.services')

/* GET home page */
router.get('/listado', (req, res, next) => {
    // console.log('entrando en listado')
    charactersService
        .getAllCharacters()
        .then(response => {
            // console.log('Datos de personajes', response.data)
            res.render('characters/list-characters', { characters: response.data })
        })
        .catch(err => next(err))
})


router.get("/characters/:character_id", (req, res, next) => {

    const { character_id } = req.params
    // console.log(character_id)
    charactersService
        .getOneCharacter(character_id)
        .then(response => {
            // console.log("details: ", response.data)
            res.render("characters/details-character", { character: response.data });
        })
        .catch(err => next(err))
});




router.get('/crear', (req, res, next) => {
    res.render('characters/create-character')
})


router.post('/crear', (req, res, next) => {

    const { name, occupation, weapon } = req.body
    const character_data = { name, occupation, weapon }

    charactersService
        .saveCharacter(character_data)
        .then(() => res.redirect('/listado'))
        .catch(err => next(err))
})


router.get('/characters/:character_id/editar', (req, res, next) => {

    const { character_id } = req.params

    charactersService
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})


router.post('/characters/:character_id/editar', (req, res, next) => {

    const { name, occupation, weapon } = req.body
    const { character_id } = req.params

    const character_data = { name, occupation, weapon }

    charactersService
        .editCharacter(character_id, character_data)
        .then(() => res.redirect(`/characters/${character_id}`))
        .catch(err => next(err))
})


router.post('/characters/:character_id/eliminar', (req, res, next) => {

    const { character_id } = req.params

    charactersService
        .deleteCharacter(character_id)
        .then(() => res.redirect('/listado'))
        .catch(err => next(err))
})
module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
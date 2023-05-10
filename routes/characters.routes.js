const router = require("express").Router();
const axios = require("axios");

const charactersApiHandler = require('../services/characters-api.service')



router.get('/characters-list', (req, res, next) => {

    charactersApiHandler
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))
})



router.get("/characters/create", (req, res, next) => {
    res.render('characters/create-character')
})



router.post("/characters/create", (req, res, next) => {

    const { name, weapon, occupation } = req.body

    charactersApiHandler
        .saveCharacter({ name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})



router.get("/characters/:character_id", (req, res, next) => {

    const { character_id } = req.params

    charactersApiHandler
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
})



router.get('/characters/edit/:character_id', (req, res, next) => {

    const { character_id } = req.params

    charactersApiHandler
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
    //console.log(response.data))
})


router.post('/characters/edit/:character_id', (req, res, next) => {

    const { name, weapon, occupation } = req.body
    const { character_id } = req.params

    charactersApiHandler
        .editCharacter(character_id, { name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})



router.post('/characters/delete/:character_id', (req, res, next) => {

    const { character_id } = req.params;

    charactersApiHandler
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters-list'))
        .catch(err => console.log(err));
});



module.exports = router;
const router = require("express").Router();
const axios = require("axios");

const charactersService = require('./../services/characters.services')

router.get("/characters", (req, res, next) => {

    charactersService
        .getAllCharacters()
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => next(err))

});

router.get("/characters/:character_id", (req, res, next) => {

    const { character_id } = req.params

    charactersService
        .getOneCharacter(character_id)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => next(err))

});

router.get('/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/create', (req, res, next) => {

    const { name, weapon, occupation } = req.body
    const characterData = { name, weapon, occupation }

    charactersService
        .createCharacter(characterData)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))

})

router.get('/characters/:character_id/edit', (req, res, next) => {

    const { character_id } = req.params

    charactersService
        .getOneCharacter(character_id)
        .then(responseFromAPI => {
            res.render("characters/edit-character", { character: responseFromAPI.data });
        })
        .catch(err => next(err))

})

router.post('/characters/:character_id/edit', (req, res, next) => {

    const { character_id } = req.params
    const characterData = { name, weapon, occupation } = req.body

    charactersService
        .editCharacter(character_id, characterData)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))

})

router.post('/characters/:character_id/delete', (req, res, next) => {

    const { character_id } = req.params

    charactersService
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))

})

module.exports = router;

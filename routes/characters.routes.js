const router = require("express").Router();
const axios = require("axios");
const characterService = require('./../services/characters.service')


router.get("/characters", (req, res, next) => {

    characterService
        .getAllCharacters()
        .then(({ data }) => {
            res.render('characters/list-characters', { characters: data })
        })
        .catch(e => console.log(e))
});

router.get("/characters/:id", (req, res, next) => {
    const { id } = req.params

    characterService
        .getOneCharacter(id)
        .then(({ data }) => {
            res.render('characters/details-character', { character: data })
        })
        .catch(err => console.error(err))
});

router.get("/character/create", (req, res, next) => {
    res.render('characters/create-character')
});

router.post("/character/create", (req, res, next) => {

    const { name, occupation, debt, weapon } = req.body

    characterService
        .saveCharacter({ name, occupation, debt, weapon })
        .then(res.redirect('/characters'))
        .catch(e => console.log(e))
});

router.get("/characters/:id/edit", (req, res) => {
    const { id } = req.params

    characterService
        .getOneCharacter(id)
        .then(({ data }) => {
            res.render('characters/edit-character', data)
        })
        .catch(e => console.log(e))
})

router.post("/characters/:id/edit", (req, res) => {

    const { id } = req.params
    const { name, occupation, debt, weapon } = req.body

    characterService
        .editCharacter(id, { name, occupation, debt, weapon })
        .then(res.redirect('/characters'))
        .catch(e => console.log(e))
})

router.get("/characters/:id/delete", (req, res) => {
    const { id } = req.params

    characterService
        .deleteCharacter(id)
        .then(res.redirect('/characters'))
        .catch(e => console.log(e))
})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
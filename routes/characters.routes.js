const router = require("express").Router();
const axios = require("axios");
const apiCharacters = require('../services/charact-api.service');

router.get("/characters-list", (req, res, next) => {

    apiCharacters
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))
})

router.get("/characters/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/characters/create", (req, res, next) => {

    const { name, weapon, debt, occupation } = req.body

    apiCharacters
        .saveCharacter({ name, weapon, debt, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})

router.get("/characters/:id", (req, res, next) => {

    const { id } = req.params

    apiCharacters
        .getOneCharacter(id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))

})


router.get("/characters/:id/edit", (req, res, next) => {

    const { id } = req.params

    apiCharacters
        .getOneCharacter(id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))

})


router.post("/characters/:id/edit", (req, res, next) => {

    const { name, weapon, debt, occupation } = req.body
    const { id } = req.params

    apiCharacters
        .editCharacter(id, { name, weapon, debt, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})

router.post("/characters/:id/delete", (req, res, next) => {
    const { id } = req.params

    apiCharacters
        .deleteCharacter(id)
        .then(() => res.redirect(`/characters-list`))
        .catch(err => next(err))


})


module.exports = router
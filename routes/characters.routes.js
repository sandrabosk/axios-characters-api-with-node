const router = require("express").Router()
const axios = require("axios")

const ApiService = require('../services/characters.service')
const charactersApi = new ApiService()

router.get("/characters-list", (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data })
        })
        .catch(err => next(err))
})



router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res, next) => {

    const { name, occupation, weapon } = req.body

    charactersApi
        .saveCharacter({ name, occupation, weapon })
        .then(() => {
            res.redirect('/characters-list')
        })
        .catch(err => next(err))
})



router.get("/characters/:id", (req, res, next) => {
    const { id } = req.params

    charactersApi
        .getOneCharacter(id)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => next(err))
})




router.get('/characters/:id/edit', (req, res, next) => {
    const { id } = req.params

    charactersApi
        .getOneCharacter(id)
        .then(responseFromAPI => {
            res.render("characters/edit-character", { character: responseFromAPI.data })
        })
        .catch(err => next(err))
})

router.post('/characters/:id/edit', (req, res, next) => {
    const { name, occupation, weapon, id } = req.body

    charactersApi
        .editCharacter(id, { name, occupation, weapon })
        .then(() => {
            res.redirect(`/characters-list`)
        })
        .catch(err => next(err))
})



router.post('/characters/:id/delete', (req, res, next) => {

    const { id } = req.params

    charactersApi
        .deleteCharacter(id)
        .then(() => res.redirect('/characters-list'))
        .catch(err => next(err))
})


module.exports = router;

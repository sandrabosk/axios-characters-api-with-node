const router = require("express").Router()
const charactersService = require('../services/characters.services')

router.get("/", (req, res, next) => {
    charactersService
        .getAllCharacters()
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data })
        })
        .catch(err => console.error(err))
})


router.get('/details/:character_id', (req, res, next) => {
    const { character_id } = req.params
    charactersService
        .getOneCharacter(character_id)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data })
        })
        .catch(err => console.error(err))
})

router.get('/create', (req, res, next) => {
    res.render("characters/create-character")
})

router.post('/create', (req, res, next) => {
    const { name, occupation, weapon } = req.body

    charactersService
        .postCharacter({ name, occupation, weapon })
        .then(responseFromAPI => {
            res.redirect('/characters')
        })
        .catch(err => console.error(err))
})

router.get('/edit/:character_id', (req, res, next) => {
    const { character_id } = req.params
    charactersService
        .getOneCharacter(character_id)
        .then(responseFromAPI => {
            res.render("characters/edit-character", { character: responseFromAPI.data })
        })
        .catch(err => console.error(err))
})

router.post('/edit/:character_id', (req, res, next) => {
    const { name, occupation, weapon } = req.body
    const { character_id } = req.params
    const character_data = { name, occupation, weapon }
    charactersService
        .putCharacter(character_id, character_data)
        .then(responseFromAPI => {
            res.redirect(`/characters/details/${character_id}`)
        })
        .catch(err => console.error(err))
})

router.get('/delete/:character_id', (req, res, next) => {
    const { character_id } = req.params
    charactersService
        .deleteCharacter(character_id)
        .then(responseFromAPI => {
            res.redirect('/characters')
        })
        .catch(err => console.error(err))
})

module.exports = router


// https://ih-crud-api.herokuapp.com/characters
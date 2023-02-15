const router = require("express").Router();
const axios = require('axios');
const ApiService = require('./../services/characters.service')
const characterApi = new ApiService



/* GET home page */
router.get("/characters", (req, res, next) => {
    characterApi
        .getAllCharacters()
        .then(response => {
            res.render('characters/list-characters', { characters: response.data })
        })
        .catch(err => next(err))
});

router.get("/characters/:character_id", (req, res, next) => {
    const { character_id } = req.params

    characterApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
});

router.get('/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/create', (req, res, next) => {
    const { name, weapon, occupation } = req.body

    characterApi
        .saveCharacter({ name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.get('/edit/:character_id', (req, res, next) => {
    const { character_id } = req.params

    characterApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})

router.post('/edit/:character_id', (req, res, next) => {
    const { character_id } = req.params
    const { name, weapon, occupation } = req.body

    characterApi
        .editCharacter(character_id, { name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.post('/delete/:character_id', (req, res, next) => {
    const { character_id } = req.params

    characterApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

module.exports = router;

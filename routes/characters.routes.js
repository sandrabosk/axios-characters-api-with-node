const router = require("express").Router();
const axios = require("axios");


const Apiservice = require('../services/characters.service')

const charactersApi = new Apiservice()



router.get('/characters', (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))
})

router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res, next) => {

    const { name, weapon, occupation } = req.body

    charactersApi
        .saveCharacter({ name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))

})


router.get('/characters/:characterId', (req, res, next) => {

    const { characterId } = req.params

    charactersApi
        .getOneCharacter(characterId)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))

})


router.get("/edit/:characterId", (req, res, next) => {

    const { characterId } = req.params

    charactersApi
        .getOneCharacter(characterId)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})

router.post("/edit/:characterId", (req, res, next) => {

    const { characterId } = req.params
    const { name, weapon, occupation } = req.body

    charactersApi
        .editCharacter(characterId, { name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.post('/delete/:characterId', (req, res, next) => {

    const { characterId } = req.params

    charactersApi
        .deleteCharacter(characterId)
        .then(res.redirect('/characters'))
        .catch(err => next(err))
})



module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
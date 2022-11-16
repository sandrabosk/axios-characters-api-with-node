const router = require("express").Router();
const axios = require("axios");

const charactersApi = require('../services/character.api.service')
const Api = new charactersApi()

/* GET home page */
router.get("/characters", (req, res, next) => {
    Api
        .getAllCharacters()
        .then(({ data: characters }) => res.render('characters/list-characters', { characters }))
});


router.get("/characters/:id", (req, res, next) => {

    const { id: character_id } = req.params


    Api
        .getOneCharacters(character_id)
        .then(({ data: character }) => res.render('characters/details-character', { character }))
        .catch(err => console.error(err))
});

//Create

router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/create", (req, res, next) => {
    const { name, weapon, occupation } = req.body

    Api
        .createCharacter({ name, occupation, weapon })
        .then(() => {
            res.redirect('/characters')
        })
        .catch(err => console.log(err))
})

//Edit

router.get('/:id/edit', (req, res, next) => {
    const { id: character_id } = req.params

    Api
        .getOneCharacters(character_id)

        .then(({ data: character }) => res.render('characters/edit-character', { character }))
        .catch(err => console.log(err))


})

router.post('/:id/edit', (req, res, next) => {

    const { id: character_id } = req.params
    const { name, weapon, occupation } = req.body

    Api
        .editCharacter(character_id, { name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res, next) => {
    const { id: character_id } = req.params
    Api
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
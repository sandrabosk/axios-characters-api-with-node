const express = require('express')
const router = express.Router()

const charactersApi = require('./../services/characters-api.services')
const api = new charactersApi()

router.get("/list-characters", (req, res, next) => {

    api
        .getAllCharacters()
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data })
        })
        .catch(err => console.error(err))
});


router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})


// New character form (handle)
router.post("/create", (req, res, next) => {

    const { name, occupation, weapon } = req.body

    api
        .createCharacter({ name, occupation, weapon })
        .then(() => res.redirect('/characters/list-characters'))
        .catch(err => console.log(err))
})

router.get("/:id/edit", (req, res, next) => {

    const { id: character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => console.log(err))
})

router.post("/:id/edit", (req, res, next) => {

    const { id: character_id } = req.params
    const { name, occupation, weapon } = req.body

    api
        .editCharacter(character_id, { name, occupation, weapon })
        .then(() => res.redirect(`/characters/${character_id}`))
        .catch(err => console.log(err))
})

router.get("/:id", (req, res, next) => {

    const { id: character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(response => {
            res.render('characters/details-character', { character: response.data })
        })
        .catch(err => console.error(err))
});

router.post('/:id/delete', (req, res, next) => {
    const { id: character_id } = req.params

    api
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters/list-characters'))
        .catch(err => console.error(err))
})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
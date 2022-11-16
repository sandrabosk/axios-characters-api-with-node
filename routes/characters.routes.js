const router = require("express").Router();
const axios = require("axios");


const charactersApi = require('./../services/characters-api.service')
const api = new charactersApi()

/* GET home page */
router.get("/characters", (req, res, next) => {

    api
        .getAllCharacters()
        .then(characters => {
            characters.sort((a, b) => a.name.localeCompare(b.name))
            console.log(characters)
            res.render('characters/list-characters', { characters })
        })
        .catch(err => console.log(err))
})

// Character info
router.get("/characters/:id", (req, res, next) => {

    const { id: character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(character => res.render('characters/details-character', { character }))
        .catch(err => console.log(err))
})



// New character form (render)
router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})


// New character form (handle)
router.post("/create", (req, res, next) => {

    const { name, occupation, weapon } = req.body

    api
        .createCharacter({ name, occupation, weapon })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})

// Edit character form (render)
router.get("/characters/:id/edit", (req, res, next) => {

    const { id: character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(character => res.render('characters/edit-character', { character }))
        .catch(err => console.log(err))
})


// Edit character form (handle)
router.post("/characters/:id/edit", (req, res, next) => {

    const { id: character_id } = req.params
    const { name, occupation, weapon } = req.body

    api
        .editCharacter(character_id, { name, occupation, weapon })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})

// Delete character
router.post('/characters/:id/delete', (req, res) => {
    const { id: character_id } = req.params

    api
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})

module.exports = router;

const router = require("express").Router();
const axios = require("axios");
// const { response } = require("../app");
const charactersService = require('./../services/characters.service')

/* GET home page */

//CHARACTERS LIST
router.get("/characters", (req, res, next) => {
    charactersService
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.log(err))
});


//DETAILS
router.get("/characters/:id", (req, res, next) => {

    const { id } = req.params

    charactersService
        .getOneCharacter(id)
        .then(response => {
            const character = response.data
            res.render('characters/details-character', { character })
        })


        .catch(err => console.log(err))
});


//CREATE

router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/create", (req, res, next) => {
    const { name, weapon, occupation } = req.body
    const characterData = { name, weapon, occupation }

    charactersService
        .saveCharacter(characterData)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})


//EDIT
router.get('/edit/:id', (req, res, next) =>
    charactersService
        .getOneCharacter(req.params.id)
        .then(response => {
            const character = response.data
            res.render('characters/edit-character', character)
        })
        .catch(err => console.log(err))
)

router.post('/edit/:id', (req, res, next) => {
    const { id } = req.params
    const newCharacterData = req.body

    charactersService
        .editCharacter(id, newCharacterData)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))

})

//DELETE
router.get('/delete/:id', (req, res, next) => {

    const { id } = req.params

    charactersService
        .deleteCharacter(id)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})


module.exports = router;



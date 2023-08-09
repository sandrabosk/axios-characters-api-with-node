const router = require("express").Router();
const axios = require("axios");

const charactersApi = require('../services/characters.service')

router.get("/list", (req, res, next) => {

    // res.send('hola')
    charactersApi
        .getAllCharacters()
        .then(response => res.render("characters/list-characters", { characters: response.data }))
        .catch(err => console.error(err))
});





router.get("/create", (req, res) => {
    // console.log("------------>segundo endpoint");
    res.render('characters/create')
})

router.post("/create", (req, res, next) => {
    const { name, occupation, weapon } = req.body
    const newCharacter = { name, occupation, weapon }

    charactersApi
        .saveCharacter(newCharacter)
        .then(() => res.redirect("/characters/list"))
        .catch(err => console.error(err))
});


router.get('/:id/edit', (req, res, next) => {

    const { id: character_id } = req.params

    charactersApi
        .getCharacterDetail(character_id)
        .then(response => res.render('characters/edit', { character: response.data }))
        .catch(err => next(err))
})

router.post('/:id/edit', (req, res, next) => {

    const { id: character_id } = req.params
    const { name, weapon, occupation } = req.body

    const newCharacter = { name, weapon, occupation }

    charactersApi
        .editCharacter(character_id, newCharacter)
        .then(() => res.redirect('/characters/list'))
        .catch(err => next(err))
})

router.post('/:id/delete', (req, res, next) => {

    const { id: character_id } = req.params

    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect(('/characters/list')))
        .catch(err => console.log(err))
})

router.get("/:id", (req, res, next) => {

    const { id: character_id } = req.params
    // console.log("------------>primer endpoint", character_id);

    charactersApi
        .getCharacterDetail(character_id)
        .then(responseFromAPI => res.render("characters/details-character", { character: responseFromAPI.data }))
        .catch(err => console.error(err))
});











module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
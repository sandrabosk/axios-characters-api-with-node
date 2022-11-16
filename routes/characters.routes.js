const express = require('express')
const router = express.Router()
const charactersApi = require('./../service/characters-ape.service')
const api = new charactersApi
/* GET home page */

router.get("/list-characters", (req, res, next) => {


    api
        .getAllCharacters()
        .then(respond => res.render('characters/list-characters', { characters: respond.data }))
        .catch(err => console.log(err))
});

router.get('/crear', (req, res) => {
    res.render('characters/create')
});
router.post('/crear', (req, res) => {
    const { name, occupation, weapon } = req.body
    api
        .createCharacter({ name, occupation, weapon })
        .then(() => res.redirect('/characters/list-characters'))
        .catch(err => console.log(err))
});






router.get("/:id/edit", (req, res, next) => {
    const { id: characterId } = req.params
    api
        .getOneCharacter(characterId)
        .then(({ data }) => res.render('characters/edit', { characters: data }))
        .catch(err => console.log(err))
});

router.post('/:id/edit', (req, res) => {
    const { name, occupation, weapon } = req.body
    const { id: characterId } = req.params

    api
        .editCharacter(characterId, { name, occupation, weapon })
        .then(() => {
            res.redirect(`/characters/${characterId}`)
        })
        .catch(err => console.log(err))
});

router.get("/:id", (req, res, next) => {
    const { id: characterId } = req.params
    api
        .getOneCharacter(characterId)
        .then(responseFromAPI => {

            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.post('/:id/delete', (req, res) => {
    const { id: characterId } = req.params

    api
        .deleteCharacter(characterId)
        .then(() => res.redirect('/characters/list-characters'))
        .catch(err => console.log(err))
})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
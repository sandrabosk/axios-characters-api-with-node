const router = require("express").Router();
const axios = require("axios");

const charactersApi = require('../services/character.services');
const { response } = require("express");


//Lista de personajes
router.get("/characters", (req, res, next) => {
    charactersApi
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.error(err))
});

//Detalles del personaje
router.get('/characters/:id', (req, res, next) => {

    const { id: character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
})

//Crear personaje nuevo
router.get('/create', (req, res) => {
    res.render('characters/create-characters')
})

router.post('/characters/create', (req, res, next) => {

    const { name, weapon, occupation } = req.body

    const newCharacter = { name, weapon, occupation }

    charactersApi
        .saveCharacter(newCharacter)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

//Actualizar personaje

router.get('/characters/:id/edit', (req, res, next) => {
    const { id: character_id } = req.params
    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-characters', { character: response.data }))
        .catch(err => next(err))
})

router.post('/edit/:id', (req, res, next) => {
    const { id: character_id } = req.params;
    const { name, weapon, occupation } = req.body;

    const updatedCharacter = { name, weapon, occupation };
    console.log(charactersApi.updateCharacter)
    charactersApi
        .updateCharacter(character_id, updatedCharacter)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err));
});



//Eliminar personaje

router.get('/characters/:id/delete', (req, res, next) => {
    const { id: character_id } = req.params;

    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err));
});



module.exports = router;

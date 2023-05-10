const router = require("express").Router();
const axios = require("axios");

const charactersApiHandler = require('../services/characters-api.services');


/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

///Lista de Characters//

router.get('/characters', (req, res, next) => {
    charactersApiHandler
        .getAllCharacters()
        .then(response => res.render('/characters', { characters: response.data }))
        .catch(err => next(err))
})

//Detalles de Characters//

router.get('/characters/:id', (req, res, next) => {
    const { id } = req.params
    charactersApiHandler
        .getOneCharacter(id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
})
// Crear nuevo Character//

router.get('/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/create", (req, res, next) => {

    const { name, weapon, occupation } = req.body

    charactersApiHandler
        .saveCharacter({ name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})

// Actualiza Character//

router.get('/characters/:id/edit', (req, res, next) => {
    const { id } = req.params

    charactersApiHandler
        .getOneCharacter(id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})

router.post('/characters/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { name, weapon, occupation } = req.body
    charactersApiHandler
        .editCharacter(id, { name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})

// Eliminar//

router.post('/characters/:id/delete', (req, res, next) => {
    const { id } = req.params
    charactersApiHandler
        .deleteCharacter(id)
        .then(res.redirect(`/characters`))
        .catch(err => next(err))
})

module.exports = router;



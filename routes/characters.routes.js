const express = require('express');
const router = express.Router();

const charactersApiHandler = require('../services/characters-api.service');



router.get("/listado", (req, res, next) => {

    charactersApiHandler
        .getAllCharacters()
        .then(response => res.render('characters/list', { characters: response.data }))
        .catch(err => next(err))
})


router.get("/detalles/:character_id", (req, res, next) => {

    const { character_id } = req.params

    charactersApiHandler
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details', { character: response.data }))
        .catch(err => next(err))
})

router.get("/crear", (req, res, next) => {
    res.render('characters/create')
})

router.post("/crear", (req, res, next) => {

    const { name, weapon, occupation } = req.body

    charactersApiHandler
        .saveCharacter({ name, weapon, occupation })
        // .then(response => res.redirect(`/detalles/${response.data.id}`))
        .then(response => res.redirect(`/listado`))
        .catch(err => next(err))
})


router.get("/editar/:character_id", (req, res, next) => {

    const { character_id } = req.params

    charactersApiHandler
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit', { character: response.data }))
        .catch(err => next(err))

})


router.post("/editar/:character_id", (req, res, next) => {

    const { name, weapon, occupation } = req.body
    const { character_id } = req.params

    charactersApiHandler
        .editCharacter(character_id, { name, weapon, occupation })
        // .then(response => res.redirect(`personajes/detalles/${response.data.id}`))
        .then(response => res.redirect(`/detalles/${response.data.id}`))
        .catch(err => next(err))
})

router.post("/delete/:id", (req, res, next) => {
    const { id } = req.params

    charactersApiHandler
        .deleteCharacter(id)
        .then(response => res.redirect('/listado'))
        .catch(err => next(err))

})
module.exports = router
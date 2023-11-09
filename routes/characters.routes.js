const router = require("express").Router()
const axios = require("axios")

const charactersServices = require('../services/characters.services')

router.get("/listado", (req, res, next) => {

    charactersServices
        .getAllCharacters()
        .then(list => res.render('characters/list-characters', { characters: list.data }))
        .catch(err => next(err))
})



router.get('/crear', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/crear', (req, res, next) => {

    const new_character = { name, ocupation, weapon } = req.body

    charactersServices

        .newCharacter(new_character)
        .then(() => res.redirect('/personajes/listado'))
        .catch(err => next(err))

})



router.get("/:character_id", (req, res, next) => {

    const { character_id } = req.params

    charactersServices
        .getOneCharacter(character_id)
        .then(details => res.render("characters/details-character", { character: details.data }))
        .catch(err => next(err))
})

router.get('/editar/:character_id', (req, res, next) => {

    const { character_id } = req.params



    charactersServices
        .getOneCharacter(character_id)
        .then(edit => res.render('characters/edit-character', { character: edit.data }))
        .catch(err => next(err))
})

router.post('/editar/:character_id', (req, res, next) => {

    const edit_character = { name, ocupation, weapon } = req.body
    const { character_id } = req.params


    charactersServices
        .editCharacters(character_id, edit_character)
        .then(() => res.redirect(`/personajes/${character_id}`))
        .catch(err => next(err))
})


router.get('/borrar/:character_id', (req, res, next) => {

    const { character_id } = req.params

    charactersServices
        .deleteCharacter(character_id)
        .then(() => res.redirect('/personajes/listado'))
        .catch(err => next(err))
})







module.exports = router


// https://ih-crud-api.herokuapp.com/characters
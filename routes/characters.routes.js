const router = require("express").Router()
const axios = require("axios")
const { Router } = require("express")

const AxiosLabAPI = require('../connect/axiosLab.connect')
const axiosLabAPI = new AxiosLabAPI()

//--------------------------------------GET---------------------------------//

router.get("/list", (req, res, next) => {
    axiosLabAPI
        .getCharacters()
        .then((responseFromAPI) =>
            res.render('characters/list-characters', { characters: responseFromAPI.data }))
        .catch(next)
})

router.get('/create', (req, res) => {
    res.render('characters/create-character')
})

router.get("/:id", (req, res, next) => {
    axiosLabAPI
        .getCharacter(req.params.id)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data })
        })
        .catch(next)
})

router.get("/:id/edit", (req, res, next) => {
    const { id } = req.params

    axiosLabAPI
        .getCharacter(id)
        .then(responseFromAPI => {
            res.render("characters/edit-character", { character: responseFromAPI.data })
        })
        .catch(next)
})

router.get('/:id/delete', (req, res, next) => {
    axiosLabAPI
        .deleteCharacter(req.params.id)
        .then(() => {
            res.redirect(`/characters/list`);
        })
        .catch(next)
});

//--------------------------------------POST---------------------------------//

router.post('/create', (req, res, next) => {

    const { name, occupation, debt, weapon } = req.body
    axiosLabAPI
        .createCharacter({ name, occupation, debt, weapon })
        .then(() =>
            res.redirect('/characters/list')
        )
        .catch(next)
})

router.post('/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { name, occupation, weapon } = req.body

    axiosLabAPI
        .editCharacter(id, { name, occupation, weapon })
        .then(() => {
            res.redirect(`/characters/${id}`)
        })
        .catch(next)
})

module.exports = router
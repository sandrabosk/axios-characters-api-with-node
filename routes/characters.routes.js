const router = require("express").Router();

const ApiService = require('../services/services')
const charactersApi = new ApiService()

router.get("/", (req, res, next) => {
    charactersApi
        .getAllCharacters()
        .then(({ data }) => res.render('characters/list-characters', { data }))
        .catch(err => next(err))
})

router.get('/create', (req, res, next) => res.render('characters/create-character'))

router.post('/create', (req, res, next) => {
    const { name, weapon, occupation } = req.body

    charactersApi
        .createCharacter({ name, occupation, weapon })
        .then(() => res.render('/characters'))
        .catch(err => next(err))
})

router.get("/:id", (req, res, next) => {
    const { id } = req.params
    charactersApi
        .getOneCharacter(id)
        .then(({ data }) => res.render('characters/details-character', { data }))
        .catch(err => next(err))
})

router.get("/edit/:id", (req, res, next) => {
    const { id } = req.params
    charactersApi
        .getOneCharacter(id)
        .then(({ data }) => res.render('characters/edit-character', { data }))
        .catch(err => next(err))
})

router.post("/edit/:id", (req, res, next) => {
    const { id, name, occupation, weapon } = req.body

    charactersApi
        .editCharacter(id, { name, occupation, weapon })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.post('/delete/:id', (req, res, next) => {
    const { id } = req.params

    charactersApi
        .deleteCharacter(id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

module.exports = router
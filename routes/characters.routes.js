const router = require("express").Router();

const ApiService = require('./../services/characters.service')

const charactersApi = new ApiService()

router.get("/", (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(({ data }) => res.render("characters/list-characters", { characters: data }))
        .catch(err => next(err))
})

router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params
    charactersApi
        .getOneCharacter(id)
        .then(({ data }) => res.render('characters/edit-character', { character: data }))
        .catch(err => next(err))
})


router.post('/:id/edit', (req, res, next) => {
    const { id } = req.params
    const { name, weapon, occupation } = req.body
    charactersApi
        .editCharacter(id, { name, weapon, occupation })
        .then(() => res.redirect(`/characters/${id}`))
        .catch(err => next(err))
})

router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params
    charactersApi
        .deleteCharacter(id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.get('/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/create', (req, res, next) => {
    const { name, weapon, occupation } = req.body
    charactersApi
        .saveCharacter({ name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})



router.get("/:id", (req, res, next) => {
    const { id } = req.params
    charactersApi
        .getOneCharacter(id)
        .then(({ data }) => res.render("characters/details-character", { character: data }))
        .catch(err => next(err))
})



module.exports = router


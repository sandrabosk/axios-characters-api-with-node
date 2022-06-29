const router = require("express").Router()
const characersService = require('./../services/characters.service')


/* GET home page */
router.get("/characters-list", (req, res, next) => {
    characersService
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.log(err))
})

router.get('/characters/create', (req, res) => {
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res) => {

    const { name, weapon, occupation } = req.body

    const characterData = { name, weapon, occupation }

    characersService
        .saveCharacter(characterData)
        .then(response => res.redirect('/characters-list'))
        .catch(err => console.log(err))
})

router.get("/characters/:id", (req, res, next) => {
    characersService
        .getOneCharacter(req.params.id)
        .then(response => {
            const character = response.data
            res.render('characters/details-character', character)
        })
        .catch(err => console.log(err))
})

router.get('/characters/:id/edit', (req, res) => {

    characersService
        .getOneCharacter(req.params.id)
        .then(response => {
            const character = response.data
            res.render('characters/edit-character', character)
        })
        .catch(err => console.log(err))
})

router.post('/characters/:id/edit', (req, res) => {

    const { id } = req.params
    const newCharacterData = req.body

    characersService
        .editCharacter(id, newCharacterData)
        .then(response => res.redirect(`/characters-list`))
        .catch(err => console.log(err))
})

router.get('/characters/:id/delete', (req, res) => {

    const { id } = req.params

    characersService
        .deleteCharacter(id)
        .then(response => res.redirect('/characters-list'))
        .catch(err => console.log(err))
})


module.exports = router;
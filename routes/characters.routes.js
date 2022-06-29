const router = require("express").Router();
const characersService = require('./../services/characters.service')

//List characters
router.get('/characters-list', (req, res, next) => {

    characersService

        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.log(err))

})

//Create character

router.get('/characters/create', (req, res) => {

    res.render('characters/create-character')
})


router.post('/characters/create', (req, res) => {

    const { name, occupation, weapon } = req.body

    const characterData = { name, occupation, weapon }

    characersService
        .createCharacter(characterData)
        .then(response => res.redirect('/characters-list'))
        .catch(err => console.log(err))
})


//Details characters
router.get('/characters/:id', (req, res) => {


    characersService
        .getOneCharacter(req.params.id)
        .then(response => {
            const character = response.data
            res.render('characters/details-character', { character })
        })
        .catch(err => console.log(err))

})

//Edit characters
router.get('/characters/:id/edit', (req, res) => {
    const { id } = req.params

    characersService
        .getOneCharacter(id)
        .then(response => {
            const character = response.data
            res.render('characters/edit-character', { character })
        })
        .catch(err => console.log(err))
})

router.post('/characters/:id/edit', (req, res) => {


    const { id } = req.params
    const { name, occupation, weapon } = req.body
    const newUpdate = { name, occupation, weapon, id }

    characersService
        .editCharacter(id, newUpdate)
        .then(response => res.redirect('/characters-list'))
        .catch(err => console.log(err))

})

// Delete character
router.post('/characters/:id/delete', (req, res) => {

    const { character_id } = req.params

    characersService
        .deleteCharacter(character_id)
        .then(response => res.redirect('/characters-list'))
        .catch(err => console.log(err))
})






module.exports = router;

const router = require("express").Router();
const charactersService = require("../services/characters.service");

// get all character

router.get('/characters/list', (req, res) => {

    charactersService
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.log(err))
})

router.get('/characters/create', (req, res) => {

    /* res.send('holaaaaaaa') */
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res) => {

    const { name, weapon, occupation } = req.body
    const characterData = { name, weapon, occupation }

    charactersService
        .saveCharacter(characterData)
        .then(response => res.redirect('/characters/list'))
        .catch(err => console.log(err))
})

//edit character from render

router.get('/characters/:id/edit', (req, res) => {

    charactersService
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

    charactersService
        .editCharacter(id, newCharacterData)
        .then(response => res.redirect('/characters/list'))
        .catch(err => console.log(err))
})

// delete character

router.get('/characters/:id/delete', (req, res) => {

    const { id } = req.params

    charactersService
        .deleteCharacter(id)
        .then(response => res.redirect('/characters/list'))
        .catch(err => console.log(err))
})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
const router = require("express").Router();
const charactersService = require('./../services/characters.service')


//----> List of all characters
router.get('/characters', (req, res) => {

    charactersService
        .getAllCharacters()
        .then(responseFromAPI => {
            res.render('characters/list-characters', { characters: responseFromAPI.data })
        })
        .catch(err => console.error(err))
})

//----> Details of a specific character
router.get('/characters/:characterID', (req, res) => {

    const { characterID } = req.params

    charactersService
        .getOneCharacter(characterID)
        .then(responseFromAPI => {
            res.render('characters/details-character', { character: responseFromAPI.data })
        })
        .catch(err => console.error(err))
})

//----> Create a new character (render form)
router.get('/create', (req, res) => {
    res.render('characters/create-character')
})

//----> Save a new character
router.post('/create', (req, res) => {

    const { name, weapon, occupation } = req.body
    const characterData = { name, weapon, occupation }

    charactersService
        .saveCharacter(characterData)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})

// Edit character form (render)
router.get('/characters/:characterID/edit', (req, res) => {

    const { characterID } = req.params

    charactersService
        .getOneCharacter(characterID)
        .then(response => {
            const character = response.data
            res.render('characters/edit-character', character)
        })
        .catch(err => console.log(err))
})

// Edit character form (handler)
router.post('/characters/:characterID/edit', (req, res) => {

    const { characterID } = req.params
    const newCharacterData = req.body

    charactersService
        .editCharacter(characterID, newCharacterData)
        .then(response => res.redirect(`/characters/${characterID}`))
        .catch(err => console.log(err))
})

// Delete character
router.get('/characters/:characterID/delete', (req, res) => {

    const { characterID } = req.params

    charactersService
        .deleteCharacter(characterID)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})

module.exports = router;
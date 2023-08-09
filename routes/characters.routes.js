const router = require("express").Router();
const charactersApi = require('../services/characters.service')

router.get('/characters', (req, res, next) => {
    charactersApi
        .getAllCharacters()
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data })
        })
        .catch(err => console.log(err))
})



// https://ih-crud-api.herokuapp.com/characters

router.get('/create', (req, res) => {
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res, next) => {

    const { name, weapon, occupation } = req.body
    const newCharacter = { name, weapon, occupation }
    charactersApi
        .saveCharacter(newCharacter)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))

})

router.get("/characters/:id", (req, res, next) => {
    const { id: character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});




router.post('/characters/:id/edit', (req, res, next) => {
    const { id: character_id } = req.params
    const { name, weapon, occupation } = req.body

    const newCharacter = { name, weapon, occupation }

    charactersApi
        .editCharacter(character_id, newCharacter)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))

})

router.get('/characters/:id/edit', (req, res, next) => {
    const { id: character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})

router.get('/characters/:id/delete', (req, res, next) => {
    const { id: character_id } = req.params
    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})



module.exports = router
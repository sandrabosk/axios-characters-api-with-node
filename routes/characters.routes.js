const express = require('express')
const router = express.Router();

const characterApi = require('./../services/characters.service')

/* GET home page */
router.get("/characters", (req, res, next) => {

    characterApi
        .getAllCharacters()
        .then(responseFromAPI => {

            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});


router.get("/characters/:character_id", (req, res, next) => {

    const { character_id } = req.params

    characterApi
        .getOneCharacter(character_id)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get('/character/new', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/character/new', (req, res, next) => {

    const { name, occupation, weapon } = req.body

    const newCharacter = { name, occupation, weapon }

    characterApi
        .saveNewCharacter(newCharacter)
        .then(() => res.redirect('/characters'))
        .catch(err => console.error(err))

})

router.get('/character/edit/:character_id', (req, res, next) => {

    const { character_id } = req.params

    characterApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => console.error(err))

})



router.post('/character/edit/:character_id', (req, res, next) => {

    const { character_id } = req.params
    const { name, occupation, weapon } = req.body

    const editedCharacter = { name, occupation, weapon }

    characterApi
        .editCharacter(character_id, editedCharacter)
        .then(() => res.redirect('/characters'))
        .catch(err => console.error(err))

})

router.post('/character/delete/:character_id', (req, res, next) => {
    const { character_id } = req.params

    characterApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.error(err))
})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
const router = require("express").Router();
const characterService = require('./../services/characters.service')
/* GET home page */
// router.get("/characters", (req, res, next) => {
//     axios.get("https://ih-crud-api.herokuapp.com/characters")
//     .then(responseFromAPI => {
//         // console.log(responseFromAPI)
//         res.render("characters/list-characters", { characters: responseFromAPI.data });
//     })
//     .catch(err => console.error(err))
// });

router.get('/characters', (req, res) => {
    characterService
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
})


router.get("/characters/:id", (req, res, next) => {
    const { id } = req.params

    characterService
        .getOneCharacter(id)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get('/create', (req, res) => {
    res.render('characters/create-character')
})

router.post('/create', (req, res) => {

    const { name, weapon, occupation, debt } = req.body

    const characterData = { name, weapon, occupation, debt }

    characterService
        .saveCharacter(characterData)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})


router.get('/characters/:id/edit', (req, res) => {

    characterService
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

    characterService
        .editCharacter(id, newCharacterData)
        .then(response => {
            res.redirect('/characters')
        })
        .catch(err => console.log(err))
})

router.get('/characters/:id/elimina', (req, res) => {

    const { id } = req.params

    characterService
        .deleteCharacter(id)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
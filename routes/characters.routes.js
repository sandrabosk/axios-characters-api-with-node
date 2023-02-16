const router = require("express").Router();

const axios = require("axios");
const { response } = require("express");
const { reset } = require("nodemon");

const ApiService = require('../services/character.service')

const charactersApi = new ApiService()

router.get('/characters', (req, res, next) => {
    charactersApi
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))
})

router.get('/characters/details/:character_id', (req, res, next) => {
    const { character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character', { characters: response.data }))
        .catch(err => next(err))
})

router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res, next) => {
    // res.send('hola')
    const { name, weapon, ocupation } = req.body
    charactersApi
        .saveCharacter({ name, weapon, ocupation })
        .then(() => res.redirect('characters/list-characters'))
        .catch(err => next(err))
})

router.get('/characters/update/:character_id', (req, res, next) => {
    // res.send('hola')
    // console.log('hola')
    const { character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/update-character', { characters: response.data }))
        .catch(err => next(err))
})

router.post('/characters/update/:character_id', (req, res, next) => {

    const { character_id } = req.params
    // console.log(character_id);
    const { name, weapon, ocupation } = req.body

    charactersApi
        .editCharacter(character_id, { name, weapon, ocupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.post('/characters/delete/:character_id', (req, res, next) => {

    const { character_id } = req.params

    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})




// /* GET home page */
// router.get("/characters", (req, res, next) => {
//     axios.get("https://ih-crud-api.herokuapp.com/characters")
//         .then(responseFromAPI => {
//             // console.log(responseFromAPI)
//             res.render("characters/list-characters", { characters: responseFromAPI.data });
//         })
//         .catch(err => console.error(err))
// });

// router.get("/characters/:id", (req, res, next) => {
//     axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
//         .then(responseFromAPI => {
//             // console.log("details: ", responseFromAPI.data)
//             res.render("characters/details-character", { character: responseFromAPI.data });
//         })
//         .catch(err => console.error(err))
// });

// router.get('/Charat¡cter/create', (req, res, next) => {

// })

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
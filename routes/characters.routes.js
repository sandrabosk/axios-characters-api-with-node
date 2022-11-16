const router = require("express").Router();
const axios = require("axios");
const { response } = require("express");
const characterApi = require('./../services/characters-api.service')
const api = new characterApi


/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

//get detalles
router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});


//Create a new character
router.get('/crear', (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/crear", (req, res, next) => {

    const { name, occupation, weapon } = req.body
    console.log(req.body)
    api
        .createCharacter({ name, occupation, weapon })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})

//Update a character
router.get("/characters/:id/editar", (req, res, next) => {
    const { id: character_id } = req.params
    api
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => console.log(err))
})
router.post("/characters/:id/editar", (req, res, next) => {

    const { id: character_id } = req.params
    const { name, occupation, weapon } = req.body

    api
        .editCharacter(character_id, { name, occupation, weapon })
        // .then(() => res.redirect('/characters'))
        .then(() => res.redirect(`/characters/${character_id}`))
        .catch(err => console.log(err))
})


//Delete a character
router.post('/characters/:id/delete', (req, res, next) => {
    const { id: character_id } = req.params

    api
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
});



module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
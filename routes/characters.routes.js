const router = require("express").Router();
 const axios = require("axios");

const charactersApi = require('../services/characters.service')

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

// crear personaje

router.get('/characters/create', (req, res) => {
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


// editar personaje

router.get('/characters/:id/edit', (req, res, next) => {

    const { id: character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})


router.post('/characters/:id/update', (req, res, next) => {

    const { id: character_id } = req.params
    const { name, weapon, occupation } = req.body

    const newCharacter = { name, weapon, occupation }

    charactersApi
        .editCharacter(character_id, newCharacter)
        .then(() => res.redirect(`/characters/${character_id}`))
        .catch(err => next(err))
})


// Eliminar Personaje

router.post('/characters/:id/delete', (req, res, next) =>{

    const { id: character_id } = req.params

    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})




router.get("/characters/:id", (req, res, next) => {
    console.log("entro en segundo endpoint")
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});





module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
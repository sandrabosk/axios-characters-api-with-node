const router = require("express").Router();
const axios = require("axios");
const CharactersApi = require('../services/characters-api');

/* GET home page */

router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get("/list", (req, res, next) => {

    CharactersApi
        .getAllCharacters()
        .then(response => {

            res.render('characters/list-characters', { characters: response.data })
        })
        .catch(err => next(err))
})

//Detalles
router.get("/details/:id", (req, res, next) => {

    const { id } = req.params
    console.log(req.params)

    CharactersApi
        .getOneCharacter(id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
})

//CREAR
router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/create", (req, res, next) => {

    const { name, weapon, occupation, debt } = req.body

    CharactersApi
        .saveCharacter({ name, weapon, occupation, debt })
        .then(response => res.redirect(`/characters/details-character/${response.data.id}`))
        .catch(err => next(err))
})

//Editar
router.get("/edit/:id", (req, res, next) => {

    const { id } = req.params

    CharactersApi
        .getOneCharacter(id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))

})

router.post("/editar/:id", (req, res, next) => {

    const { name, weapon, occupation, debt } = req.body
    const { id } = req.params

    CharactersApi
        .editCharacter(id, { name, weapon, occupation, debt })
        .then(response => res.redirect(`/characters/details-character/${response.data.id}`))
        .catch(err => next(err))
})

//DELETE
router.post('/delete/:id', (req, res, next) => {

    const { id } = req.params

    CharactersApi
        .deleteCharacter(id)
        .then((response => res.redirect('/characters')))
        .catch(err => next(err))
})



module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
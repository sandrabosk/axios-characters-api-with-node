const router = require("express").Router();
const axios = require("axios");

const apiService = require("../services/characters.services");
const { response } = require("express");

/* GET home page */
router.get("/characters", (req, res, next) => {

    apiService
        .getAllCharacters()
        .then(results => res.render("characters/list-characters", { characters: results.data }))
        .catch(err => next(err))
});


router.get("/characters/create", (req, res, next) => {
    res.render("characters/create")

})

router.post("/characters/create", (req, res, next) => {

    const { name, occupation, weapon } = req.body

    const char_data = { name, occupation, weapon }

    apiService
        .createCharacter(char_data)
        .then(() => res.redirect("/characters"))
        .catch(err => next(err))
})

router.get("/characters/edit/:char_id", (req, res, next) => {

    const { char_id } = req.params

    apiService
        .getOneCharacter(char_id)
        .then(response => res.render("characters/edit", { character: response.data }))
        .catch(err => next(err))
})


router.post("/characters/edit/:char_id", (req, res, next) => {

    const { char_id } = req.params
    const { name, occupation, weapon } = req.body
    const char_data = { name, occupation, weapon }

    apiService
        .editCharacter(char_id, char_data)
        .then(() => res.redirect("/characters"))
        .catch(err => next(err))
})


router.get("/characters/:char_id", (req, res, next) => {

    const { char_id } = req.params

    apiService
        .getOneCharacter(char_id)
        .then(results => res.render("characters/details", { character: results.data }))
        .catch(err => next(err))
});

router.post("/characters/delete/:char_id", (req, res, next) => {

    const { char_id } = req.params

    apiService
        .deleteCharacter(char_id)
        .then(() => res.redirect("/characters"))
        .catch(err => next(err))
})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
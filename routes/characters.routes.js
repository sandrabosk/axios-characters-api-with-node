
const router = require("express").Router();
const axios = require("axios");
const ApiService = require("../services/characters.service");

const charactersApi = new ApiService()
/* GET home page */

router.get("/characters", (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get("/characters/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/characters/create", (req, res, next) => {

    const { name, weapon, occupation } = req.body

    charactersApi
        .saveCharacter({ name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})


router.get("/characters/:id/edit", (req, res, next) => {

    const { id } = req.params

    charactersApi
        .getOneCharacter(id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})

router.post("/characters/:id/update", (req, res, next) => {

    const { id } = req.params
    const { name, weapon, occupation } = req.body

    charactersApi
        .editCharacter(id, { name, weapon, occupation })
        .then(() => res.redirect(`/characters/${id}`))
        .catch(err => next(err))
})

router.post("/characters/:id/delete", (req, res, next) => {

    const { id } = req.params

    charactersApi
        .deleteCharacter(id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})


router.get("/characters/:id", (req, res, next) => {

    const { id } = req.params

    charactersApi
        .getOneCharacter(id)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});
module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
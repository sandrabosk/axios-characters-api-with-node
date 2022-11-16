const router = require("express").Router();
const axios = require("axios");

const charactersApi = require('./../services/characters-api.service')
const api = new charactersApi()

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

/* ID page */
router.get("/characters/:id", (req, res, next) => {
    console.log('hola')
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

/* CREATE page */
router.get("/create", (req, res, next) => {
    res.render("characters/create-character");

});

router.post("/create", (req, res, next) => {
    const { name, occupation, weapon, debt } = req.body

    api
        .createCharacter({ name, occupation, weapon, debt })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
});


/* EDIT page */
router.get("/characters/:characters_id/edit", (req, res, next) => {

    const { characters_id } = req.params

    api
        .getOneCharacter(characters_id)
        .then(response => res.render('characters/edit-character', { characters: response.data }))
        .catch(err => console.log(err))
});

router.post("/characters/:characters_id/update", (req, res, next) => {
    const { characters_id } = req.params
    const { name, occupation, weapon, debt } = req.body

    api
        .editCharacter(characters_id, { name, occupation, weapon, debt })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
});

/* DELETE page */
router.post("/characters/:characters_id/delete", (req, res) => {
    const { characters_id } = req.params

    api
        .deleteCharacter(characters_id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})




module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
const router = require("express").Router();
const axios = require("axios");

const charactersApi = require('./../services/characters-api.service')
const api = new charactersApi()


/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

// Create character form (render)
router.get("/characters/create", (req, res, next) => {
    res.render('characters/create-character')
})

// Create character form (handle)
router.post("/characters/create", (req, res, next) => {

    const { name, occupation, weapon, debt } = req.body

    api
        .createCharacter({ name, occupation, weapon, debt })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})

// List character

router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});


// Edit character form (render)
router.get("/characters/:id/edit", (req, res, next) => {

    const { id: character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => console.log(err))
})


// Edit character form (handle)
router.post("/characters/:id/edit", (req, res, next) => {

    const { id: character_id } = req.params
    const { name, occupation, weapon } = req.body

    api
        .editCharacter(character_id, { name, occupation, weapon })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})

// Delete character

router.post("/characters/:id/delete", (req, res, next) => {

    const { id: character_id } = req.params

    api
        .deleteCharacter(character_id)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
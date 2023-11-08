const router = require("express").Router();
const axios = require("axios");
const characterService = require("../services/character.service");

router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get("/create", (req, res, next) => {
    res.render("characters/create-character")
})

router.post("/create", (req, res, next) => {
    const { name, occupation, weapon, debt } = req.body
    const character_data = { name, occupation, weapon, debt }

    characterService
        .createCharacter(character_data)
        .then(() => res.redirect('/characters'))
        .catch(error => next(error))
})

router.get("/update/:id", (req, res, next) => {
    const { id } = req.params
    characterService
        .getOneCharacter(id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(error => next(error))
})

router.post("/edit/:idCharacter", (req, res, next) => {
    console.log("entro?")

    const { idCharacter } = req.params
    const character_data = { name, occupation, weapon, debt } = req.body

    characterService
        .updateCharacter(idCharacter, character_data)
        .then(() => res.redirect('/characters'))
        .catch(error => next(error))
})

router.get("/delete/:id", (req, res, next) => {
    const { id } = req.params
    characterService
        .deleteCharacter(id)
        .then(() => res.redirect('/characters'))
        .catch(error => next(error))
})


module.exports = router;


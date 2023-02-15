const router = require("express").Router();
const axios = require("axios");
const charactersApi = require("../services/characters.service");

/* GET home page */
router.get("/", (req, res, next) => {
    charactersApi
        .getAllCharacters()
        .then(({ data }) => res.render("characters/list-characters", { characters: data }))
        .catch(err => next(err))
});

router.get("/create", (req, res, next) => res.render("characters/create-character"))

router.post("/", (req, res, next) => {
    const { name, weapon, occupation, debt } = req.body
    charactersApi
        .createCharacter({ name, weapon, occupation, debt })
        .then(() => res.redirect("/characters-list"))
        .catch(err => next(err))

})

router.get("/:id", (req, res, next) => {
    const { id } = req.params
    charactersApi
        .getCharacter(id)
        .then(({ data }) => res.render("characters/details-character", { character: data }))
        .catch(err => next(err))
});

router.get("/:id/update", (req, res, next) => {
    const { id } = req.params
    charactersApi
        .getCharacter(id)
        .then(({ data }) => res.render("characters/edit-character", { character: data }))
        .catch(err => next(err))
})

router.post("/:id/update", (req, res, next) => {
    const { id } = req.params
    const { name, weapon, occupation, debt } = req.body
    charactersApi
        .updateCharacter(id, { name, weapon, occupation, debt })
        .then(() => res.redirect("/characters"))
        .catch(err => next(err))
})

router.post("/:id/delete", (req, res, next) => {
    const { id } = req.params
    charactersApi
        .deleteCharacter(id)
        .then(() => res.redirect("/characters"))
        .catch(err => next(err))
})




module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
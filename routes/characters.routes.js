const router = require("express").Router();
const axios = require("axios");
const charactersApi = require("../services/character.service");

/* GET home page */
router.get("/characters-list", (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(response => {
            console.log(response)
            res.render("characters/list-characters", { characters: response.data });
        })
        .catch(err => console.error(err))
});

router.get("/characters/:id", (req, res, next) => {
    const { id: character_id } = req.params
    charactersApi
        .getOneCharacter(character_id)
        .then(characterFromApi => {
            res.render("characters/details-character", { character: characterFromApi.data });
        })
        .catch(err => console.error(err))
});


router.get("/create-new-character", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/create-new-character", (req, res, next) => {

    const { name, occupation, weapon } = req.body

    const newCharacter = { name, occupation, weapon }

    charactersApi
        .saveCharacter(newCharacter)
        .then((response) => res.redirect('/characters-list'))
        .catch(err => next(err))

})

router.get("/edit-character/:id", (req, res, next) => {

    const { id: character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})

router.post("/edit-character/:id", (req, res, next) => {
    const { id: character_id } = req.params
    const { name, occupation, weapon } = req.body

    const editedCharacter = { name, occupation, weapon }

    charactersApi
        .editCharacter(character_id, editedCharacter)
        .then(() => res.redirect(`/characters/${character_id}`))
        .catch(err => next(err))
})

router.post("/delete-character/:id", (req, res, next) => {
    const { id: character_id } = req.params

    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters-list'))
        .catch(err => next(err))
})






module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
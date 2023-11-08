const router = require("express").Router();
const charactersService = require('../services/characters.services')


/* GET home page */
router.get("/", (req, res, next) => {

    charactersService
        .getAllCharacters()
        .then(response => {
            res.render("characters/list-characters", { characters: response.data });
        })
        .catch(err => next(err))
});

router.get("/create", (req, res, next) => {

    res.render('characters/create-character')
})

router.post("/create", (req, res, next) => {

    const character_data = { name, weapon, occupations } = req.body

    charactersService
        .saveCharacter(character_data)
        .then(() => res.redirect('/characters'))
        .catch(err => next())
})


router.get("/:character_id", (req, res, next) => {

    const { character_id } = req.params

    charactersService
        .getOneCharacter(character_id)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => next(err))
})

router.get("/:character_id/edit", (req, res, next) => {

    const { character_id } = req.params

    charactersService
        .getOneCharacter(character_id)
        .then(character => res.render('characters/edit-character', character.data))
        .catch(err => next(err))

})


router.post('/:character_id/edit', (req, res, next) => {
    const { character_id } = req.params
    const character_data = req.body

    charactersService
        .editCharacter(character_id, character_data)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.post('/:character_id/delete', (req, res) => {

    const { character_id } = req.params

    charactersService
        .destroyCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})


module.exports = router

// https://ih-crud-api.herokuapp.com/characters
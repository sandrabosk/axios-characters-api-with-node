const router = require("express").Router();

const charactersService = require('../service/character.service')

/* GET home page */
router.get("/characters", (req, res, next) => {
    charactersService
        .getAllCharacters()
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});


router.get("/characters/:id", (req, res, next) => {
    const { id: character_id } = req.params
    charactersService
        .getOneCharacter(character_id)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});
router.get('/character/create', (req, res, next) => {
    res.render("characters/create-character")
})
router.post('/character/create', (req, res, next) => {
    const { name, occupation, weapon } = req.body

    const character_data = { name, occupation, weapon }
    charactersService
        .createCharacter(character_data)
        .then(() => {
            res.redirect("/characters")
        })
        .catch(err => next(err))

})
router.get('/character/:id/edit', (req, res, next) => {
    const { id: character_id } = req.params
    charactersService
        .getOneCharacter(character_id)
        .then(character => {
            res.render("characters/edit-character", { character: character.data })
        })
        .catch(err => next(err))
})
router.post('/character/:id/edit', (req, res, next) => {
    const { name, occupation, weapon } = req.body
    const { id: character_id } = req.params
    const character_data = { name, occupation, weapon }
    charactersService
        .updateCharacter(character_id, character_data)
        .then(() => {
            res.redirect(`/character/${character_id}`)
        })
        .catch(err => next(err))
})
router.get('/character/:id/delete', (req, res, next) => {
    const { id: character_id } = req.params
    charactersService
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
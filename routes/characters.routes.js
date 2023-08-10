const router = require("express").Router();
const characterApi = require('../services/character-service')

/* GET home page */
router.get("/characters", (req, res, next) => {
    characterApi
        .getAllCharacters()
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get("/characters/create", (req, res) => {
    res.render('characters/create-character')

})


router.post("/characters/create", (req, res, next) => {
    const { name, occupation, weapon } = req.body
    const character_data = { name, occupation, weapon }
    characterApi
        .saveCharacter(character_data)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.get("/characters/:id", (req, res, next) => {
    const { id: characterId } = req.params

    characterApi
        .getOneCharacter(characterId)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});


router.get("/characters/:id/edit", (req, res, next) => {
    const { id: characterId } = req.params


    characterApi
        .getOneCharacter(characterId)
        .then(responseFromAPI => {

            res.render("characters/edit-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});



router.post("/characters/:id/edit", (req, res) => {

    const { id: characterId } = req.params

    const { name, occupation, weapon } = req.body
    const character_data = { name, occupation, weapon }
    characterApi
        .editCharacter(characterId, character_data)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))

})


router.post("/characters/:id/delete", (req, res, next) => {
    const { id: characterId } = req.params

    characterApi
        .deleteCharacter(characterId)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
}
)




module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
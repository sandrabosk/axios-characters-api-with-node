const router = require("express").Router();
const charactersApi = require('../services/characters-service')


router.get("/characters-list", (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => next(err))
});
router.get('/characters/create', (req, res) => {
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res, next) => {
    const { name, occupation, weapon, debt = "false" } = req.body
    const newCharacter = { name, occupation, weapon, debt }

    charactersApi
        .saveCharacter(newCharacter)
        .then(() => res.redirect('/characters-list'))
        .catch(err => next(err))
})

router.get("/characters/:id", (req, res, next) => {
    const { id: characterId } = req.params

    charactersApi
        .getOneCharacter(characterId)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => next(err))
});

router.get('/characters/:id/edit', (req, res) => {
    const { id: characterID } = req.params

    charactersApi
        .getOneCharacter(characterID)
        .then((response) => {
            if (response.data.debt === 'true') {
                response.data.selectDebt = true
            }
            res.render('characters/edit-character', { character: response.data })
        })
})



router.post('/characters/:id/update', (req, res, next) => {
    const { id: characterID } = req.params
    const { name, occupation, weapon, debt = "false" } = req.body

    const editedCharacter = { name, occupation, weapon, debt }

    charactersApi
        .editCharacter(characterID, editedCharacter)
        .then(() => res.redirect('/characters-list'))
        .catch(err => next(err))
})

router.post('/characters/:id/delete', (req, res, next) => {
    const { id: characterID } = req.params

    charactersApi
        .deleteCharacter(characterID)
        .then(() => res.redirect('/characters-list'))
        .catch(err => next(err))

})


module.exports = router;

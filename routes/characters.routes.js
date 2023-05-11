const router = require("express").Router();
const charactersApiHandler = require("./../services/character-api.service");

/* GET home page */
router.get("/characters", (req, res, next) => {
    charactersApiHandler
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))
});

router.get("/characters/:id", (req, res, next) => {
    const { id } = req.params
    charactersApiHandler
        .getOneCharacter(id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
});

router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})
router.post('/characters', (req, res, next) => {
    const { name, weapon, occupation } = req.body

    charactersApiHandler
        .createCharacter({ name, weapon, occupation })
        .then(res.redirect('/characters'))
        .catch(err => next(err))
})

router.get('/update/:id', (req, res, next) => {
    const { id } = req.params
    charactersApiHandler
        .getOneCharacter(id)
        .then(response => res.render('characters/update-character', { character: response.data }))
        .catch(err => next(err))
})

router.post('/update/:id', (req, res, next) => {

    const { name, weapon, occupation } = req.body
    const { id } = req.params
    charactersApiHandler
        .editCharacter(id, { name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})

router.post('/character/:id/delete', (req, res, next) => {
    const { id } = req.params
    charactersApiHandler
        .deleteCharacter(id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))

})
module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
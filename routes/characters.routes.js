const router = require("express").Router();

const CharactersHandler = require('../services/characters-api.service')

/* GET home page */
router.get("/characters", (req, res, next) => {

    CharactersHandler
        .getAllCharacters()
        .then(responseFromAPI => res.render("characters/list-characters", { character: responseFromAPI.data }))
        .catch(err => next(err))
});


router.get("/characters/:character_id", (req, res, next) => {

    const { character_id } = req.params

    CharactersHandler
        .getOneCharacter(character_id)
        .then(responseFromAPI => res.render("characters/details-character", { character: responseFromAPI.data }))
        .catch(err => next(err))
});

router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/create', (req, res, next) => {

    const { name, weapon, occupation } = req.body

    CharactersHandler
        .saveCharacter({ name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})

router.get('/edit/:character_id', (req, res, next) => {

    const { character_id } = req.params

    CharactersHandler
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))

})

router.post('/edit/:character_id', (req, res, next) => {

    const { name, weapon, occupation } = req.body
    const { character_id } = req.params

    CharactersHandler
        .editCharacter(character_id, { name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})

router.post('/delete/:character_id', (req, res, next) => {

    const { character_id } = req.params

    CharactersHandler
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
})
module.exports = router;


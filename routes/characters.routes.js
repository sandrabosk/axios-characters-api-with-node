const router = require("express").Router();
const charactersApiHandler = require('../services/characters-api.service');

/* GET home page */
router.get("/", (req, res, next) => {

    charactersApiHandler
        .getAllCharacters()
        .then(response =>
            res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))

});


//Character Create
router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/create", (req, res, next) => {
    const { name, occupation, weapon, debt } = req.body

    charactersApiHandler
        .saveCharacter({ name, occupation, weapon, debt })
        .then(() =>
            res.redirect('/characters'))
        .catch(err => next(err))
})


// Character Details
router.get("/:id", (req, res, next) => {
    const { id } = req.params

    charactersApiHandler
        .getOneCharacter(id)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))

});


router.post('/:id', (req, res, next) => {
    const { id } = req.params

    charactersApiHandler
        .getOneCharacter(id)
        .then(response =>
            res.render('characters/details-characters', { character: response.data }))
        .catch(err => next(err))

});


//Character Edit
router.get("/:id/edit", (req, res, next) => {
    const { id } = req.params

    charactersApiHandler
        .getOneCharacter(id)
        .then(response =>
            res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))

})
router.post("/:id/edit", (req, res, next) => {
    const { id } = req.params
    const { name, occupation, weapon, debt } = req.body

    charactersApiHandler
        .editCharacter(id, { name, weapon, occupation, debt })
        .then(response =>
            res.redirect(`/characters/${id}`))
        .catch(err => next(err))

})


//Delete Character
router.post("/:id/delete", (req, res, next) => {
    const { id } = req.params

    charactersApiHandler
        .deleteCharacter(id)
        .then(() =>
            res.redirect(`/characters`))
        .catch(err => next(err))

})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
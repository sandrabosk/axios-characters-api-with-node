const router = require("express").Router();


const charactersApiHandler = require('../services/characters-api.service');


/* GET home page */
router.get("/characters", (req, res, next) => {

    charactersApiHandler
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', {characters: response.data}))
        .catch(err => next(err))
});

// Character Creation
router.get("/characters/create", (req, res, next) => {

    res.render('characters/create-character')
});

router.post('/characters/create', (req, res, next) => {

    const { name, weapon, occupation } = req.body

    charactersApiHandler
        .saveCharacter({ name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))

})

//Character Details
router.get("/characters/:id", (req, res, next) => {

    const { id } = req.params

    charactersApiHandler
        .getOneCharacter(id)
        .then(response => res.render('characters/details-character', { characters : response.data}))
        .catch(err => next(err))

});


// Character edition
router.get('/characters/:id/edit', (req, res, next) => {

    const { id } = req.params

    charactersApiHandler
        .getOneCharacter(id)
        .then(response => res.render('characters/edit-character', {character: response.data}))
        .catch(err => next(err))
        
})

router.post('/characters/:id/edit', (req, res, next) => {

    const { name, weapon, occupation } = req.body
    const { id } = req.params

    charactersApiHandler
        .editCharacter(id, { name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})


// Delete Character
router.post('/characters/:id/delete', (req, res, next) => {

    const { id } = req.params

    charactersApiHandler
        .deleteCharacter(id)
        .then(response => res.redirect('/characters'))
        .catch(err => next(err))

})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
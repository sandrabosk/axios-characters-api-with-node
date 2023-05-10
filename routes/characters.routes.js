const router = require("express").Router();
const axios = require("axios");


const characterHandler = require('../services/characters.service')

/* GET home page */
router.get("/characters", (req, res, next) => {

    characterHandler
        .getCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.error(err))
});


//CREATE 

router.get("/characters/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/characters/create", (req, res, next) => {

    const { name, weapon, occupation } = req.body

    characterHandler
        .saveCharacter({ name, weapon, occupation })
        .then(response => res.redirect(`/characters`))
        .catch(err => next(err))
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/characters/:id", (req, res, next) => {

    const { id } = req.params

    characterHandler
        .getOneCharacter(id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => console.error(err))

});

// EDIT

router.get("/characters/:id/edit", (req, res, next) => {

    const { id } = req.params

    characterHandler
        .getOneCharacter(id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))

})

router.post("/characters/:id/edit", (req, res, next) => {

    const { name, weapon, occupation } = req.body
    const { id } = req.params

    characterHandler
        .editCharacter(id, { name, weapon, occupation })
        .then(() => res.redirect(`/characters`))
        .catch(err => next(err))
})

// DELETE 

router.post("/characters/:id/delete", (req, res, next) => {

    const { id } = req.params

    characterHandler
        .deleteCharacter(id)
        .then(() => res.redirect(`/characters`))
        .catch(err => next(err))
})



module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
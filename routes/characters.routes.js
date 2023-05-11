const router = require("express").Router();
const axios = require("axios");

const charactersApiHandler = require('../services/characters-api-service')


// get all
router.get("/characters", (req, res, next) => {
    charactersApiHandler.getCharacters()
    // .then(responseFromAPI => res.send(responseFromAPI.data))
    .then(responseFromAPI => res.render("characters/list-characters", { characters: responseFromAPI.data }))
    .catch(err => console.error(err))
});


// get one
router.get("/characters/:id", (req, res, next) => {

    const {id} = req.params

    charactersApiHandler.getOneCharacter(id)
    // .then(responseFromAPI => res.send(responseFromAPI.data))
    .then(responseFromAPI => res.render("characters/details-character", { character: responseFromAPI.data }))
    .catch(err => console.error(err))

});


// create one (render)
router.get("/create", (req, res, next) => {
    res.render("characters/create-character")
});

// create one (handler)
router.post("/create", (req, res, next) => {

    const {name, occupation, debt, weapon} = req.body

    charactersApiHandler.createCharacter({name, occupation, debt, weapon})
    .then( () => res.redirect('/characters'))
    .catch(err => console.error(err))

});


// edit (render)
router.get("/characters/:id/edit", (req, res, next) => {

    const {id} = req.params

    charactersApiHandler.getOneCharacter(id)
    // .then(responseFromAPI => res.send(responseFromAPI.data))
    .then(responseFromAPI => res.render("characters/edit-character", { character: responseFromAPI.data }))
    .catch(err => console.error(err))

});

// edit (handler)
router.post("/characters/:id/edit", (req, res, next) => {

    const {id} = req.params

    const {name, occupation, debt, weapon} = req.body

    charactersApiHandler.editCharacter( id , {name, occupation, debt, weapon})
    .then( () => res.redirect(`/characters/${id}`))
    .catch(err => console.error(err))

});

// delete
router.post("/characters/:id/delete", (req, res, next) => {

    const {id} = req.params

    charactersApiHandler.deleteCharacter( id )
    .then( () => res.redirect(`/characters`))
    .catch(err => console.error(err))

});





module.exports = router;


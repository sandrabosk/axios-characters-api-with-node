const router = require("express").Router();


const charactersApiHandler = require('../services/characters-api.service');
const { response } = require("express");

/* GET home page */
router.get("/characters", (req, res, next) => {
    charactersApiHandler
    .getAllCharacters()
    .then(response => res.render('characters/list-characters', {characters: response.data}))
    .catch(err => console.log(err))
});

router.get("/characters/create", (req, res, next) => {
  res.render('characters/create-character')
})

router.post("/characters/create", (req, res, next) => {

    const {name, occupation, debt, weapon} = req.body

     charactersApiHandler
    .createCharacter({name, occupation, debt, weapon}) 
    .then(response => res.redirect(`/characters/${response.data.id}`))
    .catch(err => console.log(err))
})


router.get("/characters/:id", (req, res, next) => {

    const {id} = req.params

    charactersApiHandler
    .getOneCharacter(id)
    .then(response => res.render('characters/details-character', {character: response.data}))
    .catch(err => console.log(err))
});

router.get("/characters/:id/edit", (req, res, next) => {

    const {id} = req.params

    charactersApiHandler
    .getOneCharacter(id)
    .then(response =>  res.render('characters/edit-character', {character: response.data}))
    .catch(err=>console.log(err))
})

router.post("/characters/:id/edit", (req, res, next) => {

    const {id} = req.params
    const {name, occupation, debt, weapon} = req.body

    charactersApiHandler
    .editCharacter(id, {name, occupation, debt, weapon})
    .then(response => res.redirect(`/characters`))
    .catch(err => console.log(err))
})

router.post("/characters/:id/delete", (req, res, next) => {

    const {id} = req.params

    charactersApiHandler
    .deleteCharacter(id)
    .then(response =>res.redirect('/characters'))
    .catch(err => console.log(err))
})






module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
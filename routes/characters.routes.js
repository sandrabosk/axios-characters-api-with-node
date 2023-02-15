const router = require("express").Router();
const axios = require("axios");
const ApiService = require('./../services/characters.service')


/* GET home page */
router.get("/", (req, res, next) => {
    ApiService
        .getAllCharacters()
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
})

router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/create', (req, res, next) => {

    const { name, weapon, occupation } = req.body

    ApiService
        .addNewCharacter({ name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => console.error(err))

})

router.get('/edit/:id', (req, res, next) => {
    const { id } = req.params
    ApiService
        .getOneCharacter(id)
        .then(char => res.render('characters/edit-character', { character: char.data }))
        .catch(err => console.error(err))

})

router.post('/edit/:id', (req, res, next) => {
    const { id } = req.params
    const { name, weapon, occupation } = req.body

    ApiService
        .editCharacter(id, { name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => console.error(err))

})

router.post('/delete/:id', (req, res, next) => {
    const { id } = req.params
    ApiService
        .deleteCharacter(id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.error(err))

})

router.get("/:id", (req, res, next) => {
    const { id } = req.params
    ApiService
        .getOneCharacter(id)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});





module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
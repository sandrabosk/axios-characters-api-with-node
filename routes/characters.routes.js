const router = require("express").Router();
const axios = require("axios");


const apiCharacterHandler = require('../services/characters-api.service')

/* GET home page */
router.get("/characters", (req, res, next) => {

    apiCharacterHandler
        .getAllCharacters()
        .then(responseFromAPI => res.render("characters/list-characters", { character: responseFromAPI.data }))
        .catch(err => next(err))
});


//Character Details Page

router.get("/characters/:character_id", (req, res, next) => {

    const { character_id } = req.params

    apiCharacterHandler
        .getOneCharacter(character_id)
        .then(responseFromAPI => res.render("characters/details-character", { character: responseFromAPI.data }))
        .catch(err => next(err))

});



//create characters Page



router.get('/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/create', (req, res, next) => {

    const { name, weapon, occupation } = req.body

    apiCharacterHandler
        .saveCharacter({ name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})


//editar el personaje

router.get('/edit/:character_id', (req, res, next) => {

    const { character_id } = req.params

    apiCharacterHandler
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))

})

router.post('/edit/:character_id', (req, res, next) => {

    const { name, weapon, occupation } = req.body
    const { character_id } = req.params

    apiCharacterHandler
        .editCharacter(character_id, { name, weapon, occupation })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})

//Borrar el personaje(método post)

router.post('/delete/:character_id', (req, res, next) => {

    const { character_id } = req.params

    apiCharacterHandler
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
})




module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
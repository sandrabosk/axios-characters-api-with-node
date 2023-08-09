const router = require("express").Router();
const { response } = require("express");
const charactersApi = require("../services/characters.service");

/* GET home page */ /*2LIST ALL THE CHARACTERS, modificamos la ruta de German, con la Api creada*/
router.get('/characters', (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(response => res.render('characters/list-character', { characters: response.data }))
        .catch(err => next(err))
})


// 4. CREATE A NEW CHARACTER (MIRARA NOTA AL PIE DE ESTE; ANTES DEL 3)

router.get('/characters/create', (req, res, next) => {

    res.render('characters/create-character')
})

router.post('/characters/create', (req, res, next) => {

    const { name, weapon, occupation } = req.body
    const newCharacter = { name, weapon, occupation }

    charactersApi
        .saveCharacter(newCharacter)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})
/*ojo, importancia del orden, :id "recoge" cualquier dato que le caiga, y como el inicio de la ruta es 
characters/"loquesea", si está primero la iteración del :id y es la ruta create, lo recoge y error, porque no lo encuentra*/


// 3. CHARACTER DETAILS PAGE
router.get('/characters/:id', (req, res, next) => {

    const { id: character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then((response) => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
})


//5. UPDATE DE CHARACTER
router.get('/characters/:id/edit', (req, res, next) => {

    const { id: character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then((response) => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))

})

router.post('/characters/:id/edit', (req, res, next) => {

    const { id: character_id } = req.params
    const { name, weapon, occupation } = req.body

    const newCharacter = { name, weapon, occupation }

    charactersApi
        .editCharacter(character_id, newCharacter)
        .then(() => res.redirect('/characters/:id'))
        .catch(err => next(err))
})


//6. DELETE

router.post('/characters/:id/delete', (res, req, next) => {

    const { id: character_id } = req.params

    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
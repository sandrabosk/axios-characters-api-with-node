const router = require("express").Router();
const axios = require("axios");

// Link with Services 
const charactersApi = require('./../services/characters-api-service')
const api = new charactersApi()

// Characters list
router.get("/list", (req, res, next) => {
    // res.send('Hola')
    api
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.log(err))
})

// Character Details 

router.get('/:id/details', (req, res, next) => {

    // res.send('detalles')

    const { id: character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => console.log(err))
})

// Create a Character (form -render)

router.get("/creating", (req, res, next) => {
    // res.send('holi')
    res.render('characters/create-character')
})

// Create a Character (form -handle)
router.post("/creating", (req, res, next) => {

    const { name, occupation, weapon } = req.body

    api
        .createCharacter({ name, occupation, weapon })
        .then(() => res.redirect("/characters/list"))
        .catch(err => console.log(err))
})


// Edit Character(form - render)

router.get("/:id/editing", (req, res, next) => {
    // res.send('editing')

    const { id: character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { characters: response.data }))
        .catch(err => console.log(err))
})

//  Edit a Character (form -handle)


router.post("/:id/editing", (req, res, next) => {

    const { id: character_id } = req.params
    const { name, occupation, weapon } = req.body

    api
        .editCharacter(character_id, { name, occupation, weapon })
        .then(() => res.redirect('/characters/list'))
        .catch(err => console.log(err))


})

// Delete 

router.post('/:id/delete', (req, res, next) => {

    const { id: character_id } = req.params

    api
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters/list'))
        .catch(err => console.log(err))

});


module.exports = router;





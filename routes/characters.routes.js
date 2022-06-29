const router = require("express").Router();
const characterService = require('./../services/characters.service')

//LIST
router.get("/characters-list", (req, res, next) => {
    characterService
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.log(err))
});
//CREATE
router.get('/characters/create', (req, res) => {
    res.render('characters/create-character')
})

router.post('/characters/create', (req, res) => {
    const { name, weapon, occupation } = req.body
    const characterData = { name, weapon, occupation }

    characterService
        .saveCharacter(characterData)
        .then(() => res.redirect('/characters-list'))
        .catch(err => console.log(err))
})

//DETAILS
router.get("/characters/:id", (req, res, next) => {

    characterService
        .getOneCharacter(req.params.id)
        .then(responseApi => {
            const character = responseApi.data
            res.render('characters/details-character', { character })

        })
        .catch(err => console.log(err))
});

//UPDATE
router.get('/characters/:id/edit', (req, res) => {

    characterService
        .getOneCharacter(req.params.id)
        .then(response => {
            const character = response.data
            res.render('characters/edit-character', character)
        })
        .catch(err => console.log(err))
})


router.post('/characters/:id/edit', (req, res) => {

    const { id } = req.params
    const newCharacterData = req.body

    characterService
        .editCharacter(id, newCharacterData)
        .then(response => res.redirect('/characters-list'))
        .catch(err => console.log(err))
})

//DELETE

router.get('/characters/:id/delete', (req, res) => {

    const { id } = req.params

    characterService
        .deleteCharacter(id)
        .then(response => res.redirect('/characters-list'))
        .catch(err => console.log(err))
})



module.exports = router;



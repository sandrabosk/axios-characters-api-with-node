const router = require("express").Router()
const characterService = require('../services/characteres.services')

/* GET home page */
router.get("/characters-list", (req, res, next) => {


    characterService
        .getAllCharacters()
        .then(response => {
            console.log("Entramos en el get")
            res.render("characters/list-characters", { characters: response.data })
        })
        .catch(err => next(err))
})

router.get("/characters/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/characters/create", (req, res, next) => {
    const { name, occupation, weapon } = req.body
    const character_data = { name, occupation, weapon }

    characterService
        .saveCharacter(character_data)
        .then(() => res.redirect('/characters-list'))
        .catch(err => next(err))
})



router.get("/characters/:characterId/edit", (req, res, next) => {

    const { characterId } = req.params


    characterService
        .getOneCharacter(characterId)
        .then(response => res.render("characters/edit-character", { character: response.data }))
        .catch(err => next(err))

})

router.post("/characters/:characterId/edit", (req, res, next) => {
    console.log("AQUI ENTRAAA")
    const { characterId } = req.params
    const { name, occupation, weapon } = req.body
    const character = { name, occupation, weapon }


    characterService
        .editCharacter(characterId, character)
        .then(() => res.redirect("/characters-list"))
        .catch(err => next(err))

})

router.post("/characters/:characterId/delete", (req, res, next) => {

    const { characterId } = req.params

    characterService
        .deleteCharacter(characterId)
        .then(() => res.redirect('/characters-list'))
        .catch(err => next(err))

})

router.get("/characters/:characterId", (req, res, next) => {

    const { characterId } = req.params

    characterService
        .getOneCharacter(characterId)
        .then(response => {
            res.render("characters/details-character", { character: response.data })
        })
        .catch(err => next(err))
})


module.exports = router


// https://ih-crud-api.herokuapp.com/characters
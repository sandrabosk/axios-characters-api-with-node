const router = require("express").Router();
const axios = require("axios");

const ApiService = require('../service/characters.service')

const charactersApi = new ApiService()



router.get("/characters", (req, res, next) => {

    charactersApi
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))
});
router.get("/characters/:id", (req, res, next) => {

    const { id } = req.params

    charactersApi
        .getOneCharacter(id)
        .then(response => {
            // res.send({ character: response.data })
            res.render('characters/details-character', { character: response.data })
        })
        .catch(err => next(err))
})




router.get("/crear", (req, res, next) => {
    res.render('characters/create')
})

router.post("/crear", (req, res, next) => {

    const { name, weapon, occupation } = req.body

    charactersApi
        .saveCharacter({ name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})




router.get("/editar/:character_id", (req, res, next) => {

    const { character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit', { character: response.data }))
        .catch(err => next(err))
})

router.post("/editar/:character_id", (req, res, next) => {

    // const { character_id } = req.params
    const { name, weapon, occupation, id } = req.body

    charactersApi
        .editCharacter(id, { name, weapon, occupation })
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})

router.post("/eliminar/:character_id", (req, res) => {

    const { character_id } = req.params

    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))

})
module.exports = router;




// https://ih-crud-api.herokuapp.com/characters
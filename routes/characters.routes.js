const router = require("express").Router();


const charactersApi = require('./../services/characters.api.service')
const api = new charactersApi()

router.get("/characters/list", (req, res) => {
    //res.send('HoliHoli')

    api
        .getAllCharacters()
        .then(({ data: characters }) => res.render('characters/list-characters', { characters }))
        .catch(err => console.log(err))
})

router.get("/characters/list/:id", (req, res) => {

    const { id: character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(({ data: character }) => res.render('characters/details-character', { character }))
        .catch(err => console.log(err))
})

//CREATE

router.get("/characters/create", (req, res) => {
    res.render('characters/create-character')
})


router.post("/characters/create", (req, res) => {

    const { name, occupation, weapon } = req.body

    api
        .createCharacter({ name, occupation, weapon })
        .then(() => res.redirect('/characters/list'))
        .catch(err => console.log(err))
})

//Delete

router.get("/characters/list/:id/delete", (req, res) => {

    const { id: character_id } = req.params
    api
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters/list'))
        .catch(err => console.log(err))
})

//EDIT

router.get("/characters/list/:id/edit", (req, res) => {

    //res.send('HOLIHOLI')
    const { id: character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(({ data: character }) => res.render('characters/edit-character', { character }))
        .catch(err => console.log(err))
})

router.post("/characters/list/:id/edit", (req, res) => {

    const { id: character_id } = req.params
    const { name, occupation, weapon } = req.body

    api
        .editCharacter(character_id, { name, occupation, weapon })
        .then(() => res.redirect(`/characters/list/${character_id}`))
        .catch(err => console.log(err))

})

module.exports = router









































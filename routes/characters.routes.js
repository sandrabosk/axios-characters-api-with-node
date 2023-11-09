const router = require("express").Router();

const charactersService = require("../services/sservice");

/* GET home page */
router.get("/characters", (req, res, next) => {

    charactersService
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))

})







router.get("/create", (req, res) => {
    res.render('characters/create-character')


})


router.post('/create', (req, res, next) => {

    const { name, occupation, weapon } = req.body
    const character_data = { name, occupation, weapon }

    charactersService
        .saveCharacter(character_data)
        .then(() => res.redirect("/characters",))
        .catch(err => next(err))

})


router.get("/characters/:character_id", (req, res, next) => {


    const { character_id } = req.params

    charactersService
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))
}


)


router.post("/characters/:character_id", (req, res, next) => {
    const { name, occupation, weapon } = req.body
    const { character_id } = req.params

    const character_data = { name, occupation, weapon }

    charactersService
        .editCharacter(character_id, character_data)
        .then(() => res.redirect(`/personajes/detalles/${character_id}`))
        .catch(err => next(err))

})

router.get("/edit/:character_id", (req, res, next) => {

    const { character_id } = req.params


    charactersService
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})



router.post("/edit/:character_id", (req, res, next) => {
    const { character_id } = req.params
    const { name, occupation, weapon } = req.body
    const character_data = { name, occupation, weapon }

    charactersService

        .editCharacter(character_id, character_data)
        .then(() => res.redirect(`/characters/${character_id}`))

}
)

router.get("/delete:character_id", (req, res, next) =>)
charactersService
    .deleteCharacter(character_id)
    .then(() => res.redirect(/characters/))






module.exports = router
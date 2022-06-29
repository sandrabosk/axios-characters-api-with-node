const router = require("express").Router();

const characterService = require('./../services/character.services')

/* GET home page */
router.get("/characters", (req, res, next) => {
    characterService
        .getAllCharacters()
        .then(response => {
            const characters = response.data
            res.render('characters/list-characters', { characters })
        })
        .catch(err => console.log(err))
});


router.get("/characters/:char_id", (req, res, next) => {
    const { char_id } = req.params

    characterService
        .getOneCharacter(char_id)
        .then(response => {
            const character = response.data
            res.render('characters/details-character', { character })
        })
        .catch(err => console.log(err))

})

router.get("/create", (req, res, next) => {

    res.render('characters/create-character')

})

router.post("/create", (req, res, next) => {
    const { name, occupation, weapon } = req.body
    // const { debt } = req.body.debt ? true : false
    // if (req.body.debt) {                                     //Tried to set debt in creatin, was not able to
    //     debt = true
    // }

    const newCharacter = { name, occupation, weapon, debt }
    console.log(newCharacter)

    characterService
        .saveCharacter(newCharacter)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})

router.get("/characters/edit/:id", (req, res, next) => {
    const { id } = req.params

    characterService
        .getOneCharacter(id)
        .then(response => {
            const character = response.data
            res.render('characters/edit-character', { character })
        }
        )
        .catch(err => console.log(err))

})

router.post("/characters/edit/:id", (req, res, next) => {
    const { id } = req.params
    const { debt } = req.body.debt ? req.body.debt === true : req.body.debt === false

    const { name, occupation, weapon } = req.body
    const newCharData = { name, occupation, weapon, debt }

    characterService
        .editCharacter(id, newCharData)
        .then(response => {

            res.redirect('/characters')
        }
        )
        .catch(err => console.log(err))

})

router.get("/characters/delete/:char_id", (req, res, next) => {
    const { char_id } = req.params

    characterService
        .deleteCharacter(char_id)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))

})



module.exports = router;



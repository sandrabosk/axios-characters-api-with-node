const router = require("express").Router();

const { response } = require("../app");
const characterService = require("./../services/characters.service")


/* GET home page */
router.get("/characters", (req, res, next) => {

    characterService //Para requerir los servicios y los métodos que tiene 
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.log(err))

});


router.get("/characters/:character_id", (req, res, next) => {

    const { character_id } = req.params

    characterService
        .getOneCharacter(character_id)
        .then(response => {
            const character = response.data
            res.render('characters/details-character', character)
        })
        .catch(err => console.log(err))
});


router.get("/create", (req, res) => {
    res.render('characters/create-character')
})

router.post("/create", (req, res, next) => {

    const { name, occupation, weapon } = req.body // req.body es lo que se recibe del post

    const charactersValue = { name, occupation, weapon }
    console.log(charactersValue)

    characterService
        .saveCharacter(charactersValue)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))

})

router.get("/characters/:character_id/edit", (req, res, next) => {

    const { character_id } = req.params

    characterService
        .getOneCharacter(character_id)
        .then(response => {
            const character = response.data
            //console.log({ character })
            res.render('characters/edit-character', character)
        })
        .catch(err => console.log(err))

})

router.post("/characters/:character_id/edit", (req, res) => {

    const { character_id } = req.params
    const newCharacterData = req.body

    characterService
        .editCharacter(character_id, newCharacterData)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))

})

//Delete

router.get("/characters/:character_id/delete", (req, res) => {

    const { character_id } = req.params

    characterService
        .deleteCharacter(character_id)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
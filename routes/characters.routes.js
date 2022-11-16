const router = require("express").Router();

const charApi = require("../services/char-api")

const serviceApi = new charApi()

/* GET home page */
router.get("/", (req, res, next) => {

    serviceApi
        .getCharacters()
        .then(characters => res.render("characters/list-characters", { characters: characters.data }))
        .catch(err => console.log(err))
});

router.get("/create", (req, res, next) => res.render("characters/create-character"))

router.get("/:characterID", (req, res, next) => {

    const { characterID } = req.params

    serviceApi
        .getCharacterByID(characterID)
        .then(character => res.render("characters/details-character", { character: character.data }))
        .catch(err => console.log(err))
});



router.post("/create", (req, res, next) => {

    const { name, weapon, occupation } = req.body

    serviceApi
        .createCharacter({ name, weapon, occupation })
        .then(res.redirect("/characters"))
        .catch(err => console.log(err))
})

router.get("/:characterID/edit", (req, res) => {

    const { characterID } = req.params

    serviceApi
        .getCharacterByID(characterID)
        .then(character => res.render("characters/edit-character", { character: character.data }))
        .catch(err => console.log(err))
})

router.post("/:characterID/edit", (req, res) => {

    const { characterID } = req.params
    const { name, weapon, occupation } = req.body

    serviceApi
        .updateCharacter(characterID, { name, weapon, occupation })
        .then(res.redirect("/characters"))
        .catch(err => console.log(err))
})

router.post("/:characterID/delete", (req, res) => {

    const { characterID } = req.params

    serviceApi
        .deleteCharacter(characterID)
        .then(res.redirect("/characters"))
        .catch(err => console.log(err))
})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
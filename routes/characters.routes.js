const router = require("express").Router();
const axios = require("axios");


const characterServices = require("../services/characters.services");
const { config } = require("dotenv");

/* GET home page */
router.get("/", (req, res, next) => {

    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get("/create", (req, res, next) => {

    res.render("characters/create-character")
})

router.post("/create", (req, res, next) => {
    const characterData = { name, occupation, weapon, debt } = req.body

    characterServices
        .createCharacter(characterData)
        .then(() => res.redirect("/characters"))
        .catch(err => next(err))



})

router.get("/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});


router.get("/:characterId/edit", (req, res, next) => {

    const { characterId } = req.params

    characterServices
        .getOneCharacter(characterId)
        .then(character => req.render("characters/edit-character", character.data))
        .catch(err => next(err))
})


router.post("/:characterId/edit", (req, res, next) => {

    const { characterId } = req.params
    const characterData = req.body

    characterServices
        .editCharacter(characterId, characterData)
        .then(() => res.redirect("/characters"))
        .catch(err => next(err))
})
router.post("/:characterId/delete", (req, res, next) => {

    const { characterId } = req.params

    characterServices
        .deleteCharacter(characterId)
        .then(() => res.redirect("/characters"))
        .catch(err => next(err))
})



module.exports = router;



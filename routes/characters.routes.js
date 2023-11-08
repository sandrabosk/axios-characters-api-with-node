const router = require("express").Router();
const charactersService = require("../service/characters.services");

router.get("/characters", (req, res, next) => {
    charactersService
        .getAllCharacters()
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get("/characters/create", (req, res) => {
    res.render("characters/create-character")
})

router.post("/characters/create", (req, res) => {
    const character_data = { name, occupation, weapon } = req.body
    console.log(character_data);

    charactersService
        .postCharacter(character_data)
        .then(() => res.redirect("/characters"))
        .catch(err => console.log(err))
})

router.get("/characters/:id/edit", (req, res) => {
    const { id } = req.params

    charactersService
        .getCharacter(id)
        .then(character => res.render("characters/edit-character", { character: character.data }))
        .catch(err => console.log(err))
})

router.get("/characters/:character_id", (req, res, next) => {
    const { character_id } = req.params

    charactersService
        .getCharacter(character_id)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.post("/characters/:character_id/edit", (req, res, next) => {
    const { character_id } = req.params
    const character_data = { name, occupation, weapon } = req.body

    charactersService
        .updateCharacter(character_id, character_data)
        .then(() => res.redirect(`/characters/${character_id}`))
        .catch(err => console.error(err))
});

router.post("/characters/:character_id/delete", (req, res, next) => {
    const { character_id } = req.params

    charactersService
        .deleteCharacter(character_id)
        .then(() => res.redirect("/characters"))
        .catch(err => console.error(err))
});

module.exports = router;
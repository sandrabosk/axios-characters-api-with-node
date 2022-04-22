const router = require("express").Router();

// *** Require and instantiate our "api.service class" *** //
const ApiService = require('../service/api.service');
const apiService = new ApiService();
// ****************************************************** //


//****** LIST ALL CHARACTERS ******//
router.get("/characters-list", (req, res, next) => {

    apiService
    .getAllCharacters()
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});



//****** GET ONE CHARACTER DETAILS BY ID ******//
router.get("/characters/:id", (req, res, next) => {
    // console.log(req.params.id)
    const characterId = req.params.id

    apiService
    .getCharacterDetail(characterId)
    .then(responseFromAPI => {
        console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});



//***** RENDER CHARACTER CREATION PAGE ******//
router.get("/character/create", (req, res, next) => {
    res.render("characters/create-character");
});



//***** RENDER CHARACTER EDIT PAGE UPON CHOOSING "EDIT CHARACTER" ******//
router.get("/character/:id/edit", (req, res, next) => {
    const characterId = req.params.id

    apiService
    .getCharacterDetail(characterId)
    .then(responseFromAPI => {
        res.render("characters/edit-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});



//****** CREATE ONE NEW CHARACTER WITH PROVIDED CHARACTER INFO ******//
router.post("/characters/create", (req, res, next) => {
    const characterInfo = req.body

    apiService
    .createCharacter(characterInfo)
    .then(responseFromAPI => {
        console.log(`Character id ${responseFromAPI.data.id} created`)
        res.redirect("/characters-list");
    })
    .catch(err => console.error(err))
});



//***** HANDLE CHARACTER UPDATES ******//
router.post("/character/:id/edit", (req, res, next) => {
    const characterInfo = req.body
    const characterId = req.params.id

    apiService
    .updateCharacter(characterId, { characterInfo })
    .then(responseFromAPI => {
        res.redirect(`/characters/${characterId}`);
    })
    .catch(err => console.error(err))
});



//***** HANDLE CHARACTER DELETIONS ******//
router.get("/characters/:id/delete", (req, res, next) => {
    const characterId = req.params.id

    apiService
    .deleteCharacter(characterId)
    .then(responseFromAPI => {
        res.redirect("/characters-list");
    })
    .catch(err => console.error(err))
});



module.exports = router;



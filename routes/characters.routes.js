const router = require("express").Router();
const axios = require("axios");


const ApiService = require('../services/characters.services')
const charactersApi = new ApiService()


/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => next(err))
});


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => next(err))
});



router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})


router.post('/create', (req, res, next) => {

    const { name, occupation, weapon } = req.body

    charactersApi
        .saveCharacter({ name, occupation, weapon })
        .then(() => res.redirect("/characters"))
        .catch(err => next(err))

})



router.get("/characters/:id/edit", (req, res, next) => {

    const { character_id } = req.params

    charactersApi
        .getOneCharacter(character_id)
        .then(responseFromAPI => res.render("characters/edit-character", { character: responseFromAPI.data }))
        .catch(err => next(err))
})



router.post("/characters/:id/edit", (req, res, next) => {

    const { id: character_id } = req.params
    const { name, occupation, weapon } = req.body


    charactersApi
        .editCharacter(character_id, { name, occupation, weapon })
        .then(() => res.redirect("/characters"))
        .catch(err => next(err))
})


// Delete character
router.post('/characters/:id/delete', (req, res) => {
    const { id: character_id } = req.params

    charactersApi
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
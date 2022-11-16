const router = require("express").Router();
const axios = require("axios");

const charactersApi = require('./../services/characters-api.service')
const Api = new charactersApi()

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

router.get('/create', (req, res, next) => {
    res.render('characters/create-character')

})

router.post('/create', (req, res, next) => {
    const { name, occupation, weapon } = req.body
    Api
        .createCharacter({ name, occupation, weapon })
        .then(() => res.redirect('/character/characters'))
        .catch(err => console.log(err))
})

module.exports = router;


router.get("/:id/edit", (req, res, next) => {

    const { id: character_id } = req.params

    Api
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => console.log(err))
})

router.post("/:id/edit", (req, res, next) => {

    const { id: character_id } = req.params
    const { name, occupation, weapon } = req.body

    Api
        .editCharacter(character_id, { name, occupation, weapon })
        .then(() => res.redirect('/character/characters'))
        .catch(err => console.log(err))
})

router.post("/:id/delete", (req, res, next) => {

    const { id: character_id } = req.params


    Api
        .deleteCharacter(character_id)
        .then(() => res.redirect('/character/characters'))
        .catch(err => console.log(err))
})

// https://ih-crud-api.herokuapp.com/characters
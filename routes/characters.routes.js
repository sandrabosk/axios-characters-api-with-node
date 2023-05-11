const router = require("express").Router();
const axios = require("axios");
const charactersApiHandler = require('../services/characters-api.service');
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
// create
router.get("/crear", (req, res, next) => {
    res.render('characters/create')
})

router.post("/crear", (req, res, next) => {

    const { name, occupation, weapon, debt } = req.body

    charactersApiHandler
        .saveCharacter({ name, occupation, weapon, debt })
        .then((response) => res.redirect(`/characters/${response.data.id}`))
        .catch(err => next(err))
})
// editar
router.get("/editar/:id", (req, res, next) => {
    const { id } = req.params
    charactersApiHandler
        .getOneCharacter(id)
        .then((response) => res.render('characters/edit', { character: response.data }))
        .catch(err => next(err))
})
router.post("/editar/:id", (req, res, next) => {
    const { name, occupation, weapon } = req.body
    const { id } = req.params
    charactersApiHandler
        .editCharacter(id, { name, occupation, weapon })
        .then((response) => res.redirect(`/characters/${response.data.id}`))
        .catch(err => console.log(err))
})
router.post("/eliminar/:id", (req, res, next) => {
    const { id } = req.params
    charactersApiHandler
        .deleteCharacter(id)
        .then(() => res.redirect(`/characters`))
        .catch(err => console.log(err))
})
module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
const router = require("express").Router();
const axios = require("axios");
const { response } = require("express");


const charactersApi = require('./../services/characters-api.service')
const api = new charactersApi()

/* GET home page */
router.get("/characters", (req, res, next) => {

    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});

//  Create characters
router.get("/characters/create", (req, res, next) => {
    // El orden es importante si lo pones debajo de la ruta "/characters/:id" se piensa que /create es el :id, por tanto entra en la ruta que contiene el :id, por ello hay que poner esta ruta arriba.

    res.render("characters/create-character")
})

router.post("/characters/create", (req, res, next) => {
    const { name, occupation, debt, weapon } = req.body
    api
        .createCharacter({ name, occupation, debt, weapon })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})


router.get("/characters/:id", (req, res, next) => {

    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))

    // Edit 
    router.get("/characters/:id/edit", (req, res, next) => {

        const { id: character_id } = req.params

        api
            .getOneCharacter(character_id)
            .then(response => res.render('characters/edit-character', { character: response.data }))
            .catch(err => console.log(err))
    })



    router.post("/characters/:id/edit", (req, res, next) => {

        const { id: character_id } = req.params
        const { name, occupation, debt, weapon } = req.body

        api
            .editCharacter(character_id, { name, occupation, debt, weapon })
            .then(() => res.redirect('/characters'))
            .catch(err => console.log(err))
    })

    router.post("/characters/:id/delete", (req, res, next) => {
        const { id: character_id } = req.params
        api
            .deleteCharacter(character_id)
            .then(() => res.redirect('/characters'))
            .catch(err => console.log(err))
    })


});















module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
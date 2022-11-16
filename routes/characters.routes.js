const router = require("express").Router();
const axios = require("axios");
const charactersApi = require('../services/characters-api.services')
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


router.get("/characters/create", (req, res, next) => {
    res.render("characters/create-character")

}
)

router.post("/characters/create", (req, res, next) => {

    const { name, occupation, weapon } = req.body

    api
        .createCharacter({ name, occupation, weapon })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))

})

router.get("/characters/:characters_id/edit", (req, res, next) => {
    const { characters_id } = req.params

    api
        .getOneCharacter(characters_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => console.log(err))


})

router.post("/characters/:characters_id/edit", (req, res, next) => {
    const { characters_id } = req.params
    const { name, occupation, weapon } = req.body

    api
        .editCharacter(characters_id, { name, occupation, weapon })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))



})

router.post("/characters/:characters_id/delete", (req, res, next) => {
    const { characters_id } = req.params


    api
        .deleteCharacter(characters_id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))



})






















router.get("/characters/:id", (req, res, next) => {

    const { id } = req.params


    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});


router.get("/characters/create", (req, res, next) => {
    res.send("hola")

    // const { name, occupation, weapon, debt } = req.body

    // api
    //     .createCharacter({ name, occupation, weapon, debt })
    //     .then(() => res.redirect('characters/list-character'))
    //     .catch(err => console.log(err))

}
)




module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
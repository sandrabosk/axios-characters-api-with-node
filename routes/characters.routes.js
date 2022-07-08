const router = require("express").Router();
const axios = require("axios");
const ApiService = require('../services/api.service')
const apiService = new ApiService();


router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get("/characters/create", (req, res, next) => {
    axios
        .get(`https://ih-crud-api.herokuapp.com/characters`)
        .then(()=>{
            res.render("characters/create-character");
        })
});
router.post("/characters/create", (req, res)=>{
  apiService
    .createCharacter(req.body)
    .then(() => res.redirect("/characters"))
    .catch(err => console.error(err))
})
router.get("/characters/:id", (req, res, next) => {
    axios
        .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
    .catch(err => console.error(err))
});

router.get("/characters/:id/edit", (req, res) => {
    apiService
        .getOneCharacter(req.params.id)
        .then(responseFromAPI => {
        res.render("characters/edit-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});
router.post("/characters/:id/edit", (req, res) => {
    apiService
        .editCharacter(req.params.id, req.body)
        .then(() => {
            res.redirect("/characters");
        })
    .catch(err => console.error(err))
});

router.get("/characters/:id/delete", (req, res) =>{
    apiService
    .deleteCharacter(req.params.id)
    .then(responseFromAPI => {
        res.redirect(`/characters`)
    })
})
router.post("/characters/:id/delete", (req, res) =>{
    apiService
        .deleteCharacter(req.params.id)
        .then(responseFromAPI => res.redirect(`/characters`))
})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
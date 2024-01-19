const router = require("express").Router();
const axios = require("axios");
const myApiService = require ("../services/api.service")

/* GET home page */
router.get("/characters", (req, res, next) => {
    myApiService
    .getAllCharacters()
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get("/characters/create", (req, res, next)=>{
    res.render('characters/create-character')
})

router.post("/characters/create", (req, res, next)=>{
    const { name, occupation, weapon } = req.body
    myApiService
    .createCharacter({name, occupation, weapon})
    .then(()=> {
        res.redirect('/characters')
    })
    .catch(err => console.error(err))
})

router.get("/characters/:id", (req, res, next) => {
    const { id } = req.params
    myApiService
    .getOneCharacter(id)
    .then(responseFromAPI => {
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get("/characters/:id/edit", (req, res, next)=>{
    const { id } = req.params
    myApiService
    .getOneCharacter(id)
    .then(responseFromAPI => {
        res.render("characters/edit-character", { character: responseFromAPI.data })
    })
    .catch(err => console.error(err))
})

router.post("/characters/:id/edit", (req, res, next) =>{
    const { id } = req.params
    const { name, occupation, weapon } = req.body  
    myApiService
    .editCharacter(id, {name, occupation, weapon})
    .then(()=>{
        res.redirect("/characters")
    })
    .catch(err => console.error(err))
})

router.post("/characters/:id/delete", (req, res, next)=>{
    const { id } = req.params
    myApiService
    .deleteCharacter(id)
    .then(()=>{
        res.redirect('/characters')
    })
    .catch(err => console.error(err))
})

module.exports = router;
// https://ih-crud-api.herokuapp.com/characters
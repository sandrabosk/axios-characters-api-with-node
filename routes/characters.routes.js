const router = require("express").Router();
const axios = require("axios");

router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get("/characters/create", (req, res, next) => {
    res.render("characters/create-character");
});

router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        res.render("characters/details-character", { character: responseFromAPI.data});
    })
    .catch(err => console.error(err))
});

router.get("/characters/:id/edit", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        if(responseFromAPI.data.debt === 'true'){
            responseFromAPI.data.debtTrue = 'checked'
            responseFromAPI.data.debtFalse = ''
        }else{
            responseFromAPI.data.debtTrue = ''
            responseFromAPI.data.debtFalse = 'checked'
        }
        res.render("characters/edit-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get("/characters/:id/delete", (req, res, next) => {
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        console.log("details: ", responseFromAPI.data)
        res.redirect(`/characters`);
    })
    .catch(err => console.error(err))
});

router.post("/characters/:id/update", (req, res, next) => {
    const characterInfo = req.body;
    console.log(characterInfo);
    axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,characterInfo)
    .then(responseFromAPI => {
        res.redirect(`/characters/${req.params.id}`);
    })
    .catch(err => console.error(err))
});

router.post("/characters/create", (req, res, next) => {
    const details = req.body;
    axios.post(`https://ih-crud-api.herokuapp.com/characters`,details)
    .then(responseFromAPI => {
        res.redirect("/characters");
    })
    .catch(err => console.error(err))
});

module.exports = router;
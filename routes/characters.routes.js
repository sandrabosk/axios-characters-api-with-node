const router = require("express").Router();
const axios = require("axios");

const charactersApi = require('./../services/characters-api.service')
const api = new charactersApi()

//----------- GET home page------------
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data })
        })
        .catch(next)
});

router.get("/character/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data })
        })
        .catch(next)
})

router.get('/character/delete/:id', (req, res, next) => {
    const { id } = req.params
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${id}`)
        .then(() => {
            res.redirect("/characters")
        })
        .catch(next)
})

router.get('/character/edit/:id', (req, res, next) => {
    const { id } = req.params
    const debtArray = ["true", "false"]
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${id}`)
        .then((responseFromAPI) => {
            debtArray.map((debt, i, debts) => { if (String(debt) === String(responseFromAPI.data.debt)) { debts.splice(i, 1) } })
            res.render("characters/edit-character", { character: responseFromAPI.data, debtArray })
        })
        .catch(next)
})


//------------- POST -------------------
router.post("/character/create", (req, res, next) => {
    const { name, occupation, weapon, debt } = req.body

    axios.post(`https://ih-crud-api.herokuapp.com/characters`, { name, occupation, weapon, debt })
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data })
        })
        .catch(next)
})

router.post("/character/edit/:id", (req, res, next) => {
    const { id } = req.params
    const { name, occupation, weapon, debt } = req.body
    axios.put(`https://ih-crud-api.herokuapp.com/characters/${id}`, { name, occupation, weapon, debt })
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data })
        })
        .catch(next)
})


module.exports = router


// https://ih-crud-api.herokuapp.com/characters
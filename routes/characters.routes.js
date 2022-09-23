const router = require("express").Router();
const axios = require("axios");

const User = require('../models/User.model');




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
    res.render("characters/create-character");
});




router.post("/characters/create", (req, res, next) => {

    const characterName = req.body.name
    const characterOccupation = req.body.occupation
    const characterDebt = req.body.debt
    const characterweapon = req.body.weapon


    axios.post("https://ih-crud-api.herokuapp.com/characters", {
        name: characterName,
        occupation: characterOccupation,
        debt: characterDebt,
        weapon: characterweapon
    })
    .then(axiosResponse => {
        User.create(
            {
                name: characterName,
                occupation: characterOccupation,
                debt: characterDebt,
                weapon: characterweapon,
                apiId: axiosResponse.data.id
            }
        )
        res.redirect("/characters");
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

router.get("/characters-list", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


router.get("/characters/:id/edit", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/edit-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});



router.post("/characters/:id/update", (req, res, next) => {

    const characterName = req.body.name
    const characterOccupation = req.body.occupation
    const characterDebt = req.body.debt
    const characterweapon = req.body.weapon

    
    axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, {
        name: characterName,
        occupation: characterOccupation,
        debt: characterDebt,
        weapon: characterweapon
    })
    .then(() => {
        User.findOneAndUpdate({ apiId: +req.params.id })
            .then(updatedUser => {
                console.log(updatedUser)
                res.redirect("/characters");
            })
            .catch(err => res.send(err))
        
    })
    .catch(err => console.error(err))
});










router.get("/characters/:id/delete", (req, res, next) => {

    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)

    .then(() => {
        res.redirect("/characters");
    })
    .catch(err => console.error(err))
});




/*




*/

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
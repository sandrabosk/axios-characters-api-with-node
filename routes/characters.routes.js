const router = require("express").Router();
const axios = require("axios");

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

router.post("/characters/create", (req, res, next) => {
    axios.post(`https://ih-crud-api.herokuapp.com/characters`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI)
        res.redirect("/characters/create-character", { character: responseFromAPI.data }); 
    })
    .catch(err => console.error(err))
})

router.get("/characters/:id/edit", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        res.render("characters/edit-characters.hbs", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
})








module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
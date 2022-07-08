const router = require("express").Router();
const axios = require("axios");
const Character = require("../models/Character.model");

/* GET home page */
// List all characters
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

// Character Details Page

router.get('/characters/create', (req, res) =>{
    res.render('characters/create-character');
});

router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.post('/characters/create', (req, res, next) =>{

    const {name, occupation, weapon, debt} = req.body;

    axios.post('https://ih-crud-api.herokuapp.com/characters', {name, occupation, weapon, debt})
    .then(responseFromAPI =>{
        Character.create({name, occupation, weapon, debt})
        res.redirect('/characters')
    })
    .catch(err => console.error(err))

});

// Update a character
// Create GET route /characters/:id/edit in the characters.routes.js file and render the edit-character.hbs page on it.
// Make sure the form is pre-loaded with the details of a specific character you want to update. The form should have the method POST and action set to /characters/:id/update route.
// After that, create a POST route /characters/:id/update in the characters.routes.js file.
// Inside, use AXIOS to PUT/PATCH an updated character's object using the https://ih-crud-api.herokuapp.com/characters/:id endpoint.
// Redirect to /characters/:id to see the updated character details and the changes you made.


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
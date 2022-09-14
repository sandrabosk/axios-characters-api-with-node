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
        console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

// router.get("/characters/create", (req,res,next) => {
//     axios.get("https://ih-crud-api.herokuapp.com")
//     .then(data => {
//         console.log('We got the data:', data)
//         res.render("characters/create-character.hbs")
//     })
//     .catch(err => {
//         console.log('We screwed everything up', err)
//         res.send('Everything went wrong')
//     })
// })

router.post('/characters/create', (req,res,next) => {
    axios.post("https://ih-crud-api.herokuapp.com/characters", {
        name: req.body.name,
        occupation: req.body.occupation,
        weapon: req.body.weapon,
        debt: req.body.debt === true
    })
    .then(data => {
        console.log("Here's the data for axios post:", data)
        res.redirect('/characters')
    })
    .catch(err => console.log("You're a failiure", err))
})

router.get('/characters/:id/update', (req,res,next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        console.log("details: ", responseFromAPI.data)
        res.render("characters/edit-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.post('/characters/:id/update', (req,res,next) => {
    axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, {
        name: req.body.name,
        occupation: req.body.occupation,
        weapon: req.body.weapon,
        debt: req.body.debt === true
    })
    .then(data => {
        console.log('Data for editing character:', data)
        res.redirect(`/characters/${req.params.id}`)
    })
    .catch(err => console.log('Error editing character:', err))
})

router.post('/characters/:id/delete', (req,res,next) => {
    console.log('hi')
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, {
        name: req.body.name,
        occupation: req.body.occupation,
        weapon: req.body.weapon,
        debt: req.body.debt === true
    })
    .then(data => {
        console.log('Data for deleting:', data)
        res.redirect('/characters')
    })
    .catch(err => console.log('Error deleting:', err))
})
module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
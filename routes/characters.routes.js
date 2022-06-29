const router = require("express").Router();
const axios = require("axios");

router.get("/characters/create", (req, res, next) => {
    res.render("characters/create-character")
});

router.post("/characters/create", (req, res, next) => {

    const character = req.body
    req.body.debt ? req.body.debt = true : req.body.debt = false


    axios.post("https://ih-crud-api.herokuapp.com/characters", character)
        .then(() => {
            res.redirect("/characters")

        })
        .catch(err => console.log("ERROR: ", err))

});

router.post("/characters/delete/:id", (req, res, next) => {
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {

            res.redirect('/characters')

        })
});



/*Update*/

router.post("/characters/update/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
        .then(responseFromAPI => {

            res.render('characters/edit-character', responseFromAPI.data)

        })
});

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



module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
const router = require("express").Router();
// const axios = require("axios");
const AxiosIH = require("../connect/axios.connect");
const axiosCharacter = new AxiosIH();

/* GET home page */
//TODO refactor this to use the class axios
// router.get("/characters", (req, res, next) => {
//     axios.get("https://ih-crud-api.herokuapp.com/characters")
//         .then(responseFromAPI => {
//             // console.log(responseFromAPI)
//             res.render("characters/list-characters", { characters: responseFromAPI.data });
//         })
//         .catch(err => console.error(err))
// });
// List all characters
router.get("/", (req, res, next) => {
    axiosCharacter.getCharacters()
        .then(characters => {
            res.render("characters/list-characters", { characters });
        })
        .catch(err => next(err))
});

// router.get("/characters/:id", (req, res, next) => {
//     axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
//         .then(responseFromAPI => {
//             // console.log("details: ", responseFromAPI.data)
//             res.render("characters/details-character", { character: responseFromAPI.data });
//         })
//         .catch(err => console.error(err))
// });
// Create a new character
router.get("/create", (req, res) => {
    res.render("characters/create-character");
});

router.post("/create", (req, res, next) => {
    // console.log('====================================');
    // console.log("req.body: ", req.body);
    // console.log('====================================');
    axiosCharacter.createCharacter(req.body)
        .then(() => {
            res.redirect("/characters");
        })
        .catch(err => next(err))
});

// Get details of a specific character
// NOTE: PUT THE FRICKING PARAMS BELOW EVERYTHING ELSE
// OTHERWISE IT WILL CONFLICT WITH THE ABOVE ROUTE
router.get("/:id", (req, res, next) => {
    axiosCharacter.getCharacter(req.params.id)
        .then(character => {
            res.render("characters/details-character", { character });
        })
        .catch(err => next(err))
});

// Update a specific character
router.get("/edit/:id", (req, res, next) => {
    // DOM doesnt work in server side
    // const isDebt = document.querySelector("debt").value;

    axiosCharacter.getCharacter(req.params.id)
        .then(character => {
            // character.debt = req.body.debt === on ? true : false;
            res.render("characters/edit-character", character);
        })
        .catch(err => next(err))
});

router.post("/edit/:id", (req, res, next) => {
    if (typeof req.body.debt === "undefined") {
        req.body.debt = "false";
    }
    // req.body.debt = req.body.debt === on ? true : false;
    axiosCharacter.updateCharacter(req.params.id, req.body)
        .then(() => {
            res.redirect("/characters");
        })
        .catch(err => next(err))
});

// Delete a specific character


router.post("/delete/:id", (req, res, next) => {
    axiosCharacter.deleteCharacter(req.params.id)
        .then(() => {
            res.redirect("/characters");
        })
        .catch(err => next(err))
});


module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
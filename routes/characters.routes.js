const router = require("express").Router();
const AxiosIH = require('../services/axios.service');
const axiosCharacter = new AxiosIH();

/* GET home page */

router.get('/characters', (req, res, next) => {
    axiosCharacter
        .getCharacters()
        .then((characters) => {
            res.render("characters/list-characters", { characters })
        })
        .catch((err) => next(err));
});


router.get('/characters/create', (req, res, next) => {
    res.render("characters/create-character")
})


router.get('/characters/delete/:id', (req, res, next) => {
    axiosCharacter
        .deleteCharacter(req.params.id)
        .then(() => {
            res.redirect('/characters');
        })
        .catch((err) => next(err));
});

router.get('/characters/:id/edit', (req, res, next) => {
    console.log(req.params)
    axiosCharacter
        .getCharacter(req.params.id)
        .then((character) => {
            res.render('characters/edit-character', character);
        })
        .catch((err) => next(err));
});

router.get('/characters/:id', (req, res, next) => {
    axiosCharacter
        .getCharacter(req.params.id)
        .then((character) => {
            res.render("characters/details-character",  character )
        })
        .catch((err) => next(err));
});

router.post('/characters', (req, res, next) => {
    const { name, occupation, debt, weapon } = req.body;
    axiosCharacter
        .createCharacter({ name, occupation, debt, weapon })
        .then(() => {
        res.redirect("/characters")
        })
        .catch((err) => next(err));
});


router.post('/characters/:id', (req, res, next) => {
    const { name, occupation, debt, weapon } = req.body;
    axiosCharacter
        .editCharacter(req.params.id, { name, occupation, debt, weapon })
        .then((character) => {
        })
        .catch((err) => next(err));
});







module.exports = router;


// https://ih-crud-api.herokuapp.com/characters













// router.get("/characters", (req, res, next) => {
//     axios.get("https://ih-crud-api.herokuapp.com/characters")
//     .then(responseFromAPI => {
//         // console.log(responseFromAPI)
//         res.render("characters/list-characters", { characters: responseFromAPI.data });
//     })
//     .catch(err => console.error(err))
// });


// router.get("/characters/:id", (req, res, next) => {
//     axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
//     .then(responseFromAPI => {
//         // console.log("details: ", responseFromAPI.data)
//         res.render("characters/details-character", { character: responseFromAPI.data });
//     })
//     .catch(err => console.error(err))
// });
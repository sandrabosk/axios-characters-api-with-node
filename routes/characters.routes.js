const router = require("express").Router();
const axios = require("axios")

const CharacterApi = require('../services/characters.services')

const characterApi = new CharacterApi()

/* GET home page */
router.get('/characters/list', (req, res, next) => {

    characterApi
        .getAll()
        .then(all => res.render('characters/list-characters', { characters: all.data }))
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

router.get('/crear', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/crear', (req, res, next) => {
    const { name, occupation, weapon } = req.body

    characterApi
        .saveCharacter({ name, occupation, weapon })
        .then(() => res.redirect('/list'))
        .catch(err => next(err))
})


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
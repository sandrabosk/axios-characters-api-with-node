const router = require("express").Router();
//const axios = require("axios");
const characterService = require('../services/characters.services')

// /* GET home page */
// router.get("/characters", (req, res, next) => {
//     axios.get("https://ih-crud-api.herokuapp.com/characters")
//         .then(responseFromAPI => {
//             // console.log(responseFromAPI)
//             res.render("characters/list-characters", { characters: responseFromAPI.data });
//         })
//         .catch(err => console.error(err))
// });


// router.get("/characters/:id", (req, res, next) => {
//     axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
//         .then(responseFromAPI => {
//             // console.log("details: ", responseFromAPI.data)
//             res.render("characters/details-character", { character: responseFromAPI.data });
//         })
//         .catch(err => console.error(err))
// });



router.get("/list", (req, res, next) => {

    characterService
        .getAllCharacters()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => next(err))

})


router.get('/details/:character_id', (req, res, next) => {
    console.log("ESTOY AQUI ")
    const { character_id } = req.params
    characterService
        .getOneCharacter(character_id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => next(err))

})

router.get('/create', (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/create', (req, res, next) => {
    const { name, occupation, weapon } = req.body
    const data_charact = { name, occupation, weapon }
    characterService
        .createCharacter(data_charact)
        .then(() => res.redirect('/characters/list'))
        .catch(err => next(err))

})

router.get('/edit/:character_id', (req, res, next) => {

    const { character_id } = req.params
    characterService
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))

})

router.post('/edit/:character_id', (req, res, next) => {
    const { character_id } = req.params
    const { name, occupation, weapon } = req.body
    const data_charact = { name, occupation, weapon }
    console.log('LLEGO AQUI')
    characterService
        .modifyCharacter(character_id, data_charact)
        .then(() => res.redirect(`/characters/list`))
        .catch(err => next(err))

})

router.get('/delete/:character_id', (req, res, next) => {
    const { character_id } = req.params
    characterService
        .deleteCharacter(character_id)
        .then(() => res.redirect(`/characters/list`))
        .catch(err => next(err))

})


module.exports = router;



// https://ih-crud-api.herokuapp.com/characters
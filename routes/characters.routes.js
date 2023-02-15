const router = require("express").Router();
const axios = require("axios");

const ApiService = require('../services/characters.service')

const charactersApi = new ApiService()

/* GET home page */
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
    // res.send('Hola'))

    charactersApi
        .getAllCharacters()
        .then(response => res.render("characters/list-characters", { characters: response.data }))
        // .then(response => console.log(response))
        .catch(err => console.log(err))
})
router.get("/details/:id", (req, res, next) => {
    //     axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    //         .then(responseFromAPI => {
    //             // console.log("details: ", responseFromAPI.data)
    //             res.render("characters/details-character", { character: responseFromAPI.data });
    //         })
    //         .catch(err => console.error(err))
    // res.send('hola')
    const { id } = req.params

    charactersApi
        .getOneCharacter(id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        // .then(respond => console.log(respond))
        .catch(err => next(err))
});

router.get("/create", (req, res, next) => {

    res.render('characters/create-character')

})

// router.get("/create", (req, res, next) => {
//     res.send('hola')
// })

router.post("/create", (req, res, next) => {

    const { name, weapon, occupation } = req.body

    charactersApi
        .saveCharacter({ name, weapon, occupation })
        .then(() => res.redirect('/characters/list'))
        .catch(err => next(err))
})

router.get("/edit/:id", (req, res, next) => {

    const { id } = req.params

    charactersApi
        .getOneCharacter(id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => next(err))
})

router.post("/edit/:id", (req, res, next) => {

    const { id } = req.params
    const { name, weapon, occupation } = req.body

    charactersApi
        .editCharacter(id, { name, weapon, occupation })
        .then(() => res.redirect('/characters/list'))
        .catch(err => next(err))
})
router.post("/delete/:id", (req, res, next) => {

    const { id } = req.params

    charactersApi
        .deleteCharacter(id)
        .then(() => res.redirect('/characters/list'))
        .catch(err => next(err))
})

module.exports = router;







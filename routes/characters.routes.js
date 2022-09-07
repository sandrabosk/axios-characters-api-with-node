const router = require("express").Router();
const Axios = require('../service/axios.service')
const axiosClass = new Axios

/* GET home page */
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

router.get('/characters', (req, res, next) => {
    axiosClass.listCharacters()
        .then((characters) => res.render('characters/list-characters', { characters }))
        .catch((err) => next(err))
})

router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-form')
})

router.get('/characters/:id', (req, res, next) => {
    axiosClass.characterDetails(req.params.id)
        .then((character) => {
            console.log(character)
            res.render('characters/details-character', { character })
        })
        .catch((err) => next(err))
})

router.get('/characters/:id/delete', (req, res, next) => {
    axiosClass.deleteCharacter(req.params.id)
        .then(() => res.redirect('/characters'))
        .catch((err) => next(err))
})

router.get('/characters/:id/edit', (req, res, next) => {
    axiosClass.characterDetails(req.params.id)
        .then((details) => {
            res.render('characters/edit-form', details)
        })
        .catch((err) => next(err))
})

router.post('/characters/create', (req, res, next) => {
    const { name, occupation, debtInput, weapon } = req.body
    console.log(debtInput)
    const debt = debtInput ? true : false
    axiosClass.createCharacter({ name, occupation, debt, weapon })
        .then(() => res.redirect('/characters'))
        .catch((err) => next(err))
})

router.post('/characters/:id/edit', (req, res, next) => {
    const { name, occupation, debtInput, weapon } = req.body
    console.log(debtInput)
    const debt = debtInput ? true : false
    axiosClass.updateCharacter(req.params.id, { name, occupation, debt, weapon })
        .then(() => res.redirect(`/characters/${req.params.id}`))
        .catch((err) => next(err))

})


module.exports = router;



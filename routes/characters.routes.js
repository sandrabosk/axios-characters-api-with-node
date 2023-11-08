const router = require("express").Router();
const { response } = require("../app");
const charactersService = require('../services/characters.service')


router.get("/characters", (req, res, next) => {
    charactersService
        .getAll()
        .then(response => res.render('characters/list-characters', { character: response.data }))
        .catch(err => console.error(err))
});


router.get("/characters/:id", (req, res, next) => {
    const { id: char_id } = req.params
    charactersService
        .getOne(char_id)
        .then(response => {
            // console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: response.data });
        })
        .catch(err => console.error(err))
});

router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post('/create', (req, res, next) => {

    const { name, occupation, weapon } = req.body

    const char_data = { name, occupation, weapon }

    charactersService
        .saveOne(char_data)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))
})


router.get("/edit/:id", (req, res, next) => {
    const { id: char_id } = req.params
    charactersService
        .getOne(char_id)
        .then(response => res.render('characters/edit-character', { char: response.data }))
        .catch(err => next(err))
})
router.post("/edit/:id", (req, res, next) => {
    const { id: char_id } = req.params
    const { name, occupation, weapon } = req.body
    const char_data = { name, occupation, weapon }
    charactersService
        .editOne(char_id, char_data)
        .then(() => res.redirect(`/characters/${char_id}`))
        .catch(err => next(err))

})

router.post("/delete/:id", (req, res, next) => {
    const { id: char_id } = req.params
    charactersService
        .deleteOne(char_id)
        .then(() => res.redirect('/characters'))
        .catch(err => next(err))

})
module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
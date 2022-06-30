const router = require("express").Router();
const charactersService = require("./../services/characters.service");

/* GET home page */
router.get("/characters", (req, res, next) => {
    charactersService
        .getAllChars()
        .then(response => res.render('characters/list-characters', { characters: response.data }))
        .catch(err => console.log(err))
});

router.get("/characters/create", (req, res, next) => {
    res.render('characters/create-character')
})

router.post("/characters/create", (req, res, next) => {
    const { name, occupation, weapon } = req.body
    const charInfo = { name, occupation, weapon}

    charactersService
        .createChar(charInfo)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})

router.get("/characters/:id/edit", (req, res) => {
    const { id } = req.params
    charactersService
        .getOneChar(id)
        .then(response => {
            const char = response.data
            res.render('characters/edit-character', char)
        })
        .catch(err => console.log(err))
})

router.post("/characters/:id/edit", (req, res) => {
    const newCharData = req.body
    const { id } = req.params
    console.log("DEBUG: ", newCharData, id)
    charactersService
        .editChar(id, newCharData)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})

router.get("/characters/:id/delete", (req, res) => {
    const { id } = req.params
    charactersService
        .deleteChar(id)
        .then(response => res.redirect('/characters'))
        .catch(err => console.log(err))
})

router.get("/characters/:id", (req, res, next) => {
    charactersService
        .getOneChar(req.params.id)
        .then(response => res.render('characters/details-character', { character: response.data }))
        .catch(err => console.log(err))
});



module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
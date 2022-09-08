const router = require("express").Router();
const Axios = require("../services/axios.service");

const axiosCharacter = new Axios();

router.get("/characters", (req, res, next) => {
    axiosCharacter
        .getCharacters()
        .then(characters => {
            console.log(characters)
            res.render('characters/list-characters', { characters })

        })
        .catch((err) => next(err))
});

router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-form')
})


router.get("/characters/:id", (req, res, next) => {
    axiosCharacter
        .getCharacter(req.params.id)
        .then(character => {
            console.log(character)
            res.render('characters/details-character', character)
        })
        .catch((err) => next(err))
});

router.get('/characters/:id/edit', (req, res, next) => {
    axiosCharacter
        .getCharacter(req.params.id)
        .then(character => {
            console.log(character)
            res.render('characters/edit-form', character)
        })
        .catch((err) => next(err))
})

router.get('/characters/:id/delete', (req, res, next) => {
    axiosCharacter.deleteCharacter(req.params.id)
        .then(character => {
            console.log("borrado")
            res.redirect('/')
        })
})


router.post('/characters/create', (req, res, next) => {
    const { name, occupation, weapon, debt } = req.body
    axiosCharacter.createCharacter({ name, occupation, weapon, debt })
        .then(character => {
            console.log(character)
            res.redirect('/characters/list-characters')
        })
        .catch((err) => next(err))
})

router.post('/characters/:id/edit', (req, res, next) => {
    const { name, occupation, weapon, debt } = req.body
    axiosCharacter.editCharacter(req.params.id, { name, occupation, weapon, debt })
        .then(character => {
            console.log(character)
            res.redirect('/')
        })
        .catch((err) => next(err))

})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
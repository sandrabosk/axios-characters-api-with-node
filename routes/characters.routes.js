const router = require("express").Router();
const axiosIH = require("../services/axios.services");
const axiosCharacter = new axiosIH();


/**
 * GET
 */

router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-character')
})



router.get('/characters', (req, res, next) => {
    axiosCharacter
        .getCharacters()
        .then((characters) => {
            res.render('characters/list-characters', { characters })
        })
        .catch((error) => next(error));
});

router.get('/characters/:id', (req, res, next) => {
    axiosCharacter
        .getCharacter(req.params.id)
        .then((character) => {
            res.render('characters/details-character', { character })
        })
        .catch((err) => next(err));
})

router.get('/characters/update/:id', (req, res, next) => {
    axiosCharacter
        .getCharacter(req.params.id)
        .then((character) => {
            res.render('characters/update-character', { character })
        })
        .catch((err) => next(err));
})

router.get('/characters/delete/:id', (req, res, next) => {
    axiosCharacter
        .deleteCharacter(req.params.id)
        .then((response) => {
            res.redirect('/characters')
        })
        .catch((err) => next(err));
});


/**
 * POST
 */

router.post('/characters/create', (req, res, next) => {
    const { name, occupation, debt, weapon } = req.body;
    axiosCharacter
        .createCharacter({ name, occupation, debt, weapon })
        .then((character) => {
            res.redirect('/characters')
        })
        .catch((error) => next(error));
})

router.post('/characters/update/:id', (req, res, next) => {
    const { name, occupation, debt, weapon } = req.body;
    axiosCharacter
        .editCharacter(req.params.id, { name, occupation, debt, weapon })
        .then((character) => {
            res.redirect('/characters')
        })
        .catch((err) => next(err));
});

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
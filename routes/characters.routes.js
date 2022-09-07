const router = require("express").Router();
const charactersService = require("../services/axios.service");
const Characters = new charactersService()
/* GET home page */

router.get('/characters', (req, res, next) => {
    Characters
        .getCharacters()
        .then((data) => {
            const characters = data
            res.render('characters/characters', { characters })

        })
        .catch((err) => next(err));
});


router.get('/characters/create', (_req, res) => {

    res.render('characters/create-character')

});

router.get('/characters/:id', (req, res, next) => {
    Characters
        .getCharacter(req.params.id)
        .then((character) => {
            res.render('characters/details', { character })
        })
        .catch((err) => next(err));
});







router.post('/characters/update/:id', (req, res, next) => {
    const { name, occupation, debt, weapon } = req.body;
    Characters
        .editCharacter(req.params.id, { name, occupation, debt, weapon })

        .then((character) => {
            res.redirect('/characters')
        })
        .catch((err) => next(err));
});




router.get('/characters/delete/:id', (req, res, next) => {
    Characters
        .deleteCharacter(req.params.id)
        .then(() => {
            res.redirect('/characters')

        })
        .catch((err) => next(err));
});

router.post('/characters/create', (req, res, next) => {
    const { name, occupation, debt, weapon } = req.body;
    Characters
        .createCharacter({ name, weapon, occupation, debt })
        .then(() => {
            res.redirect('/characters')
        })
        .catch((err) => next(err));
});


router.get('/characters/update/:id', (req, res, next) => {
    Characters
        .getCharacter(req.params.id)
        .then((character) => {
            res.render('characters/update', character)
        })
        .catch((err) => next(err));
});







module.exports = router;



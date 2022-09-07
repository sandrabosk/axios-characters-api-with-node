const router = require("express").Router();
const characterService = require('../services/axios.service');
const Characters = new characterService();

/* GET home page */
router.get('/characters', (req, res, next) => {
    Characters
        .getCharacters()
        .then((data) => {
            console.log(data);
            const characters = data
            res.render('characters/list-characters', { characters });
        })
        .catch((err) => next(err));
});

router.get('/characters/create', (req, res, next) => {  //IMPORTANTE TODO TIENE QUE IR ENCIMA DEL :ID, SINO SE LO COME
    res.render('characters/create-character')
});

router.get('/characters/:id', (req, res, next) => {
    Characters
        .getCharacter(req.params.id)
        .then((data) => {
            console.log(data);
            const character = data
            res.render('characters/details-character', { character });
        })
        .catch((err) => next(err));
});

router.get('/characters/:id/edit', (req, res, next) => {
    Characters
        .getCharacter(req.params.id)
        .then((data) => {
            console.log(data);
            const character = data
            res.render('characters/edit-character', { character });
        })
        .catch((err) => next(err));
});

router.get('/characters/delete/:id', (req, res, next) => {
    Characters
        .deleteCharacter(req.params.id)
        .then((response) => {
            console.log(response);
            res.redirect('/characters');
        })
        .catch((err) => next(err));
});


// router.get('/characters/delete/:id', (req, res, next) => {
//     Characters
//         .deleteCharacter(req.params.id)
//         .then((response) => {
//             console.log(response);
//             res.json(response);
//         })
//         .catch((err) => next(err));
// });

router.post('/characters/create', (req, res, next) => {
    const { name, occupation, debt, weapon } = req.body;
    Characters
        .createCharacter({ name, occupation, debt, weapon })
        .then((data) => {
            console.log(data);
            res.redirect('/characters');
        })
        .catch((err) => next(err));
});

router.post('/characters/:id/edit', (req, res, next) => {
    const { name, occupation, debt, weapon } = req.body;
    Characters
        .editCharacter(req.params.id, { name, occupation, debt, weapon })
        .then((character) => {
            console.log(character);
            res.redirect('/characters');
        })
        .catch((err) => next(err));
});


module.exports = router;


// https://ih-crud-api.herokuapp.com/characters


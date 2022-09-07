const router = require("express").Router();
const AxiosIH = require('../services/axios.services');
const axiosCharacter = new AxiosIH();

/* GET home page */
router.get("/characters", (req, res, next) => {
    axiosCharacter
        .getCharacters()
        .then((characters) => {
            console.log(characters);
            res.render('characters/list-characters', { characters });
        })
        .catch((err) => next(err));

    /*   --- REFACTORIZAR  
        axios.get("https://ih-crud-api.herokuapp.com/characters")
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
         */

});

//create

router.get('/characters/create', (req, res, next) => {
    res.render('characters/create-character');
});

// id character

router.get("/characters/:id", (req, res, next) => {
    axiosCharacter
        .getCharacter(req.params.id)
        .then((character) => {
            console.log(character);
            res.render('characters/details-character', character);
        })
        .catch((err) => next(err));

    /* 
        axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
            .then(responseFromAPI => {
                // console.log("details: ", responseFromAPI.data)
                res.render("characters/details-character", { character: responseFromAPI.data });
            })
            .catch(err => console.error(err))
     */

});


// delete

router.get('/characters/delete/:id', (req, res, next) => {
    axiosCharacter
        .deleteCharacter(req.params.id)
        .then((response) => {
            console.log(response);
            res.redirect('/characters');
        })
        .catch((err) => next(err));
});

// create post


router.post('/characters/create', (req, res, next) => {
    const { name, occupation, debt, weapon } = req.body;
    axiosCharacter
        .createCharacter({ name, occupation, debt, weapon })
        .then((character) => {
            console.log(character);
            res.redirect('/characters');
        })
        .catch((err) => next(err));
});

// edit

router.get('/characters/:id/edit', (req, res, next) => {
    axiosCharacter
        .editCharacter(req.params.id)
        .then((character) => {
            res.render('characters/update-form', character);
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/characters/:id/edit', (req, res, next) => {
    const { name, occupation, debt, weapon } = req.body;
    axiosCharacter
        .editCharacter(req.params.id, { name, occupation, debt, weapon })
        .then((character) => {
            console.log(character);
            res.redirect('/characters');
        })
        .catch((err) => next(err));
});

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
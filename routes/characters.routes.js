const router = require("express").Router();
const axios = require("axios");
const AxiosMethods = require('../services/StarWars.service')
const axiosCharacter = new AxiosMethods();


/* GET home page */
router.get("/characters", (req, res, next) => {

    axiosCharacter
    .getCharacters()
    .then((characters) => {
      res.render('characters/list-characters', {characters});
    })
    .catch((err) => next(err));

});


router.get('/characters/create-character', (req, res, next) => {
    res.render('characters/create-character')    
})

router.get('/characters/:id/edit-character', (req, res, next) => {
  axiosCharacter
    .getCharacter(req.params.id)
    .then((character) => {
      res.render('characters/edit-character', character);
    })
    .catch((err) => next(err));

});


router.get("/characters/:id", (req, res, next) => {
    axiosCharacter
    .getCharacter(req.params.id)
    .then((character) => {
      res.render('characters/details-character', character);
    })
    .catch((err) => next(err));

});


// ------------ POST -----------

router.post('/characters/create-character', (req, res, next) => {
    const { name, occupation, debt, weapon } = req.body;
    axiosCharacter
      .createCharacter({ name, occupation, debt, weapon })
      .then((character) => {
        res.redirect('/characters');
      })
      .catch((err) => next(err));
})

router.post('/characters/:id/update', (req, res, next) => {
  const { name, occupation, debt, weapon } = req.body;
  axiosCharacter
    .editCharacter(req.params.id, { name, occupation, debt, weapon })
    .then((character) => {
      
      res.redirect(`/characters/${character.id}`);
    })
    .catch((err) => next(err));
});

router.get('/characters/:id/delete-character', (req, res, next) => {
  axiosCharacter
    .deleteCharacter(req.params.id)
    .then((response) => {
      console.log(response);
      res.redirect('/characters');
    })
    .catch((err) => next(err));
});



module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
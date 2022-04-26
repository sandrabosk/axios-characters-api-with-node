const router = require('express').Router();
const axios = require('axios');
const Character = require('../models/Character.model');

/* GET home page */
router.get('/characters', (req, res, next) => {
  axios
    .get('https://ih-crud-api.herokuapp.com/characters')
    .then((responseFromAPI) => {
      // console.log(responseFromAPI)
      res.render('characters/list-characters', {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get('/characters/create', (req, res) => {
  res.render('characters/create-character');
});

router.post('/characters/create', (req, res, next) => {
  const { name, occupation, weapon, debt } = req.body;

  axios
    .post('https://ih-crud-api.herokuapp.com/characters', {
      name,
      occupation,
      weapon,
      debt,
    })

    .then((response) => {
      Character.create({ name, occupation, weapon, debt });
      res.redirect('/characters');
    })
    .catch((err) => console.log(err));
});

router.get('/characters/:id', (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      // console.log("details: ", responseFromAPI.data)
      res.render('characters/details-character', {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get('/characters/:id/edit', (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((charInfo) => {
      //   console.log(charInfo);
      res.render('characters/edit-character', { charInfo });
    })
    .catch((err) => console.error(err));
});

router.post('/characters/:id/update', (req, res, next) => {
  const charInfo = req.body;
  //   console.log(charInfo);
  //   console.log(req.params);

  axios
    .put(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,
      charInfo
    )
    .then((responseFromAPI) => {
      console.log(responseFromAPI);
      res.redirect(`/characters/${req.params.id}`);
    })
    .catch((err) => console.error(err));
});

router.post('/characters/:id/delete', (req, res, next) => {
  //   const { id } = req.body;
  //   console.log(charInfo);
  console.log(req.params);

  axios
    .delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      console.log(responseFromAPI);
      res.redirect(`/characters`);
    })
    .catch((err) => console.error(err));
});

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters

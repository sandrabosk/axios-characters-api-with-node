const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});


router.get("/character/create", (req, res, next) => {
    res.render('characters/create-character')
});

router.post("/character/create", (req, res, next) => {
    axios.post('https://ih-crud-api.herokuapp.com/characters', {
        name: req.body.name,
        occupation: req.body.occupation,
        weapon: req.body.weapon,
        debt: req.body.debt == 'true' ? true : false
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
});

router.get("/characters/:id/edit", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((axiosResponse) => {
        res.render('characters/edit-character', axiosResponse.data)
    })
    .catch(err => console.log(err))
  
});

router.post("/characters/:id/update", (req, res, next) => {
  axios.put(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`, {
    name: req.body.name,
    occupation: req.body.occupation,
    weapon: req.body.weapon,
    debt: req.body.debt
  })
  .then(() => {
    res.redirect(`/characters/${req.params.id}`)
  })
  .catch(err => console.log(err))
})

router.get("/characters/:id/delete", (req, res, next) => {
    axios.delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((removedCharacter) => {
        console.log(removedCharacter.data)
        res.redirect('/characters')
    })
    .catch(err => console.log(err))
})




module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
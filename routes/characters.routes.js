const router = require("express").Router();
const axios = require("axios");
const Character = require("../models/Character.model.js");
// const myApiService = new ApiService();

/* GET home page DONE */
router.get("/characters", (req, res, next) => {
  axios
    .get("https://ih-crud-api.herokuapp.com/characters")
    .then((responseFromAPI) => {
      console.log(responseFromAPI);
      res.render("characters/list-characters", {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

/*get create character page */
router.get("/characters/create", (req, res) =>
  res.render("characters/create-character")
);

//GET CHARACTER DETAILS
router.get("/characters/:id", (req, res, next) => {
  const characterId = req.params.id;
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${characterId}`)
    .then((responseFromAPI) => {
      // console.log("details: ", responseFromAPI.data)
      res.render("characters/details-character", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

//post character creation
router.post("/characters/create", (req, res) => {
  const { name, occupation, weapon, debt } = req.body;
  axios
    .post("https://ih-crud-api.herokuapp.com/characters", {
      name,
      occupation,
      weapon,
      debt,
    })
    .then((responseFromAPI) => {
      console.log(responseFromAPI);
      res.redirect("/characters");
    })
    .catch((error) => console.log(error));
});

// render form to edit a character
router.get("/characters/:id/edit", (req, res) => {
  const characterId = req.params.id;

  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${characterId}`)
    .then((responseFromAPI) => {
      console.log(responseFromAPI);
      res.render("characters/edit-character", { responseFromAPI });
    })
    .catch((err) => console.error(err));
});

//post edited character to list

router.post("/characters/:id/update", (req, res) => {
  const characterId = req.params.id;
  const characterInfo = req.body;

  axios
    .put(
      `https://ih-crud-api.herokuapp.com/characters/${characterId}`,
      characterInfo
    )
    .then((responseFromAPI) => {
      res.redirect(`/characters/${characterId}`);
    })
    .catch((error) => console.log(error));
});

//delete characters
//whattttttttttttttttttttttttttttttttttttttttttttttttt?
//doesn't find /characters/id/delete (404)
router.post("/characters/:id/delete", (req, res, next) => {
  const characterId = req.params.id;
  axios
    .delete(`https://ih-crud-api.herokuapp.com/characters/${characterId}`)
    .then((responseFromAPI) => {
      res.redirect("/characters");
    })
    .catch((err) => console.log(err));
});

module.exports = router;


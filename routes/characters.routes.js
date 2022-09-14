const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
  axios
    .get("https://ih-crud-api.herokuapp.com/characters")
    .then((responseFromAPI) => {
      // console.log(responseFromAPI)
      res.render("characters/list-characters", {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/:id", (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      // console.log("details: ", responseFromAPI.data)
      res.render("characters/details-character", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

//GET edit character
router.get("/characters/:id/edit", (req, res) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      // console.log("details: ", responseFromAPI.data)
      res.render("characters/edit-character", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

//GET create character
router.get("/create-character", (req, res) => {
  //   res.render("characters/create-character");
  res.render("characters/create-character");
});
//POST create character
router.post("/characters/create", (req, res) => {
  axios
    .post("https://ih-crud-api.herokuapp.com/characters", req.body)
    .then((character) => {
      res.redirect("/characters");
    })
    .catch((err) => console.log(err));
});

//POST edit character
router.post("/characters/:id/update", (req, res) => {
  axios
    .put(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,
      req.body
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
});

//DELETE route
router.post("/characters/:id/delete", (req, res) => {
  axios
    .delete(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((response) => {
      console.log(response);
      res.redirect("/characters");
    })
    .catch((err) => console.log(err));
});

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters

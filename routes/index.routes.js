//initial setup
const router = require("express").Router();
const axios = require("axios");

//home page
router.get("/", (req, res, next) => {
  res.render("index");
});

//export setup
module.exports = router;

// const router = require("express").Router();

// /* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

// module.exports = router;
const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) =>{
  res.render('index')
})

module.exports = router
const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const characterRouter = require('./characters.routes')
router.use('/', characterRouter)

module.exports = router;

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* const charactersRouter = require("./characters.routes")
app.use("/characters", charactersRouter)
 */


module.exports = router;

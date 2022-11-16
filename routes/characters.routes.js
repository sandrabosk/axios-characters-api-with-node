const router = require("express").Router();
const axios = require("axios");

const charactersApi = require('./../services/characters-api-services')
const api= new charactersApi()

/* GET home page */
router.get("/characters", (req, res, next) => {
    axios.get("https://ih-crud-api.herokuapp.com/characters")
    .then(responseFromAPI => {
        // console.log(responseFromAPI)
        res.render("characters/list-characters", { characters: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get("/characters/create", (req, res, next) =>
{
    res.render('characters/create-character')
})

router.post("/characters/create", (req, res, next) => {

  const { name, occupation, weapon } = req.body

  api
    .createCharacter({ name, occupation, weapon })
    .then(() => res.redirect('/characters'))
    .catch(err => console.log(err))
})

router.get("/characters/:id", (req, res, next) => {
    axios.get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then(responseFromAPI => {
        // console.log("details: ", responseFromAPI.data)
        res.render("characters/details-character", { character: responseFromAPI.data });
    })
    .catch(err => console.error(err))
});

router.get('/characters/:id/edit', (req, res, next) => {

    const{id:character_Id}=req.params
    
api
    .getOneCharacter(character_Id)
    .then(response => res.render('characters/edit-character',{character:response.data}))
    .catch(err => console.error(err))
})

router.post('/characters/:id/edit', (req, res, next) =>{

const {id:character_Id} =req.params   
const { name, weapon, occupation } = req.body
    api
        .editCharacter(character_Id, { name, weapon, occupation })
        .then(res.redirect('/characters'))
  .catch(err => console.log(err))

})

router.post('/characters/:id/delete', (req, res, next) => {

  const {id: character_Id } = req.params

  api
    .deleteCharacter(character_Id)
    .then(() => res.redirect('/characters'))
    .catch(err => console.log(err))

})





module.exports = router;



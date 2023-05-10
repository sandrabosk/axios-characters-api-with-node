const router = require("express").Router();
const charactersApiHandler = require("../services/characters-service")



router.get("/characters", (req, res, next)=> {

    charactersApiHandler
    .getAllCharacters()
    .then(response => res.render("characters/list-characters", { allCharacters: response.data }))
    .catch(err => next(err))   
})

router.get("/characters/create", (req, res, next)=> {
   res.render("characters/create-character")
})

router.post("/characters/create", (req, res, next)=> {

    const { name, occupation, weapon, debt } = req.body

    charactersApiHandler
    .createCharacter({name, occupation, weapon, debt})
    .then(response => res.redirect(`/characters/${response.data.id}`))
    .catch(err => next(err))   

})


router.get("/characters/:id", (req, res, next) => {
    
    const {id} = req.params
    
    charactersApiHandler
    .getCharactersById(id)
    .then(response => res.render('characters/details-character', { character: response.data }))
    .catch(err => next(err))
    
});

router.get("/characters/:id/update", (req, res, next) => {

    const { id }= req.params
    
    charactersApiHandler
    .getCharactersById(id)
    .then(response => res.render("characters/update-character", {character: response.data}))
    .catch(err => next(err))
    
})

router.post("/characters/:id/update", (req, res, next) => {

    const { id }= req.params
    const { name, occupation, weapon, debt } = req.body

    charactersApiHandler
    .updateCharacter(id, { name, occupation, weapon, debt })
    .then(response => res.redirect(`/characters/${response.data.id}`))
    .catch(err => next(err))
    
})


router.post("/characters/:id/delete", (req, res, next) => {

    const {id} = req.params

    charactersApiHandler
    .deleteCharacter(id)
    .then(()=> res.redirect("/characters"))
    .catch(err => next(err))

})


module.exports = router;

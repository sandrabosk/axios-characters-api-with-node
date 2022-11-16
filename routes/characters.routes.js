const router = require("express").Router();
const axios = require("axios");

const charactersApi = require('./../services/characters-api.service')
const api = new charactersApi()


router.get("/", (req, res, next) => {
    
    
    api
        .getAllCharacters()
        .then(({data: characters}) => {
            // res.send(responseFromAPI.data)
        res.render("characters/list-characters", { characters });
        })
        .catch(err => console.error(err))
});


router.get("/create", (req, res, next) => { 
    // console.log('conectado')
    // res.send('conectado')
    res.render('characters/new-character')
})


router.get("/:id", (req, res, next) => {
    
    const {id: character_id} = req.params

    // res.send(character_id)

    api
        .getCharacterById(character_id)
        .then(({data: characterInfo}) => {
            // res.send(characterInfo)
            res.render("characters/details-character", characterInfo);
        })
        .catch(err => console.error(err))
});


router.get("/:id/update", (req, res, next) => { 
    
    const {id:character_id} = req.params
    // res.send('conected','character_id')
    api
        .getCharacterById(character_id)
        .then(({ data: characterInfo }) => {
            res.render('characters/edit-character', characterInfo)
        })
        .catch(err => console.error(err))
})


router.post("/create", (req, res, next) => { 

    const { name, occupation, weapon } = req.body
    // console.log('create')
    // res.send({ name, occupation, weapon })

    api
        .createNewCharacter({ name, occupation, weapon })
        .then(() => {
            // res.send(pop.data)
            res.redirect('/characters')
        })
        .catch(err => console.error(err))
    
})

router.post("/:id/update", (req, res, next) => { 

    const {name, occupation, weapon} = req.body
    const {id:character_id} = req.params
    // console.log('update')
    // res.send(character_id)
    api
        .updateCharacter(character_id, { name, occupation, weapon })
        .then(({ data: characterInfo }) => {
        // res.send(characterInfo)
            res.redirect(`/characters/${character_id}`)
        })
        .catch(err => console.error(err))
})

router.post("/:id/delete", (req, res, next) => {

    const {id: character_id} = req.params
    // res.send(character_id)
    api
        .deleteCharacterById(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.error(err))
})

module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
const router = require("express").Router();

const charService = require('./../services/character.services');
const { route } = require("./characters.routes");


router.get("/", (req, res, next) => {

    charService
        .getAllCharacters()
        .then(responseFromAPI => {
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => next(err))
});




router.get("/create", (req, res, next) => {
    res.render('characters/create-character')
})
router.post("/create", (req, res, next) => {
    const newCharacter = { name, occupation, weapon } = req.body
    console.log(name, occupation, weapon)
    charService
        .createCharacter(newCharacter)
        .then(res.redirect('/characters'))
        .catch(err => next(err))
})

router.get("/:id", (req, res, next) => {
    const { id: charId } = req.params

    charService
        .getCharacterByID(charId)
        .then(responseFromAPI => {
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => next(err))
})
router.get('/edit/:id', (req, res) => {
    const { id: charId } = req.params

    charService
        .getCharacterByID(charId)
        .then(character => res.render('characters/edit-character', character.data))
        .catch(err => next(err))
})

router.post('/edit/:id', (req, res) => {
    const { id: charId } = req.params
    const newData = { name, occupation, weapon } = req.body

    charService
        .getCharacterByIDAndUpdate(charId, newData)
        .then(res.redirect('/characters'))
        .catch(err => next(err))
})

router.post('/delete/:id', (req, res, next) => {
    const { id: charId } = req.params
    charService
        .getCharacterByIDAndDelete(charId)
        .then(res.redirect('/characters'))
        .catch(err => next(err))

})



module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
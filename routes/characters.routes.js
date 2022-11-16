const router = require("express").Router();

const charactersApi = require('./../services/characters-api.service')
const api = new charactersApi

/* GET home page */
router.get("/characters", (req, res, next) => {

    api
        .getAllCharacters()
        .then(responseFromAPI => {
            // console.log(responseFromAPI)
            res.render("characters/list-characters", { characters: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});
//crear

router.get("/characters/create", (req, res, next) => {
    res.render("characters/create-character")
});

router.post("/characters/create", (req, res, next) => {

    const { name, occupation, weapon } = req.body

    api
        .createCharacter({ name, occupation, weapon })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})

//editar

// Edit character form (render)
router.get("/characters/:id/editar", (req, res, next) => {

    const { id: character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(response => res.render('characters/edit-character', { character: response.data }))
        .catch(err => console.log(err))
})


// Edit character form (handle)
router.post("/characters/:id/editar", (req, res, next) => {

    const { id: character_id } = req.params
    const { name, occupation, weapon } = req.body

    api
        .editCharacter(character_id, { name, occupation, weapon })
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
})

// Eliminate

router.post("/characters/:id/delete", (req, res, next) => {


    const { id: character_id } = req.params
    api
        .deleteCharacter(character_id)
        .then(() => res.redirect('/characters'))
        .catch(err => console.log(err))
}
)





router.get("/characters/:id", (req, res, next) => {

    const { id: character_id } = req.params

    api
        .getOneCharacter(character_id)
        .then(responseFromAPI => {
            console.log("details: ", responseFromAPI.data)
            res.render("characters/details-character", { character: responseFromAPI.data });
        })
        .catch(err => console.error(err))
});




module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
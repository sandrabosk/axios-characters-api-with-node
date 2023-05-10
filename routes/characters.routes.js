const router = require("express").Router();
const miMamaMePega = require('../services/api.services')

// get all pajuos
router.get("/characters", (req, res, next) => {
    miMamaMePega
        .todosLosPajuos()
        .then(responceFromAPI => res.render('characters/list-characters', { characters: responceFromAPI.data }))
        .catch(err => console.error(err))
});


//crear al mas mamaguevo
router.get("/create", (req, res, next) => {
    res.render("characters/create")
})

router.post("/create", (req, res, next) => {
    const { name, weapon, occupation, debt } = req.body

    miMamaMePega
        .crearMamaguevo({ name, weapon, occupation, debt })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => console.error(err))
})

//detalles del pajuo 
router.get("/characters/:id", (req, res, next) => {
    const { id } = req.params
    miMamaMePega
        .idDelPajuo(id)
        .then(responceFromAPI =>
            res.render('characters/details-character', { characters: responceFromAPI.data }))
        .catch(err => console.error(err))

});

//editar al maldito
router.get("/edit/:id", (req, res, next) => {
    const { id } = req.params

    miMamaMePega
        .idDelPajuo(id)
        .then(responceFromAPI =>
            res.render('characters/edit', { characters: responceFromAPI.data }))
        .catch(err => console.error(err))
})

router.post("/edit/:id", (req, res, next) => {
    const { id } = req.params
    const { name, weapon, occupation, debt } = req.body

    miMamaMePega
        .editarMamaguevo(id, { name, weapon, occupation, debt })
        .then(response => res.redirect(`/characters/${response.data.id}`))
        .catch(err => console.error(err))

})

// borrar maldito
router.post("/delete/:id", (req, res, next) => {
    const { id } = req.params

    miMamaMePega
        .eliminarMamaguevo(id)
        .then(() => res.redirect("/characters"))
        .catch(err => console.log(err))

})

module.exports = router;
    // https://ih-crud-api.herokuapp.com/characters
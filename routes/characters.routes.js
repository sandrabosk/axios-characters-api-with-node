// const router = require("express").Router();
// const axios = require("axios");

const express = require('express');
const router = express.Router()
const charactersServiceInstance = require('../services/character.services')


router.get('/listadoPersonajes', (req, res, next) => {
    
    charactersServiceInstance

    .getAllCharacters()
    .then(response => res.render ('characters/list-characters', {characters : response.data}))
    .catch(err => next(err))

})

router.get('/detallesPersonajes/:id', (req, res, next) => {
    
    const {id: characterID} = req.params

    charactersServiceInstance

    .detailCharacter(characterID)
    .then(response => res.render ('characters/details-character', {character : response.data}))
    .catch(err => next(err))
})

router.get('/crear', (req, res, next) => {
    res.render('characters/create-characters')
})

router.post('/crear', (req, res, next) => {

    const {name, occupation, weapon, debt } = req.body
    const newCharacter =  {name, occupation, weapon, debt } 

    charactersServiceInstance
    .createCharacter(newCharacter)
    .then(res.redirect('/personajes/listadoPersonajes'))
    .catch(err => next(err))
    
})


router.get('editar/:id', (req, res, next) => {

    const { characterID } = req.params

    charactersServiceInstance
    .detailCharacter(characterID)
    .then(response => res.render ('characters/edit-character', {characterID : response.data}))
    .catch(err => next(err))
})

router.put('editar/:id', (req, res, next) =>{

    const { name, occupation, weapon } = req.body
    const { id } = req.params
    const charD = { name, occupation, weapon }

    charactersServiceInstance
    .editCharacter(id, charD)
    .then((res.redirect(`/detallesPersonajes/${id}`)))
    .catch(err => next(err))
})

router.delete('borrar/:id', (req, res, next) =>{
    
    const {id} = req.params
    
    charactersServiceInstance
    .deleteCharacter(id)
    .then(res.redirect('/personajes/listadoPersonajes'))
    .catch(err => next(err))
})


//antes se veia el listado de personajes, ya no se que he cambiado que no se ve, casi todo he conseguido que funcione y ahpra se ha roto :( 
//lo unico que no me ha salido en ningun momento es lo de editarlos.. se ha intentado fuertemente :/
module.exports = router;


// https://ih-crud-api.herokuapp.com/characters
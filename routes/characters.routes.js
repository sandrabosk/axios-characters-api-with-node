const router = require('express').Router()
const charactersApi = require('../services/characters.service')

router.get('/list', (req, res, next) => {
  charactersApi
    .getAllCharacters()
    .then(responseFromAPI => res.render('characters/list-characters', { characters: responseFromAPI.data }))
    .catch(err => console.error(err))
})

router.get('/:id/details', (req, res, next) => {
  const { id: character_id } = req.params

  charactersApi
    .getOneCharacter(character_id)
    .then(responseFromAPI => res.render('characters/details-character', { character: responseFromAPI.data }))
    .catch(err => console.error(err))
})

router.get('/create', (req, res, next) => res.render('characters/create-character'))

router.post('/create', (req, res, next) => {
  const { name, weapon, occupation } = req.body
  const newCharacter = { name, weapon, occupation }

  charactersApi
    .createCharacter(newCharacter)
    .then(() => res.redirect('/characters/list'))
    .catch(err => console.error(err))
})

router.get('/:id/edit', (req, res, next) => {
  const { id: character_id } = req.params

  charactersApi
    .getOneCharacter(character_id)
    .then(responseFromAPI => res.render('characters/edit-character', { character: responseFromAPI.data }))
    .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res, next) => {
  const { id: character_id } = req.params
  const { name, weapon, occupation } = req.body

  const newCharacter = { name, weapon, occupation }

  charactersApi
    .editCharacter(character_id, newCharacter)
    .then(() => res.redirect(`/characters/${character_id}/details`))
    .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res, next) => {
  const { id: character_id } = req.params

  charactersApi
    .deleteCharacter(character_id)
    .then(() => res.redirect('/characters/list'))
    .catch(err => console.log(err))
})

module.exports = router

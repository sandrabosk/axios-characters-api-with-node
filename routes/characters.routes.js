const router = require('express').Router()

const charactersApi = require('../services/characters.service')

router.get('/list', (req, res, next) => {
	charactersApi
		.getAllCharacters()
		.then(responseFromAPI => {
			res.render('characters/list-characters', { characters: responseFromAPI.data })
		})
		.catch(err => next(err))
})

router.get('/characters/:id', (req, res, next) => {
	const { id: character_id } = req.params
	charactersApi
		.getOneCharacter(character_id)
		.then(responseFromAPI => {
			res.render('characters/details-character', { character: responseFromAPI.data })
		})
		.catch(err => next(err))
})

router.get('/character/create', (req, res, next) => {
	res.render('characters/create-character')
})

router.post('/character/create', (req, res, next) => {
	const { name, occupation, weapon } = req.body
	const character_data = { name, occupation, weapon }

	charactersApi
		.createCharacter(character_data)
		.then(() => res.redirect('/list'))
		.catch(err => nect(err))
})

router.get('/characters/:id/edit', (req, res, next) => {
	const { id: character_id } = req.params
	charactersApi
		.getOneCharacter(character_id)
		.then(responseFromApi =>
			res.render('characters/edit-character', { character: responseFromApi.data })
		)
})

router.post('/characters/:id/update', (req, res, next) => {
	const { id: character_id } = req.params
	const { name, occupation, weapon } = req.body
	const character_data = { name, occupation, weapon }

	charactersApi
		.editCharacter(character_id, character_data)
		.then(() => res.redirect(`/characters/${character_id}`))
		.catch(error => next(error))
})

router.post('/characters/:id/delete', (req, res, next) => {
	const { id: character_id } = req.params

	charactersApi
		.deleteCharacter(character_id)
		.then(() => res.redirect(`/list`))
		.catch(error => next(error))
})

module.exports = router

// https://ih-crud-api.herokuapp.com/characters

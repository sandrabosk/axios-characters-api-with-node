const charactersApi = require('../services/characters.service')

const list = (req, res, next) => {
	charactersApi
		.getAllCharacters()
		.then(responseFromAPI => {
			res.render('characters/list-characters', { characters: responseFromAPI.data })
		})
		.catch(err => next(err))
}

const listCount = (req, res, next) => {
	charactersApi
		.getAllCharacters()
		.then(responseFromAPI => {
			res.render('index', { characters: responseFromAPI.data })
		})
		.catch(err => next(err))
}

const getOne = (req, res, next) => {
	const { id: character_id } = req.params
	charactersApi
		.getOneCharacter(character_id)
		.then(responseFromAPI => {
			res.render('characters/details-character', { character: responseFromAPI.data })
		})
		.catch(err => next(err))
}

const createForm = (req, res, next) => {
	res.render('characters/create-character')
}

const create = (req, res, next) => {
	const { name, occupation, weapon } = req.body
	const character_data = { name, occupation, weapon }

	if (name.length === 0 || occupation.length === 0 || weapon.length === 0) {
		res.render('characters/create-character', { errorMsg: 'Introduzca todos los datos' })
		return
	}

	charactersApi
		.createCharacter(character_data)
		.then(() => res.redirect('/list'))
		.catch(err => next(err))
}

const editForm = (req, res, next) => {
	const { id: character_id } = req.params
	charactersApi
		.getOneCharacter(character_id)
		.then(responseFromApi =>
			res.render('characters/edit-character', { character: responseFromApi.data })
		)
		.catch(err => next(err))
}

const update = (req, res, next) => {
	const { id: character_id } = req.params
	const { name, occupation, weapon } = req.body
	const character_data = { name, occupation, weapon }

	charactersApi
		.editCharacter(character_id, character_data)
		.then(() => res.redirect(`/characters/${character_id}`))
		.catch(error => next(error))
}

const deleteController = (req, res, next) => {
	const { id: character_id } = req.params

	charactersApi
		.deleteCharacter(character_id)
		.then(() => res.redirect(`/list`))
		.catch(error => next(error))
}

module.exports = {
	list,
	listCount,
	getOne,
	createForm,
	create,
	editForm,
	update,
	deleteController,
}

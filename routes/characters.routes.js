const router = require('express').Router()

const {
	list,
	getOne,
	createForm,
	create,
	editForm,
	update,
	deleteController,
} = require('../controllers/characters.controllers')

router.get('/list', list)

router.get('/characters/:id', getOne)

router.get('/character/create', createForm)
router.post('/character/create', create)

router.get('/characters/:id/edit', editForm)
router.post('/characters/:id/update', update)

router.post('/characters/:id/delete', deleteController)

module.exports = router

const router = require('express').Router()

const { listCount } = require('../controllers/characters.controllers')

/* GET home page */
router.get('/', listCount)

module.exports = router

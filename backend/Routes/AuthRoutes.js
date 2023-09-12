const { userVerification } = require('../Middlewares/AuthMiddleware')
const { Signup, Login } = require('../Controllers/AuthController')
const { validateAndConvertUnits } = require('../Middlewares/validateAndConvertUnits')
const router = require('express').Router()

router.post('/signup', validateAndConvertUnits, Signup)
router.post('/login', Login)
router.post('/', userVerification)

module.exports = router
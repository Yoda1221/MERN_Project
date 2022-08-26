const express           = require('express')
const router            = express.Router()
const LoginLimiter      = require('../middlewares/LoginLimiter')
const AuthController    = require('../controllers/AuthController')

router.route('/').post(LoginLimiter, AuthController.login)
router.route('/refresh').get(AuthController.refresh)
router.route('/logout').post(AuthController.logout)

module.exports = router

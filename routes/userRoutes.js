const express           = require('express')
const router            = express.Router()
const VerifyToken       = require('../middlewares/VerifyToken')
const UsersController   = require('../controllers/UsersController')

router.use(VerifyToken)

router.route('/')
    .get(UsersController.getAllUsers)
    .post(UsersController.cerateUser)
    .patch(UsersController.updateUser)
    .delete(UsersController.deleteUser) 

module.exports = router

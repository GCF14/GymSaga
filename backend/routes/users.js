const express = require('express')

// controller
const { signUpUser, loginUser } = require('../controllers/userController')

const router = express.Router()

//log in route
router.post('/login', loginUser)

//sign up route
router.post('/signup', signUpUser)


module.exports = router
const express = require('express')

// controller
const { signUpUser, loginUser, logoutUser } = require('../controllers/userController')

const router = express.Router()

//log in route
router.post('/login', loginUser)

//sign up route
router.post('/signup', signUpUser)

//logout route
router.post('/logout', logoutUser)


module.exports = router
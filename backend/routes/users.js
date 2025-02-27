const express = require('express')

// controller
const { signUpUser, loginUser, logoutUser, getUser, deleteUser } = require('../controllers/userController')

const router = express.Router()

//log in route
router.post('/login', loginUser)

//sign up route
router.post('/signup', signUpUser)

//logout route
router.post('/logout', logoutUser)

// get user route
router.get('/me', getUser);

// delete user route
router.delete('/:id', deleteUser)


module.exports = router
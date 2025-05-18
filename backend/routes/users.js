const express = require('express')

// controller
const { 
    signUpUser, 
    loginUser, 
    logoutUser, 
    getUser, 
    deleteUser, 
    updateUser, 
    getUserbyId, 
    getUserByUsername 
} = require('../controllers/userController')

const router = express.Router()

//log in route
router.post('/login', loginUser)

//sign up route
router.post('/signup', signUpUser)

//logout route
router.post('/logout', logoutUser)

// get user route
router.get('/me', getUser)

// get user by id
router.get('/:id', getUserbyId)

// delete user route
router.delete('/:id', deleteUser)

// update user route
router.patch('/update/:id', updateUser)

// get user by username
router.get('/byUsername/:username', getUserByUsername)



module.exports = router
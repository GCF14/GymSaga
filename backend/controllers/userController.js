const User = require('../models/userModel')


// login the user
const loginUser = async (req, res) => {
    res.json({mssg: 'login user'})

}

// signup the user 
const signUpUser = async (req, res) => {
    res.json({mssg: 'signup user'})
}

module.exports = { signUpUser, loginUser }
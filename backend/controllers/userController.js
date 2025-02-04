const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '7d' })

}
// login the user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        
        // create the token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// signup the user 
const signUpUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)
        
        // create the token
        const token = createToken(user._id)

        res.cookie('token', token, {
            httpOnly: false, // This will prevent access using javascript
            secure: process.env.NODE_ENV === 'production', // Set secure flag in production (HTTPS)
            sameSite: 'Strict', // This will protect against CSRF
            maxAge: 2592000000 // 30 days
        });

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
  
    
}

module.exports = { signUpUser, loginUser }
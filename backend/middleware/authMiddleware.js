const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt  // Get JWT from cookies

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET)
        req.userId = decoded._id
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: Invalid token' })
    }
}

module.exports = requireAuth

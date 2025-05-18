const User = require('../models/userModel')
const Post = require('../models/postModel') // Add the Post model import
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

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
        res.cookie('token', token, {
            httpOnly: true, // This will prevent access using javascript
            secure: process.env.NODE_ENV === 'production', // Set secure flag in production (HTTPS)
            sameSite: 'Strict', // This will protect against CSRF
            maxAge: 2592000000 // 30 days
        });

        res.status(200).json({email: user.email, username: user.username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup the user 
const signUpUser = async (req, res) => {
    const {email, password, username, firstName, lastName} = req.body

    try {
        const user = await User.signup(email, password, username, firstName, lastName)
        
        // create the token
        const token = createToken(user._id)

        res.cookie('token', token, {
            httpOnly: true, // This will prevent access using javascript
            secure: process.env.NODE_ENV === 'production', // Set secure flag in production (HTTPS)
            sameSite: 'Strict', // This will protect against CSRF
            maxAge: 2592000000 // 30 days
        });

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// logout the user
const logoutUser = async (req, res) => {
    res.cookie('token', "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        expires: new Date(0)
    })

    res.status(200).json({message: 'Logged out successfully'})
}

const getUser = async (req, res) => {
  // Get token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET); 
    
    const user = await User.findById(decoded._id).select('username'); 

    res.json({ userId: decoded._id, username: user.username });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// delete a user
const deleteUser = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error:'No such user'})
    }

    const user = await User.findOneAndDelete({_id: id})

    if(!user) {
        return res.status(400).json({error:'No such user'})
    }

    res.cookie('token', "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'Strict',
        expires: new Date(0)
    })

    res.status(200).json({message: 'Deleted account successfully'})
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { email, profilePicture, bio, password, username, firstName, lastName } = req.body

        // Check if valid id
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error:'No such user'})
        }

        // Check which fields are being updated
        const updateFields = Object.fromEntries(
            Object.entries({ email, profilePicture, bio, password, username, firstName, lastName }).filter(([_, v]) => v != null)
        );

        // Store old username if we're updating username
        let oldUsername = null;
        if (username) {  
            const existingUser = await User.findById(id);
            if (existingUser) {
                oldUsername = existingUser.username;
            }
            
            // check if new username already exists for another user
            const exists = await User.findOne({ username: { $regex: `^${username}$`, $options: 'i' } });

            if (exists && exists._id.toString() !== id) { 
                return res.status(409).json({ message: 'Username already in use' }); 
            }
        }

        // Update the fields available
        if(Object.keys(updateFields).length > 0) {
            const editedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });
            
            // If username was updated, we need to update any posts by this user
            if (username && oldUsername && username !== oldUsername) {
                console.log(`Updating posts from username ${oldUsername} to ${username}`);
                try {
                    // Update all posts with the old username
                    const updateResult = await Post.updateMany(
                        { username: oldUsername },
                        { username: username }
                    );
                    console.log(`Updated ${updateResult.modifiedCount} posts`);
                } catch (postUpdateError) {
                    console.error('Error updating posts:', postUpdateError);
                    // Continue execution - don't fail the user update if post updates fail
                }
            }
            
            return res.json({ 
                message: 'User edited successfully', 
                user: editedUser,
                usernameChanged: username && oldUsername && username !== oldUsername,
                oldUsername: oldUsername 
            })
        }

    } catch (error) {
        console.error('Error in updateUser:', error);
        return res.status(400).json({ error: error.message });
    }
}

const getUserbyId = async (req, res) => {
    const { id } = req.params

    // Check if valid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const user = await User.findById(id).select('username profilePicture bio'); 

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        } else {
            return res.status(200).json({ userId: id, username: user.username, profilePicture: user.profilePicture, bio: user.bio });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { signUpUser, loginUser, logoutUser, getUser, deleteUser, updateUser, getUserbyId }
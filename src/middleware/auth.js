const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    console.log('auth middleware is running')
    
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        //verify the token
        const decodedObj = jwt.verify(token, 'secret key')
        console.log('decoded token:', decodedObj)
        console.log('_id:', decodedObj._id)
        const user = await User.findOne({_id: decodedObj._id, 'tokens.token': token})
        
        if (!user) {
            throw new Error({error: 'Please Authenticate'})
        }
        //send over the user found
        console.log(user)
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = auth

//exploring routes
const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router = new express.Router()


//we need to choose the correct response code
//for creating sth, 201 is better than 200
router.post('/users', async (req, res) => {
    //console.log(req.body)
    const user = new User(req.body)
    try {
        const token = await user.createToken()
        console.log("returned token:", token)
        console.log('success:', 'new user is created')
        res.status(201).send({user})
    } catch(error) {
        res.status(400).send(error)
        //console.log('unable to create a new user')
    }
})

//ask for login verification
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.password, req.body.email)
        console.log('user._id: ', user._id)
        const token = await user.createToken()
        if (!user) {
            throw new Error('the user is not found')
        }
        /*
            hiding the private data
        */
        //res.send({user: user.getPublicProfile(), token})
        
        /*
            shorthand: directly customize toJSON method to automate for
            all the returned user obejct visible to users
            see user module
        */
        res.status(201).send({user, token})

    } catch (e) {
        res.status(500).send(e.message)
    } 
}) 

router.post('/users/logout', auth, async (req, res)=>{
    //what should auth do when user logs out?
    //you need to delete the token or make it expired
    //but during auth, still need to verify and then acquire the token
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        //we made changes to token array, so we need to save
        await req.user.save()

        res.status(200).send(req.user)
    } catch(error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res)=>{
    try {
        console.log('after authorization:', 'clear the cache')
        req.user.tokens = []

        //we made changes to token array, so we need to save
        await req.user.save()

        res.status(200).send(req.user)
    } catch(error) {
        res.status(500).send()
    }
})

router.get('/users', (req, res) => {
    //searching for users
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((error) => { 
        res.status(500).send()
    })
})

//read profile for specific user that is authenticated
router.get('/users/me', auth, async (req, res)=>{
    //this will run only after auth is perfomed
    //auth will return the user
    res.send(req.user)
})

//get user by id    get /users/:id 
router.get('/users/:id',(req, res) => {
    //print the id
    console.log(req.params)
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if (!user) {
            res.status(404).send()
        }
        res.send(user)
    }).catch((error)=>{
        res.status(500).send()
    })
})

//update the user by id
router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id
    const body = Object.keys(req.body)
    const alloweUpdates = ['name', 'email', 'password', 'age']
    try {
        const isValid = body.every((field) =>{
            return alloweUpdates.includes(field)
        })
        if (!isValid) throw new Error('bad update request')
       /* 
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, useFindAndModify: true})
       */
        const user = await User.findById(_id)
        body.forEach((key) => {
            user[key] = req.body[key]
        })
        await user.save()

        if (!user) throw new Error('no such an user')
        res.status(201).send(user)
    } catch(e){
        res.status(400).send()
    }
})

//delete user by id
//just delete the user who requested, so /users/:id, id is not needed for safety
/*router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) throw new Error('no such an user')
        res.send(user)
    } catch(e) {
        res.status(500).send(e.message)
    }
})*/

//directly delete the user profile after the action is authorized
router.delete('/users/me', auth, async (req, res) => {
    //would not run if auth didnt not pass
    console.log('running delete')
    try {
        /*
        just use the remove method
        */ 
        //const user = await User.findByIdAndDelete(req.params.id)
        //if (!user) throw new Error('no such an user')
        await req.user.remove()
        res.send(req.user)
    } catch(e) {
        res.status(500).send()
    }
})


module.exports = router












module.exports = router
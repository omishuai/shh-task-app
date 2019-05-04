//exploring routes
const express = require('express')
const User = require('../models/user')

const router = new express.Router()


//we need to choose the correct response code
//for creating sth, 201 is better than 200
router.post('/users', (req, res) => {
    //console.log(req.body)
    const user = new User(req.body)
    user.save().then(()=>{
        res.status(201).send(user)
        console.log('success:', 'new user is created\n'+ user)
    }).catch((error)=>{
        res.status(400).send(error)
        //console.log('unable to create a new user')
    })
})

router.get('/users', (req, res) => {
    //searching for users
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((error) => { 
        res.status(500).send()
    })
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
        const newUser = await User.findByIdAndUpdate(_id, req.body, {new: true})
        if (!newUser) throw new Error('no such an user')
        res.status(201).send(newUser)
    } catch(e){
        res.status(400).send(e.message)
    }
})

//delete user by id
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) throw new Error('no such an user')
        res.send(user)
    } catch(e) {
        res.status(500).send(e.message)
    }
})

module.exports = router












module.exports = router
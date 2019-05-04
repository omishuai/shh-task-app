
const express = require('express')
const router = new express.Router()

const Task = require('../models/task')

//async-wait model for task
router.post('/tasks', async(req, res) => {
    //console.log(req.body)
    const task = new Task(req.body)
    /*
    task.save().then(()=>{
        res.send(task)
        console.log('success:', 'new task is created\n'+ task)
    }).catch((error)=>{
        res.status(400).send(error)
        console.log('unable to create a new task')
    })*/
    try{
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(error)
    }
})

router.get('/tasks', async (req, res) => {
    //searching for tasks
    /*
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((error) => { 
        res.status(500).send()
    })
    */
    try{
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    } catch(e) {
        res.status(500).send()
    }
})

//get user by id    get /users/:id 
router.get('/tasks/:id', async (req, res) => {
    //print the id
    console.log(req.params)
    const _id = req.params.id
    /*Task.findById(_id).then((task)=>{
        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    }).catch((error)=>{
        res.status(500).send()
    })*/
    try{
        const task = await Task.findById(_id)
        if (!task) throw new Error('empty')
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

//update the task by id
router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const body = Object.keys(req.body)
        const alloweUpdates = ['description', 'complete']
        const isValid = body.every((field) =>{
            return alloweUpdates.includes(field)
        })
        if (!isValid) throw new Error('bad update request')
        const newTask = await Task.findByIdAndUpdate(_id, req.body, {new: true})
        if (!newTask) throw new Error('no such an task')
        res.status(201).send(newTask)
    } catch(e){
        res.status(400).send(e.message)
    }
})

//delete task by id
router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) throw new Error('no such an task')
        res.send(task)
    } catch(e) {
        res.status(500).send(e.message)
    }
})
module.exports = router
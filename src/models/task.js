const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = new mongoose.Schema({
     //config each field
     description: {
        type: String,
        required: true,
        trim: true
    },
    complete: {
        type: Boolean,
        default: false
    }
})

taskSchema.pre('save', function (next) {
    if (this.isModified('complete')) {
        console.log('Saving comeplete:', this.complete)
        next()
    }
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task
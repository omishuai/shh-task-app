const mongoose = require('mongoose')
const validator = require('validator')
const Task = mongoose.model('Task', {
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
module.exports = Task
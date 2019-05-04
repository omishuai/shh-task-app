const mongoose = require('mongoose')
const validator = require('validator')
const User = mongoose.model('User', {
    //config each field
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            let val = value.toLowerCase()
            if(val.includes('password')) {
                throw new Error('password cannot contain "password"')
            }
        }
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('is not a valid email')
            }
        }
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) throw new Error('age must be positive')
        }
    }
})

module.exports = User
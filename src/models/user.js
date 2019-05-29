

const mongoose = require('mongoose')
const validator = require('validator')
const chalk = require('chalk')

//create schema 
const userSchema = new mongoose.Schema({
    //config each field
    name: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            require: true,
        },
    }],
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
        unique: true,
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

const bcrypt = require('bcryptjs')
//normal funciton call, no arrow fucntion (no binding)
userSchema.pre('save', async function(next){
    const user = this
    //here we can verify the validity of change
    if (user.isModified('password')) {
        //overwrite the password before saving it to database
        console.log('password now:', user.password)
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log('Saving the user.....')
    //save the user
    next()
})

const jwt = require('jsonwebtoken')

//schema methods for single instance
//arrow function does not have binding
userSchema.methods.createToken = async function(){
    const user = this
    console.log({user})
    const token = jwt.sign({_id: user._id.toString()}, "secret key" )
    
    //save the user to the database
    user.tokens = user.tokens.concat({token})
    await user.save()
    console.log("sending back token:", token)
    return token
}

//no error function since we need data binding
userSchema.methods.getPublicProfile = function () {
    const user = this
    console.log({user})
    const userObject = user.toObject()
    console.log(chalk.green('turning to object'))
    console.log(userObject)
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.toJSON = function () {
    const user = this
    console.log({user})
    const userObject = user.toObject()
    console.log(chalk.green('turning to object'))
    console.log(userObject)
    delete userObject.password
    delete userObject.tokens
    return userObject
}

//schema statics for the model directly
userSchema.statics.findByCredentials = async (password, email) => {
    
    const user = await User.findOne({email})

    if (!user) {
        console.log("console: cannot find the user")
        throw new Error('cannot find the user')
    }
    console.log(user)
    console.log("password:", password)
    console.log("stored password:", user.password)

    if (await bcrypt.compare(password, user.password)) return user
    else {
        console.log('console: wrong password')
        throw new Error("the password does not match")
    }
}
const User = mongoose.model('User', userSchema)

module.exports = User
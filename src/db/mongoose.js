const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/task-app-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

//config the data
/*
const User = mongoose.model('User', {
    //config each field
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

//create an instance
const me = new User({name: 'Shuai', age: "mike"})

//save to database
me.save().then(()=>{
    console.log('Success:', me)
}).catch((error)=>{
    console.log('Error', error)
})
*/

/*
const validator = require('validator')
const Task = mongoose.model('Task', {
    //config each field
    description: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
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
    complete: {
        type: Boolean,
        default: false
    },
    ranking: {
        type: Number,
        default:5,
        validate(value) {
            if (value < 0) throw new Error('ranking must be positive')
        }
    }
})

//create an instance
const task1 = new Task(
    {
        //description:'shopping for phones',
        //complete: false
        email: '            shua9i@gmail.com',
        password: '1wordasad'

    })
//save to database
task1.save().then(()=>{
    console.log('Success:', task1)
}).catch((error)=>{
    console.log('Error', error)
})
*/
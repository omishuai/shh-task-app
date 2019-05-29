const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

//const auth = require('./middleware/auth')

const app = express()
const port = process.env.PORT || 3000

//loading users and tasks for accessing database
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

//register new(customized) middle ware
/*
app.use((req, res, next)=>{
    console.log(req.method, req.path)
    //to continue with execution
    next()
})*/

/*
app.use((req, res, next)=>{
    res.status(503).send("error: in maintenance")
})*/


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is listening on port', port)
})

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const myFunction = async () => {

    console.log("testing tokens......")
    //private to client   id,encoding
    //const token = jwt.sign({_id:...}, "daadas", {expiresIn:"5 seconds"})
    const token = jwt.sign({_id:'abc123'}, "thisismynewcourse")
    console.log("token:\n" + token)
    //type of token + data + signature

    //using the token to verify
    //token, secret
    //token is public but secret is private
    const data = jwt.verify(token, 'thisismynewcourse')
    console.log("data", data)

}

const myFunction2 = async ()=>{
    const password = 'Blue123'
    //decrypt 8 rounds
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare(password, hashedPassword)
    console.log(isMatch)
}
//myFunction()
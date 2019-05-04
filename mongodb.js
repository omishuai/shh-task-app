

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
//==> const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const database = 'task-app'

//generate id
//const id = new ObjectID()
//console.log(id)

//asynchronous
MongoClient.connect(connectionURL, { useNewUrlParser:true }, (error, client) => {
    if (error) return console.log('unable to connect\n' + error)
    console.log('connected correctly')
    const db =  client.db(database)

    //can also search by id 
    //findOne({_id: new ObjectID(id string)})
    db.collection('users').findOne({name : 'Jane', age: 20}, (error, user) => {
        if (error) return console.log('unable to retrieve')
        console.log(user)
    })
    //doesnt take call back, return a cursor
    const cursor = db.collection('users').find({age:27})
    cursor.toArray((error, users) => {
        if (error) return console.log('unable to find')
        console.log(users)
        console.log(users.length)
        
    })

    //update promise pattern
    const updatePromise = db.collection('users').updateOne({
        _id: new ObjectID("5cc78e780c3bf81b6966cc6f")
    }, {
        $set: {
            name: 'Mike',
            age: 28
        }
    })
    updatePromise.then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log('error', error)
    }) 

    //delete
    db.collection('users').deleteMany({
        age: 27
    }).then((result)=>{console.log('success', result)}).catch((error) => {
        console.log('error', error)
    })

})
/*
   db.collection('users').insertOne({
       name: 'Shuai',
       age: 27
    }, (error, result)=>{
       if (error) return console.log('connection error')
        console.log(result.ops)
    })

    db.collection('users').insertMany(
        [{
            name: 'Jane',
            age:20
        }, {
            name: 'hello',
            age: 21
        }], (error, result)=>{
            if(error) return console.log('unable to insert')
            console.log(result.ops)
        }
    )

    db.collection('task').insertMany([
        {
            description: 'task1',
            completed: true
        },{
            description: 'task2',
            completed: false
        },{
            description: 'task3',
            completed: true
        }
    ], (error, result) => {
        if (error) return console.log('unable to insert')
        console.log(result.ops)
    })
})
*/

//created

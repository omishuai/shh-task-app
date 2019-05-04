require('../db/mongoose')
const Task = require('../models/task')

const id = '5ccb56e5f14e38477a0bfd0a'
Task.deleteOne({_id: id}).then((result)=> {
        return Task.countDocuments({complete: false})
    }
).then((result)=>{
    console.log(result)
}).catch((error)=>{
    console.log(error)
})

# shh-task-app
taskApp (node.js)

-database (mongo db)

SQL                           NoSQL
table: row and records        collection of key-value pair: documents with fields

//mongoose for mongoDB validation
 
//REST API
representation of users and tasks
state transfer from server to client 

user -> http(get) -> server
                    looking for task
user <- repsonse <- server

====
user -> http request (post JSON) -> server
                                   --authenticate
user <- http response <- server


REST API  struture---
create (POST /tasks)
read   (GET /tasks)  multiple resources
read   (GET /tasks/:id)  targeting individual
update (PATCH /tatsks/:id)  update resource
delete (DELETE /tasks/:id)

--Postman
manipulate request

-Routers to refactor all the database accessing methods for different modules
new express.Router()
-sync_wait to better structure the promise methods
instead of chaining all promises, we can try catch the promises with await key word, and wrap them in an async method, 

--security
hashing algorithm for encryption: bcrypt (non-reversible)

--the difference between update through individual field access and update by findByIdAndUpdate() all at once
with middleware involved
middleware.pre 
-> save() before the action of saving is performed -> middleware pre('save') is called, and the
callback function is executed, and after next() is signaled, save() function can continue


JSON Web Tokens : jwt   npm:jsonwebtoken
//user use token that sent by from the backend to modify data
//backend will create the token based on encoding and user information and then send back to user
//routers will be categotized into private or public, where private can only be accessed by users with the valid token prepared previously by backend, and public will be like user login page 


//express middleware: create a new directory to store middleware
with middleware:
new request-> router handler is called
without middleware:
new request-> do_something -> run router handler
middleware sits in between a raw request and the final intended route
combining route and middle ware
router.get('route', middleware, event handler()=>{})

==Postman
adding new environment (example see create User)
to avoid retyping the environment each time when we switching the environment 




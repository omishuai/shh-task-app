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
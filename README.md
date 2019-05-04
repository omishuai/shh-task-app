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


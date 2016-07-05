var Todos = require("../models/todoModel");

// We want to be able to call setupController on our app, which goes and does stuff.
module.exports = function(app){
  // if a get request is made to setupTodos...
  app.get("/api/setupTodos", function(req, res){

    // ... create some seed data...
    var seedTodos = [
      {
        username: "test",
        todo: "buy milk",
        isDone: false,
        hasAttachment: false
      }
    ];

    // ...  save it to mongoDB with mongoose...
    Todos.create(seedTodos, function(err, results){
      // and send the response 
      res.send(results);
    });
  });
}

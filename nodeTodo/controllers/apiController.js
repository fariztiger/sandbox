var Todos = require("../models/todoModel");
var bodyParser = require("body-parser");

module.exports = function(app){

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));

  app.get("/api/todos/:uname", function(req, res){
    Todos.find({ username: req.params.uname },
      function(err, todos){
        if (err) throw err;
        res.send(todos);
      });
  });

  app.get("/api/todo/:id", function(req, res){
    Todos.findById({_id: req.params.id},
    function(err, todo){
      if (err) throw err;
      res.send(todo);
    });

  });

  app.post("/api/todo", function(req, res){
    // check if it's an update.
    if (req.body.id){
      // find and update with the new data
      Todos.findByIdAndUpdate(req.body.id, {
        todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment
      }, function(err, todo){
        // respond
        if (err) throw err;
        res.send("Success");
      });
    }
    else{
      var newTodo = Todos({
        username: "test",
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      });
      newTodo.save(function(err){
        res.send("success");
      });
    };
  });

  app.delete("/api/todo", function(req, res){

    Todos.findByIdAndRemove(req.body.id, function(err){
        if (err) throw error;
        res.send("Deleted");
    });
  });

  app.post("/api/register", function(req, res){
    // register a new user
  });

  app.post("/api/login", function(req, res){
    // login a returning user
  });

  app.get("/api/profile/:userid", function(req, res){
    // get a user's details.
  });

};

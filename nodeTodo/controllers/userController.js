var User = require("../models/userModel.js");
var bodyParser = require("body-parser");


module.exports = function(app){

  app.post("/login", function(req, res){
    // create a new user object
    var user = new User({
      name: req.body.name,
      password: req.body.password
    })
    user.save(function(err){
      if (err){
        res.render("index.ejs", {message: err})
      } else {
        res.render("index.ejs", {message: "Awesome! You've created an account & saved your todos"})
      };
    });
  });



}

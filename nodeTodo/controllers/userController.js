var User = require("../models/userModel.js");
var bodyParser = require("body-parser");
var store = require("store");
var sessions = require("client-sessions");


module.exports = function(app){

// User cookies don't clear on
  app.get("/clearcookies", function(req, res){
      req.session.reset();
      res.locals.userName = ""; // clear the local variable.
      res.redirect("/");
  });

  app.post("/currentuser", function(req, res){
    if (!req.session.user){
      res.status(400).send("No active session");
    } else {
      res.send(req.session.user.name);
    }
  });

  app.post("/newuser", function(req, res){
    // first, check if the user already exists
    User.findOne({name: req.body.name}, function(err, user){
      if (user){
        res.status(400).send("There's already a user with that name...")
      } else { // make new user
        var user = new User({
          name: req.body.name,
          password: req.body.password
        })

        user.save(function(err){ // save new user to db
          if (err){
            res.render("index.ejs", {message: err});
          } else {
            req.session.user = user;
            res.send(user);
          };
        });
      };
    });
  });

  app.post("/login", function(req, res){
    // Check if the user already exists
    User.findOne({name: req.body.name}, function(err, user){
      if (user){
        // user exists already, check their password.
        if (req.body.password == user.password){
          req.session.user = user; // set cookie
          res.status(200).send(user);
        } else {
          res.status(400).send("Wrong username or password...");
        };
      };
    });
  });

  app.post("/logout", function(req, res){});







}

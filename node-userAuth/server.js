var express = require("express");
var sessions = require("client-sessions")
var bodyParser = require("body-parser")
var app = express();
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// create a schema object from mongoose.
var Schema = mongoose.Schema;
// grab the automatically generated mongo ID
var ObjectId = Schema.ObjectId;

// new user factory and schema
var User = mongoose.model("User", new Schema({
  id: ObjectId,
  name: String,
  email: {type: String, unique: true},
  password: String
}));

// connect to database
mongoose.connect("mongodb://localhost/auth");

// middleware (before running any of the routes, do this stuff FIRST)

app.use(bodyParser.urlencoded({extended: true}));
app.use(sessions({
  cookieName: "session",
  secret: "asdfgh6543245tycftdrse",
  duration: 30 * 60 * 1000,
  activeDuration: 30 * 60 * 1000
}))


app.use(express.static("app"));

app.use(function(req, res, next){
  if (req.session && req.session.user){
    User.findOne({email: req.session.user.email}, function(err, user){
        if (user){
          // so we can call req.user in our templates?
          req.user = user;
          // update the cookie
          req.session.user = req.user;
          // delete user's hashed password from the cookie
          delete req.session.user.password;
          // update the local variables.
          res.locals.user = user;
        }
        next();
    });
    } else {
      next();
    }
});

function requireLogin(req, res, next){
  if (!req.user){
    res.redirect("/login");
  } else {
    next();
  }
}

// routes
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index", {message: "hello, world"})
});


app.get("/login", function(req, res){
  res.render("login")
});

app.post("/login", function(req, res){
  User.findOne({email: req.body.email}, function(err, user){
    // check if the user exists
        if (!user){
          res.render("login", {error: "invalid email or password"})
        } else {
          // if he does, then check his password
              if (bcrypt.compareSync(req.body.password, user.password)){
                req.session.user = user;
                res.redirect("dashboard");
                console.log("great success!");
              } else {
                res.render("login", {error: "invalid email or password"})
              };
        };
  });
});

app.get("/register", function(req, res){
  res.render("register")
});

app.post("/register", function(req, res){
  var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash
  })
  user.save(function(err){

    if (err) {
      var error = "something bad happened";
      res.render("register", {error: error});
    } else {
      res.redirect("dashboard");
    };
  });

});

app.get("/test", function(req, res){
  res.send(req.session.user.password)
});

app.get("/dashboard", requireLogin, function(req, res){
  res.render("dashboard")
});

app.get("/logout", function(req, res){
  req.session.reset();
  res.redirect("/")
});

app.listen(3000);

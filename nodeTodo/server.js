var express = require("express");
var app = express();
var mongoose = require("mongoose");
var config = require("./config");
var setupController = require("./controllers/setupController");
var apiController = require("./controllers/apiController");
var userController = require("./controllers/userController")
var path = require("path");
var bodyParser = require("body-parser")
var sessions = require("client-sessions");


// node has a process.env property which returns an object containing the user environment. We want node to either use the PORT already there or the local 3000 port.
var port = process.env.PORT || 3000;

// middleware
app.use(bodyParser.urlencoded({extended: false}));

app.use(sessions({
  cookieName: "session",
  secret: "ui94ghaoknv18rgbnal",
  duration: 24*60*60*1000,
  activeDuration: 1000* 60 * 5
}));

app.use(function(req, res, next){
  if (req.session.user){
    res.locals.userName = req.session.user.name;
    next();
  } else {
    next();
  }
});

// if someone requests assets, get them here:
app.use("/public", express.static(__dirname + "/public"));
// set up the templating engine.
app.set("view engine", "ejs");
app.set("views", "./public");

//connect to mongodb
mongoose.connect(config.getDbConnectionString());

// setup seed data.
setupController(app);

// setup todo api
apiController(app);

// setup user controller
userController(app);

// Routes
app.get("/", function(req, res){
  res.render("index.ejs");
});

// listen for requests
app.listen(port);

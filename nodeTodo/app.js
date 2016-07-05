var express = require("express");
var app = express();
var mongoose = require("mongoose");
var config = require("./config");
var setupController = require("./controllers/setupController");
var apiController = require("./controllers/apiController");
var path = require("path");

// node has a process.env property which returns an object containing the user environment. We want node to either use the PORT already there or the local 3000 port.
var port = process.env.PORT || 3000;

// if someone requests assets, get them here:
app.use("/public", express.static(__dirname + "/public"));

// set up the templating engine.
app.set("view engine", "ejs");


//connect to mongodb
mongoose.connect(config.getDbConnectionString());

// setup seed data.
setupController(app);
apiController(app);

// Routes
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// listen for requests
app.listen(port);

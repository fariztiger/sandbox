var Emitter = require("events");

var emitter = new Emitter();

emitter.on("shout", function(){
  console.log("someone is screaming");
});

console.log("AAAAAAAAA!");
emitter.emit("shout");

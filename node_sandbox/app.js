// ./ tells node to look in the same folder.

// We've exported a variable function in greet.js
var newGreet = require('./greet')

// newGreet();


// this is a function CONSTRUCTOR. It will let you create new instances of a series of functions with the NEW keyword. Remember to use "this" so that it refers to the instance of the constructor.

function Kat(age){
  this.purr = function(){
    console.log("rrrrrrr");
  };
  this.age = age;
  this.sayAge = function(){
    console.log("I'm " + this.age + " years old");
  };

}
Kat.prototype.miaw = function(){
  console.log("miaaaaw I'm from kat's prototype");
};
// Kat.sayAge();
// Kat.purr();

var katTwin = new Kat(56);

katTwin.purr();
katTwin.sayAge();
katTwin.miaw();
console.log(katTwin.__proto__);

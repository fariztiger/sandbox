var a = 2;
var b = 3;

console.log(a + b);

(function(){
  console.log("Ran an iffe with node.");
}());

// function statement.
function greet(){
  console.log("hello");
};
greet();

// functions are first-class. (you can treat them like any other variables)

function logGreeting(fn){
  console.log("This one is from a function passed into another function:");
  fn();
};
logGreeting(greet);

// function expression. An expression is just 'stuff'. A number or anything.
var greetMe = function(){
  console.log("... now I'm in a function expression");
};
greetMe();

// Even these are first class.
logGreeting(greetMe);

// You can also create functions as you go to set them as variables.
logGreeting(function(){
  console.log("THIS WAS MADE 'ON THE FLY'");
});

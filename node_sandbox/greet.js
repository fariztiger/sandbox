var greet = function(){
  console.log("hello from the greet module.");
};

// to make variables in a module available to anything that requires it, you have to declare them in module.exports
module.exports = greet;

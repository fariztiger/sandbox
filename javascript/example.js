'use strict'
//
// let sam = {
//   Controller : {
//     sayBye: function(){
//       console.log("bye");
//     }
//   }
// };
//
// sam.Controller.sayBye();

// objects are key value pairs.




function Human(){
  var human = {
    name: "ben",
    surname: "jones"
  };

  this.sayName = function () {
    console.log(human.name + human.surname);
  };

  this.logThis = function(){
    console.dir(this);
  };
}

var Ben = new Human;

Ben.sayName();
Ben.logThis();
console.log(this);

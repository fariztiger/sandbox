// function add(a){
//   return function(b){
//     return a + b;
//   };
// }
// console.log(add(3)(4));

function applyf(method){
  return function (x) {
    return function (y) {
      return binary(x,y);
    };
  };
}

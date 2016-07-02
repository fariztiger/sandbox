var secretkey = "I'm a secret and cannot be changed."

var sharePassword = function(){
  console.log(secretkey);
};

module.exports = {
  sharePassword: sharePassword
}

var dog = function (name) {
  var sound = "woof!";

  return {
    talk: function(){
      console.log(sound, "My name is:", name);
    }
  };
};

var jack = dog("jack");

jack.talk();

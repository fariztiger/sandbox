$(function(){
  var model = {
    init: function(){
      if (!localStorage.kitties){
        // if there are no kitties stored locally, add them
          localStorage.kitties = JSON.stringify([
            {
              name: "Kitty 1",
              image: "http://i.telegraph.co.uk/multimedia/archive/02830/cat_2830677b.jpg",
              clicks: 0
            },
            {
              name: "Kitty 2",
              image: "http://www.eastcottvets.co.uk/uploads/Animals/gingerkitten.jpg",
              clicks: 0
            },
            {
              name: "Kitty 3",
              image: "https://pbs.twimg.com/profile_images/562466745340817408/_nIu8KHX.jpeg",
              clicks: 0
            }]);
        }
      },

      addClick: function(kittyId){
        // fetch the kitties
        var data = JSON.parse(localStorage.kitties);
        // add 1 to the click count for the kitty
        data[kittyId].clicks += 1;
        // save
        localStorage.kitties = JSON.stringify(data);
      },

      getKitties: function(){
        // return an array of every kitty's name
        return JSON.parse(localStorage.kitties)
      },

      getKitty: function(id){
        return JSON.parse(localStorage.kitties)[id];
      }

    };

  var octopus = {
    // fetch the cat names from the model
    getKitties: function(){
      return model.getKitties();
    },

    // a kitty button has been clicked, find that kitty's info
    fetchKitty: function(kittyId){
      display.showKitty(model.getKitty(kittyId), kittyId);
    },
    // initalize the data and the view
    init: function(){
      model.init();
      kittyList.init();
    },

    // click handler
    addClick: function(kittyId){
      // add 1 to the stored click count.
      model.addClick(kittyId);
      // render the kitty again.
      display.showKitty(model.getKitty(kittyId), kittyId);
    }

  }

  var kittyList = {
    // get a list of cats from the data and display them
    init: function(){
      this.div = $(".kittyList");
      htmlList = ""
      octopus.getKitties().forEach(function(kitty, index){
        htmlList += '<button class = "button" id =" ' + index + '">' + kitty.name + '</button>';
      });
      this.div.html(htmlList);
      // listen for clicks on the button and tell the octopus the id of the kitty clicked.
      $(".button").click(function(){
        octopus.fetchKitty(parseInt(this.id));
      });
    }

  }

  var display = {

    showKitty: function(kitty, id){
      //display the kitty
      var name = $("#kittyName");
      var image = $(".kittyImage");
      var clicks = $("#kittyClicks");
      var display = $(".display")
      name.html(kitty.name);
      // image needs to be replaced every time so that click events don't stack on the same image
      image.replaceWith('<img class = "kittyImage" src = "' + kitty.image + '" id = "'+id+'">')
      clicks.html(kitty.clicks);
      // listen for clicks on the kitty's img
      $("img#"+id).one("click", function(){
        octopus.addClick(parseInt(this.id));
      });
    }
  }

  octopus.init();
});

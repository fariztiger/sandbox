$(function(){
  var model = {
    currentKitty: null,
    adminMode: false,

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
      },

      updateKitty: function(kittyId, name, image, clicks){
        // get the kitty's data
        var kitties = model.getKitties();
        var kitty = kitties[kittyId];
        // set the updated values
        kitty.name = name;
        kitty.image = image;
        kitty.clicks = clicks;
        // save the data back to local
        localStorage.kitties = JSON.stringify(kitties)
      }

    };

  var octopus = {
    // fetch the cat names from the model
    getKitties: function(){
      return model.getKitties();
    },

    // a kitty button has been clicked, set currentKitty and display its info
    fetchKitty: function(kittyId){
      // set current kitty
      model.currentKitty = model.getKitty(kittyId)
      model.currentKitty.id = kittyId
      // show current kitty
      display.showKitty(model.currentKitty, kittyId);
      if (model.adminMode == true) {
        display.showKittyAdmin(model.currentKitty)
      }
    },

    // initalize the data and the view
    init: function(){
      model.init();
      kittyList.init();
      display.init();
    },

    // click handler
    addClick: function(kittyId){
      // add 1 to the stored click count.
      model.addClick(kittyId);
      // update the data for currentKitty
      model.currentKitty = model.getKitty(kittyId);
      model.currentKitty.id = kittyId;
      // render the kitty again.
      display.showKitty(model.getKitty(kittyId), kittyId);
      // if adminmode is on, update the data in the form
      if (model.adminMode == true){
        display.showKittyAdmin(model.getKitty(kittyId));
      };
    },

    // show admin mode
    showAdminPanel: function(){
      model.adminMode = true;
      display.showKittyAdmin(model.currentKitty);
    },

    // hide admin mode
    hideAdminPanel: function(){
      model.adminMode = false;
    },

    // update kitty info
    updateKitty: function(kittyId, name, image, clicks){
      // update the model
      model.updateKitty(kittyId, name, image, clicks)
      // update currentKitty
      model.currentKitty = model.getKitty(kittyId);
      model.currentKitty.id = kittyId
      // hide admin panel
      display.hideKittyAdmin();
      display.clearListener();
      // render the display
      display.showKitty(model.currentKitty, kittyId);
      // render the cat list
      kittyList.init();
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
    init: function(){
      // listen for clicks on the admin button
      $("#adminButton").click(function(){
        octopus.showAdminPanel();
        $(".adminForm").toggle();
      });
      // listen for clicks on save & cancel buttons
      $("#cancel").click(function(e){
        e.preventDefault();
        $(".adminForm").toggle();
      });
    },

    hideKittyAdmin: function(){
      $(".adminForm").toggle();
    },

    clearListener: function(){
        $("input[type=submit]").off();
    },

    showKittyAdmin: function(kitty){
      // show the kitty's info in the admin panel.
      var name = $("#name")
      var image = $("#image")
      var clicks = $("#clicks")

      name.val(kitty.name);
      image.val(kitty.image);
      clicks.val(kitty.clicks);
      // unique submit button for each kitty so that the event handlers aren't stacking.
      $("input[type=submit]").click(function(e){
        e.preventDefault();
        octopus.updateKitty(model.currentKitty.id, name.val(), image.val(), parseInt(clicks.val()) );
      })
    },

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

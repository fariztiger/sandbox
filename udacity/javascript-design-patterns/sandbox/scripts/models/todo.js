var todo = Backbone.model.extend({
  localStorage: true,
  initialize: function(){
    alert("yo! I'm a model.");
  },
    defaults: {
      text: "This is a new todo. Do something."
    }
});

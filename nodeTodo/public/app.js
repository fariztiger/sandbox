var app = angular.module("app", [])
  .controller("ctrl", function($scope, $http){
    $scope.showForm = false;
    $scope.showLogin = false;
    $scope.showRegisterForm = false;
    $scope.currentUser = null;
    $scope.newTodo = "";
    $scope.tempTodos = [];
    $scope.todos = [];
    $scope.showLoginForm = false;

    $scope.init = function () {
      this.getCurrentUser();
    };

    $scope.toggleLoginForm = function() {
      $scope.showLoginForm = (!$scope.LoginForm);
    };

    $scope.toggleRegisterForm = function() {
      $scope.showRegisterForm = (!$scope.showRegisterForm);
    };

    $scope.resetForm = function(){
      $scope.newTodo = "";
    };

    $scope.getCurrentUser = function(){
      $http({
        method: "POST",
        url: "/currentuser"
      }).then(function(success){
        $scope.currentUser = success.data;
        $scope.getTodos(); // only fetch todos if login is succesful.
      }, function (err) {
        console.log(err.data);
      });
    };

    $scope.submitLogin = function(){ // existing user
      $http({
        method: "POST",
        url: "/login",
        data: {
          name: this.name,
          password: this.password
        }
      }).then(function (success) {
        $scope.currentUser = success.data.name; // set current user
        $scope.saveTempTodos();
        $scope.showLogin = false; // hide login form
        $scope.getTodos(); // fetch todos
        // add user to the temp todo's
      }, function (err) {
        console.log(err.data)
        $scope.formErrors = err.data
      });
    };

    $scope.saveTempTodos = function(){
      // add user's name to each todo
      for (i = 0; i < $scope.tempTodos.length; i++){
        $scope.tempTodos[i].username = $scope.currentUser;
        $scope.todos.push($scope.tempTodos[i])
        $http({ // save to mongo
          method: "POST",
          url: "/api/todo",
          data: $scope.tempTodos[i]
        });
      };
    };

    $scope.submitRegistration = function(){
      $http({
        method: "POST",
        url: "/newuser",
        data: {
          name: this.name,
          password: this.password
        }
      }).then(function (success) {
        $scope.currentUser = success.data.name;
        $scope.saveTempTodos();
        $scope.showLogin = false;
        $scope.getTodos();
      }, function (err) {
        $scope.formErrors = err.data;
      });
    };

    $scope.getTodos = function(){
      $http({
        method: "GET",
        url: ("/api/todos/"),
      }).then(function(response){
        $scope.todos = response.data;
      });
    };

    $scope.addTodo = function(){
      var newTodo = { // create a new todo
        "username" : $scope.currentUser,
        "todo" : $scope.newTodo,
        isDone: false,
        hasAttachment: false
      };
      $scope.resetForm(); // clear the form

      // if user is new, add to temp todos
      if (!$scope.currentUser){
        $scope.tempTodos.push(newTodo);
        if ($scope.tempTodos.length > 3){ // show the login form after 3 todos
          $scope.showLogin = true;
        };
      } else {
        console.log("making a DB call")
        $scope.todos.push(newTodo);
        $http({ // if user's logged in, save the todo to the database.
          method: "POST",
          url: "/api/todo",
          data: newTodo
        }).then(function(success){
          console.log(success.data)
        }, function (err) {
          $scope.todoErrors = "Couldn't connect to DB... :("
          console.log(err.data)
        });
      };
    };

    $scope.deleteTodo = function(){
      // delete from app memory.
      $scope.todos.splice(this.$index,1);
      // delete from DB
      $http.delete("/api/todo", {
        headers: {'Content-Type': 'application/JSON'},
        data:{"id": this.item._id}
      }).then(function (success) {
        console.log(success.data);
      }, function (err) {
        $scope.todoErrors = "Couldn't connect to DB... :("
        console.log(err.data);
      });
    };
  });

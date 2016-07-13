var app = angular.module("app", [])
  .controller("ctrl", function($scope, $http){
    var self = this;

    $scope.showForm = false;
    $scope.showLogin = true;
    $scope.showLoginForm = false;
    $scope.showRegisterForm = false;
    $scope.currentUser = null
    $scope.newTodo = "";
    $scope.tempTodos = []

    $scope.init = function () {
      this.getCurrentUser();
    };

    $scope.toggleLoginForm = function() {
      $scope.showLoginForm = true;
    };

    $scope.toggleRegisterForm = function() {
      $scope.showRegisterForm = true;
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

    $scope.submitLogin = function(){
      $http({
        method: "POST",
        url: "/login",
        data: {
          name: this.name,
          password: this.password
        }
      }).then(function (success) {
        $scope.currentUser = success.data.name; // set current user
        $scope.showLogin = false; // hide login form
        $scope.saveTempTodos();
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
        $http({ // if user's logged in, save the todo to the database.
          method: "POST",
          url: "/api/todo",
          data: $scope.tempTodos[i]
        });
        console.log("saved tempTodos " + i);
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
        $scope.showLogin = false;
        $scope.getTodos();
        $scope.saveTempTodos();
        $scope.getTodos();
      }, function (err) {
        console.log(err.data)
        // display errors
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
      } else {
        $scope.todos.push(newTodo);
        $http({ // if user's logged in, save the todo to the database.
          method: "POST",
          url: "/api/todo",
          data: newTodo
        });
      };
      $scope.getTodos();// refresh todos
    };

    $scope.deleteTodo = function(){
      $http.delete("/api/todo", {headers: {'Content-Type': 'application/JSON'}, data:{"id": this.item._id}}); // delete from database. DIDNT specify the content type in this request. Spent an hour debugging.
      $scope.getTodos();// refresh todos
    };
  });

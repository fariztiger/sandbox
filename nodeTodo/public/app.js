var app = angular.module("app", [])
  .controller("ctrl", function($scope, $http){
    var self = this;

    $scope.hello = "hello world";
    $scope.newTodo = "";

    $scope.getTodos = function(){
      $http({
        method: "GET",
        url: "/api/todos/test"
      }).then(function(response){
        $scope.todos = response.data;
      });
    };

    $scope.showForm = false;

    $scope.toggleForm = function() {
      $scope.showForm = true;
    };

    $scope.resetForm = function(){
      $scope.newTodo = "";
      // $scope.todoForm.$setPristine();
    };

    $scope.addTodo = function(e){
      // create a new todo
      var newTodo = {
        "username" : "test",
        "todo" : $scope.newTodo,
        isDone: false,
        hasAttachment: false
      };

      // add it to scope.todos

      // clear the form
      $scope.resetForm();

      // save it to database.
      $http({
        method: "POST",
        url: "/api/todo",
        data: newTodo
      });

      // refresh todos
      $scope.getTodos();
    };

    $scope.deleteTodo = function(){
      // delete from database. DIDNT specify the content type in this request. Spent an hour debugging.
      $http.delete("/api/todo", {headers: {'Content-Type': 'application/JSON'}, data:{"id": this.item._id}});
      // refresh todos
      $scope.getTodos();
    };

  });

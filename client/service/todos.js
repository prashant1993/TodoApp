angular.module('myApp')

    // super simple service
    // each function returns a promise object
    .factory('todoService', function($http) {
        return {
            getRequest : function() {
                return $http.get('/todos');
            },
            postRequest : function(url,data) {
                return $http.post(url,data);
            },
            deleteRequest : function(id) {
                return $http.delete('/todos/' + id);
            },
          putRequest : function(id) {
                return $http.update('/todos/' + id);
            }
        };
    });
// todoService.getRequest("/todos/createTodo",$scope.user).then(function(data){
  //  todos = data.data;
  //  console.log(todos); // Data available here
  //  });
// todoService.postRequest("/todos/readTodo",$scope.user).then(function())
// todoService.deleteRequest("/todos/deleteTodo",$scope.user).then(function())
// todoService.putRequest("/todos/updateTodo",$scope.user).then(function())

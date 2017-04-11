
    app.controller('homeController', function($scope, $http , $auth) {
        $scope.newTodo = {};
        // when landing on the page, get all todos and show them
        $scope.readTodo = function() {
        $http.get('/todo/readTodo',{headers:{"x-access-token":$auth.getToken}})
                .success(function(data) {
                        $scope.todos = data;
                        console.log(data);
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
              };
              $scope.readTodo1 = function(t_id) {
              $http.get('/todo/readTodo/',+ t_id,{headers:{"x-access-token":$auth.getToken}})
                      .success(function(data) {
                              $scope.todos = data;
                              console.log(data);
                      })
                      .error(function(data) {
                              console.log('Error: ' + data);
                      });
                    };
        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
                $http.post('/todo/createTodo', $scope.newTodo , {headers:{"x-access-token":$auth.getToken}})
                        .success(function(data) {
                                $scope.newTodo = {}; // clear the form so our user is ready to enter another
                                $scope.todos = data;
                                // console.log(data);
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        // delete a todo after checking it
        $scope.deleteTodo = function(t_id) {
                $http.delete('/todo/deleteTodo/' + t_id, {headers:{"x-access-token":$auth.getToken}})
                        .success(function(data) {
                                $scope.todos = data;
                                console.log(data);
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };
        // update a todo after checking it
        $scope.updateTodo = function(t_id) {
                $http.put('/todo/updateTodo/' + t_id, {headers:{"x-access-token":$auth.getToken}})
                        .success(function(data) {
                                $scope.todos = data;
                                console.log(data);
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

    });

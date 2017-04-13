
    app.controller('homeController', function($scope, $http , $auth,$uibModal,$log) {
        $scope.newTodo = {};
        // when landing on the page, get all todos and show them
        $scope.readTodo = function() {
        $http.get('/todo/readTodo',{headers:{"x-access-token":$auth.getToken}})
                .then(function(data) {
                        $scope.todos = data.data;
                })
                .catch(function(data) {
                        console.log('Error: ' + data);
                });
              };
              $scope.readTodo1 = function(t_id) {
                console.log(t_id);
              // $http.get('/todo/readTodo/',+ t_id,{headers:{"x-access-token":$auth.getToken}})
              //         .then(function(data) {
              //                 $scope.todo = data.data;
              //                 console.log(data);
              //         })
              //         .catch(function(data) {
              //                 console.log('Error: ' + data);
              //         });
                    };
        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
                $http.post('/todo/createTodo', $scope.newTodo , {headers:{"x-access-token":$auth.getToken}})
                        .then(function(data) {
                                $scope.newTodo = {}; // clear the form so our user is ready to enter another
                                $scope.todos = data.data;
                                // console.log(data);
                        })
                        .catch(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        // delete a todo after checking it
        $scope.deleteTodo = function(t_id) {
                $http.delete('/todo/deleteTodo/' + t_id, {headers:{"x-access-token":$auth.getToken}})
                        .then(function(data) {
                                $scope.todos = data.data;
                                console.log(data);
                        })
                        .catch(function(data) {
                                console.log('Error: ' + data);
                        });
        };
        // update a todo after checking it
        $scope.updateTodo = function(t_id) {
                $http.put('/todo/updateTodo/' + t_id, {headers:{"x-access-token":$auth.getToken}})
                        .then(function(data) {
                                $scope.todos = data;
                                console.log(data);
                        })
                        .catch(function(data) {
                                console.log('Error: ' + data);
                        });
        };



        var $ctrl = this;
        $ctrl.animationsEnabled = true;
           $scope.loadModel = function (data) {
             var modalInstance = $uibModal.open({
               animation: $ctrl.animationsEnabled,
               templateUrl: 'template/popup.html',
               controller: function ($uibModalInstance,$scope) {
                 $scope.item=data;
                 this.cancel = function () {
                console.log('called');
                  $uibModalInstanceProvider.dismiss('cancel');
                };
              this.ok = function () {
                    $uibModalInstance.close({title:$ctrl.title,description:$ctrl.description});
              };
              this.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
            };
               },
               controllerAs: '$ctrl',
          });
          modalInstance.result.then(function (selectedItem) {
          },
          function () {
            $log.info('Modal dismissed at: ' + new Date());
          });
        };
        $ctrl.toggleAnimation = function () {
          $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        };
     });

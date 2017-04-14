
    app.controller('homeController', function($scope, $http , $auth,$uibModal,$log) {
        $scope.newTodo = {};
        function openNav() {
            document.getElementById("mySidenav").style.width = "200px";
            document.getElementById("main").style.marginLeft = "200px";
        }

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        }
        
        $(document).ready(function() {
            $('#list').click(function(event) {
                event.preventDefault();
                $('#products .item').addClass('list-group-item');
            });
            $('#grid').click(function(event) {
                event.preventDefault();
                $('#products .item').removeClass('list-group-item');
                $('#products .item').addClass('grid-group-item');
            });
        });

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
        // $scope.updateTodo = function(t_id) {
        //   console.log("heeeeeee");
        //         $http.post('/todo/updateTodo/' + t_id, {headers:{"x-access-token":$auth.getToken}})
        //                 .then(function(data) {
        //                         $scope.todos = data;
        //                         console.log(data);
        //                 })
        //                 .catch(function(data) {
        //                         console.log('Error: ' + data);
        //                 });
        // };


        var $ctrl = this;
        $ctrl.animationsEnabled = true;
           $scope.loadModel = function (data) {
             console.log(data);
             var modalInstance = $uibModal.open({
               animation: $ctrl.animationsEnabled,
               templateUrl: 'template/popup.html',
               controller: function ($uibModalInstance,$scope) {
                 $scope.todo = data;
                 this.cancel = function () {
                console.log('called');
                  $uibModalInstanceProvider.dismiss('cancel');
                };
              this.ok = function () {
                    $uibModalInstance.close({title:$ctrl.title , description:$ctrl.description});
              };

              // $scope.updateTodo = function(todo) {
              //   console.log("heeeeeee");
              //         $http.post('/todo/updateTodo/' + todo.t_id, {headers:{"x-access-token":$auth.getToken}})
              //                 .then(function(data) {
              //                         $scope.todo = data.data;
              //                         console.log(data);
              //                 })
              //                 .catch(function(data) {
              //                         console.log('Error: ' + data);
              //                 });
              // };

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

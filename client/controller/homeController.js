/**
 * home controller
 */
app.controller('homeController', function($scope, $http, $auth, $uibModal, $timeout, $log, $filter, $state) {
    $scope.newTodo = {};
    $scope.customFilter = function() {
        $scope.todos = $filter("currentDates")($scope.todos);
    };




    //drag and drop the cards
    $(".slides").sortable({
        placeholder: 'slide-placeholder',
        axis: "z",
        revert: 150,
        start: function(e, ui) {
            placeholderHeight = ui.item.outerHeight();
            //console.log(placeholderHeight);
            ui.placeholder.height(placeholderHeight + 15);
            $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);
        },
        change: function(event, ui) {
            ui.placeholder.stop().height(0).animate({
                height: ui.item.outerHeight() + 15
            }, 300);
            placeholderAnimatorHeight = parseInt($(".slide-placeholder-animator").attr("data-height"));
            $(".slide-placeholder-animator").stop().height(placeholderAnimatorHeight + 15).animate({
                height: 0
            }, 300, function() {
                $(this).remove();
                placeholderHeight = ui.item.outerHeight();
                $('<div class="slide-placeholder-animator" data-height="' + placeholderHeight + '"></div>').insertAfter(ui.placeholder);
            });
        },
        stop: function(e, ui) {
            $(".slide-placeholder-animator").remove();
        },
    });

    //sidebar toggle in and toggle out
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    //hover in hover out the content
    $scope.hoverIn = function() {
        this.hoverEdit = true;
    };
    $scope.hoverOut = function() {
        this.hoverEdit = false;
    };

    $scope.refresh = function() {
        $state.reload();
    };
    /**
     * @function readuser - get the user info
     * @param {String} user - contain user info
     * @return - success return the user profile else error message
     */

    //To read the user
    $scope.readuser = function() {
        $http.get('/userprofile', {
                headers: {
                    "x-access-token": $auth.getToken
                }
            })
            .then(function(data) {
                console.log(data);
                if (data.data.user.fb) {
                    $scope.user = data.data.user.fb;
                } else if (data.data.user.google) {
                    $scope.user = data.data.user.google;
                } else {
                    $scope.user = data.data.user.local;
                }
            })
            .catch(function(data) {
                console.log('Error: ' + data);
            });
    };

    /**
     * @function readTodo - get all todos
     * @param {String} todos - contain todos
     * @return - success status return the todos else error message
     */

    // when landing on the page, get all todos and show them
    $scope.readTodo = function() {
        $http.get('/todo/readTodo', {
                headers: {
                    "x-access-token": $auth.getToken
                }
            })
            .then(function(data) {
                console.log(data);
                $scope.todos = data.data;
                // console.log($scope.todos);
            })
            .catch(function(data) {
                console.log('Error: ' + data);
            });
    };


    /**
     * @function createTodo - create todo
     * @param {String} todos - contain todos
     * @return - success status return the todos else error message
     */

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function(todo) {
        console.log($scope.newTodo);
        $http.post('/todo/createTodo', $scope.newTodo, {
                headers: {
                    "x-access-token": $auth.getToken
                }
            })
            .then(function(data) {
                $scope.newTodo = {}; // clear the form so our user is ready to enter another
                $scope.todos = data.data;
                // console.log($scope.todos.msg);
                if ($scope.todos.msg) {
                  toastr.error('fill the title and description');
                }
                else {
                  toastr.success('ToDo created successfully');
                }
                // $state.reload();
                // console.log(data);
            })
            .catch(function(data) {
                console.log('Error: ' + data);
            });
    };

    /**
     * @function deleteTodo - delete todo
     * @param {String} todos - contain todos
     * @return - success status return  else error message
     */

    // delete a todo after checking it
    $scope.deleteTodo = function(t_id) {
        //delete call for delete todo
        $http.delete('/todo/deleteTodo/' + t_id, {
                headers: {
                    "x-access-token": $auth.getToken
                }
            })
            .then(function(data) {
                $scope.todos = data.data;
                $state.reload();
                toastr.success('ToDo deleted successfully');
                //console.log(data);
            })
            .catch(function(data) {
                console.log('Error: ' + data);
            });
    };

    /**
     * @function createReminder - create reminder
     * @param {String} remDate - contain reminder date
     */

    // create reminder
    $scope.createReminder = function(day, t_id) {
        console.log(day);
        console.log(t_id);
        var remDate = new Date();
        if (day == "today") {
            remDate.setHours(20, 0, 0);
            // console.log(remDate);
            this.updateReminder(remDate, t_id);
        } else if (day == "tomorrow") {
            remDate.setDate(remDate.getDate() + 1);
            remDate.setHours(8, 0, 0);
            // console.log(remDate);
            this.updateReminder(remDate, t_id);
        } else if (day == "nextweek") {
            remDate.setDate(remDate.getDate() + 7);
            // console.log(remDate);
            this.updateReminder(remDate, t_id);
        } else {
            // console.log(remDate);
            // console.log(day);
            this.updateReminder(day, t_id);
        }
    };

    /**
     * @function updateReminder - update reminder
     * @param {String} reminder - contain reminder date
     *@return success return updated reminder else error
     */

    // update reminder
    $scope.updateReminder = function(remDate, t_id) {
        console.log(t_id);
        console.log(remDate);
        $scope.reminder = {
            reminder: remDate
        };
        //post call for update reminder
        $http.post('/todo/updateTodo/' + t_id, $scope.reminder, {
                headers: {
                    "x-access-token": $auth.getToken
                }
            })
            .then(function(data) {
                $scope.todo = data.data;
                toastr.success('Reminder updated successfully');
                //console.log(data);
            })
            .catch(function(data) {
                console.log('Error: ' + data);
            });
    };
    /**
     * @function deleteReminder - delete reminder
     * @param {String} reminder - contain reminder as empty
     *@return success return deleted reminder
     */

    //  delete reminder
    $scope.deleteReminder = function(t_id) {
        // console.log(t_id);
        $scope.reminder = {
            reminder: ""
        };
        //post call for delete reminder
        $http.post('/todo/updateTodo/' + t_id, $scope.reminder, {
                headers: {
                    "x-access-token": $auth.getToken
                }
            })
            .then(function(data) {
                $scope.todo = data.data;
                toastr.success('Reminder deleted successfully');
                //console.log(data);
            })
            .catch(function(data) {
                console.log('Error: ' + data);
            });
    };

    //popup model to show and update data
    var $ctrl = this;
    $scope.loadModel = function(data) {
        console.log(data);
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            templateUrl: 'template/popup.html',
            controller: function($uibModalInstance, $scope, $state) {
                $scope.todo = data;
                this.cancel = function() {
                    $uibModalInstance.dismiss();
                };
                this.ok = function() {
                    $uibModalInstance.close({});
                };

                $(function($) {
                    $.fn.editableContent = function() {
                        return this.html().replace("<div>", "\n");
                    };
                });


                /**
                 * @function updateTodo - update the todo
                 * @param {String} todo - todo contain title and description
                 *@return success return the updated todos
                 */
                $scope.updateTodo = function(todo) {
                    var title = $('#modal-title').html();
                    // console.log(title);
                    var description = $('#modal-body').html();
                    // console.log(description);
                    try {
                        if (!title || !description) {
                            throw err;
                        } else {
                            $scope.todo = {
                                title: title,
                                description: description
                            };
                        }
                        $http.post('/todo/updateTodo/' + todo.t_id, $scope.todo, {
                                headers: {
                                    "x-access-token": $auth.getToken
                                }
                            })
                            .then(function(data) {
                                $state.reload();
                                $scope.todo = data.data;
                                toastr.success('Updated successfully');
                                // alert("successfully updated");
                                // console.log(data);
                            })
                            .catch(function(data) {
                              toastr.error(data);
                                console.log('Error: ' + data);
                            });
                    } catch (e) {
                        alert("please enter some text in the field");
                    }

                };

            },
            controllerAs: '$ctrl',
        });
    };
});

//filter for remove the html tags
app.filter("nl2br", function($filter) {
    return function(data) {
        if (!data) return data;
        return data.replace(/\n\r?/g, '<br />');
    };
});

//filter for display the todays todos
app.filter('currentDates', function() {
    return function(todos) {
        var data_date, filtered_list, i, today;
        filtered_list = [];
        i = 0;
        while (i < todos.length) {
            today = new Date();
            data_date = new Date(todos[i].reminder);
            data_date.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            if (today.getTime() == data_date.getTime()) {
                filtered_list.push(todos[i]);
                console.log(filtered_list);
            }
            i++;
        }
        return filtered_list;
    };
});

app.controller('homeController', function($scope, $http, $auth, $uibModal, $timeout, $log) {
        $scope.newTodo = {};
        // if (localStorage.getItem("access_token")) {
        //     try {
        //         var user_auth = JSON.parse(localStorage.getItem("access_token"));
        //         if (user_auth.provider === "fb") {
        //             $http.get("https://graph.facebook.com/v2.9/me?fields=name,email,photos,likes,location,cover&access_token=" + user_auth.token).then(function(data) {
        //                 console.log(data.data);
        //             });
        //         }
        //         //Google
        //         else {
        //             console.log(data.data);
        //         }
        //
        //     } catch (e) {
        //
        //     }
        // }
        // (function() {
        //   var makeNote;
        //
        //   makeNote = function() {
        //     var height;
        //     height = parseInt(100 + Math.random() * 500, 10);
        //     return '<div class="note"><div class="note-inner" style="height: ' + height + 'px"></div></div>';
        //   };
        //
        //   $(function() {
        //     var $note, $notes, i, x;
        //     $notes = $(".notes");
        //     for (x = i = 0; i <= 10; x = ++i) {if (window.CP.shouldStopExecution(1)){break;}
        //       $note = $(makeNote());
        //       $notes.append($note);
        //     }
        // window.CP.exitedLoop(1);
        //
        //     return $('.notes').isotope({
        //       itemSelector: '.note',
        //       layoutMode: 'masonry'
        //     });
        //   });
        //
        // }).call(this);
        //

        /*textarea*/
//   $scope.textAreaAdjust = function(o) {
//   o.style.height = "1px";
//   o.style.height = (25+o.scrollHeight)+"px";
// };
/*drag and drop the divs*/
        $(".slides").sortable({
     	            placeholder: 'slide-placeholder',
     	           axis: "z",
     	           revert: 150,

     	           start: function(e, ui){

     	               placeholderHeight = ui.item.outerHeight();
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


        //to read the user
        $scope.readuser = function() {
            $http.get('/userprofile', {
                    headers: {
                        "x-access-token": $auth.getToken
                    }
                })
                .then(function(data) {
                    console.log(data.data.user);
                    if (data.data.user.google) {
                        console.log(data.data.user.google);
                        $scope.user = data.data.user.google;
                        console.log($scope.user.profile);
                    }
                    else if (data.data.user.fb) {
                        console.log(data.data.user.fb);
                        $scope.user = data.data.user.fb;
                        console.log($scope.user.profile);
                    } else {
                        console.log(data.data.user.local);
                        $scope.user = data.data.user.local;
                        console.log($scope.user.profile);
                    }
                })
                .catch(function(data) {
                    console.log('Error: ' + data);
                });
        };

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
                    console.log($scope.todos);
                    console.log(todos.title);
                })
                .catch(function(data) {
                    console.log('Error: ' + data);
                });
        };


        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
          console.log($scope.newTodo);
            $http.post('/todo/createTodo', $scope.newTodo, {
                    headers: {
                        "x-access-token": $auth.getToken
                    }
                })
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
            $http.delete('/todo/deleteTodo/' + t_id, {
                    headers: {
                        "x-access-token": $auth.getToken
                    }
                })
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
        // $ctrl.animationsEnabled = true;
        $scope.loadModel = function(data) {
            console.log(data);
            var modalInstance = $uibModal.open({
                animation: $ctrl.animationsEnabled,
                templateUrl: 'template/popup.html',
                controller: function($uibModalInstance, $scope) {
                    $scope.todo = data;
                    //  this.cancel = function () {
                    // console.log('called');
                    //   $uibModalInstanceProvider.dismiss('cancel');
                    // };
                    this.cancel = function() {
                        $uibModalInstance.dismiss();
                    };
                    this.ok = function() {
                        $uibModalInstance.close({});
                    };
                    //
                    // console.log($uibModalInstance);
                    // $('#modal-body').on('keydown',function(e) {
                    //     // trap the return key being pressed
                    //
                    //       console.log('test',e.keyCode);
                    //     if (e.keyCode === 13) {
                    //       console.log('test');
                    //       // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
                    //       document.execCommand('insertHTML', false, '<br><br>');
                    //       // prevent the default behaviour of return key pressed
                    //       return false;
                    //     }
                    //   });
                    $(function($){
                   $.fn.editableContent = function() {
                   return this.html().replace("<div>","\n");
                     };
                 });
          //    $("#yourLink").click(function(e){
          //      var ksfksf = ($('#modal-title').editableContent());
          //      console.log(ksfksf);
          //     //    $('#result').html(($('#createtodo').editableContent()));
          //     //  console.log($('#createtodo'));
           //
          //  });

                    $scope.updateTodo = function(todo) {
                      // $("#myDiv").html($(result).text());

                         var title = $('#modal-title').html();
                         console.log(title);
                        var description = $('#modal-body').html();
                        console.log(description);
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
                                    $scope.todo = data.data;
                                    console.log(data);
                                })
                                .catch(function(data) {
                                    console.log('Error: ' + data);
                                });
                        } catch (e) {
                            alert("please enter some text in the field");
                        }

                    };

                },
                controllerAs: '$ctrl',
            });

            //     $uibModalInstance.result.then(function(selectedItem) {console.log("test");},
            //         function() {
            //             $log.info('Modal dismissed at: ' + new Date());
            //         });
        };

        // $ctrl.toggleAnimation = function() {
        //     $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
        // };
    }).filter("nl2br", function($filter) {
 return function(data) {
   if (!data) return data;
   return data.replace(/\n\r?/g, '<br />');
 };
});

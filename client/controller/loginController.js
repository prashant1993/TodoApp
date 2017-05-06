/**
 * login controller
 */
 /**
  * @function login - access the data after login
  * @param {String} user - user contain email and password
  * @return - success login status else error message
  */
app.controller('loginController', function($scope, $http, $state, $auth) {
    $scope.login = function() {
      //POST call for login page
        $auth.login($scope.user, {
                url: "/login",
                method: "POST"
            })
            .then(function(data) {
                // Redirect user here after a successful log in.
                console.log(data);
                if (data.data.status === true) {
                    $state.go("home");
                  toastr.success('Welcome to the BridgeLabz ToDo');
                } else {
                    toastr.error("Login fail,please fill the correct info ");
                }
            })
            .catch(function(error) {
                console.log(error.data.message);
                console.log(error.status);
            });
    };

});

/*using http service*/
// function successCallback(data, status, headers, config) {
//     // $scope.user = data;
//     console.log(data);
//     if (data.data.status === true)
//     $state.go("home");
// }
// function errorCallback(data, status, headers, config) {
//     // console.log(data);
//     console.log("hi");
//       $scope.error = data;
//       console.log(data);
// }

// $scope.login = function(){
// $http({
//     method : 'POST',
//     url : 'http://localhost:8088/login',
//     data:$scope.user
// }).then(successCallback, errorCallback);
// };
// });

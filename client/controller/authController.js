/**
 * auth controller
 */

app.controller('authController', function($scope, $location, $auth, $state) {
//get data from the url
var authData = $location.search();
    // console.log(authData);
    $auth.login(authData, {
            url: "/generateToken",
            method: "POST"
        })
        .then(function(data) {
            console.log(data);
            if (data.data.status){
                $state.go("home");
                  toastr.success('Welcome to the BridgeLabz ToDo');
                }
            else {
                $state.go("login");
                  toastr.error('Login fail ');
            }
        })
        .catch(function(error) {
            console.log(error.data);
            console.log(error.status);
        });
});

app.controller('authController' , function($scope,$location,$auth){
console.log("heeee");
var info = $location.url();
console.log(info);
var authData = {};
// $scope authData = info;
console.log(authData);
// $auth.login(authData,{url:"/login",method:"POST"})
//   .then(function(data) {
//     console.log(data);
//     // toastr.success('You have successfully signed in!');
//     if (data.data.status === true)
//     $state.go("home");
//     })
//   .catch(function(error) {
//     // toastr.error(error.data.message, error.status);
//     console.log(error.data.message);
//     console.log(error.status);
//   });

        // $http.post('/',info.access_token,info.user,info.email)
        //         .then(function(data) {
        //
        //         })
        //         .catch(function(data) {
        //                 console.log('Error: ' + data);
        //         });
});

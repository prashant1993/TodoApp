app.controller('signUpController' , function($scope,$http,$state,$auth){
console.log("heeeeee");



$scope.signUp = function() {
     $auth.signup($scope.user)
       .then(function(data) {
        //  $auth.setToken(response);
        //  $location.path('/');
        console.log(data.data.status);

        // if(response.data.status === true)
        $state.go("login");
        //  console.log("suuucess");
         console.log(data);
//         toastr.info('You have successfully created a new account and have been signed-in');
       })
       .catch(function(data) {
        //  toastr.error(response.data.message);
         console.log("fail");
         console.log(data.data.description);
       });
   };
});


/*using http service */
// $scope.signUp = function(){
// function successCallback(data, status, headers, config) {
//     // $scope.user = data;
//     console.log(data);
//     console.log("sign up success");
//       $state.go("login");
// }
// function errorCallback(data, status, headers, config) {
//     console.log(data);
//       $scope.error = data;
// }
// $http({
//     method : 'POST',
//     url : 'http://localhost:8088/signUp',
//     data:$scope.user
// }).then(successCallback, errorCallback);
// };
// });

app.controller('loginController' , function($scope,$http,$state,$auth){
console.log("heeeeee");

$scope.login = function() {
  $auth.login($scope.user)
    .then(function(data) {
      console.log(data);
      // toastr.success('You have successfully signed in!');
      if (data.data.status === true)
      $state.go("home");
      })
    .catch(function(error) {
      // toastr.error(error.data.message, error.status);
      console.log(error.data.message);
      console.log(error.status);
    });
};

$scope.loginProvider=function(provider){
  $http({"method":"get","url":"http://localhost:8088/auth/"+provider});
};
});




// $scope.authenticate = function(provider) {
//   $auth.authenticate(provider)
//     .then(function() {
//       toastr.success('You have successfully signed in with ' + provider + '!');
//       $location.path('/');
//     })
//     .catch(function(error) {
//       if (error.message) {
//         // Satellizer promise reject error.
//         toastr.error(error.message);
//       } else if (error.data) {
//         // HTTP response error from server
//         toastr.error(error.data.message, error.status);
//       } else {
//         toastr.error(error);
//       }
//     });
// };








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

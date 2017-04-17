app.controller('loginController' , function($scope,$http,$state,$auth){
console.log("heeeeee");

$scope.login = function() {
  $auth.login($scope.user,{url:"/login",method:"POST"})
    .then(function(data) {
      console.log(data);
      // if (data.data.status === true)
      $state.go("home");
      })
    .catch(function(error) {
      console.log(error.data.message);
      console.log(error.status);
    });
};

// $scope.loginProvider = function(provider){
//   $http({"method":"get","url":"http://localhost:8088/auth/"+provider});
// };
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

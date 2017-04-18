app.controller('loginController' , function($scope,$http,$state,$auth){
$scope.login = function() {
  $auth.login($scope.user,{url:"/login",method:"POST"})
    .then(function(data) {
      console.log(data);
      if (data.data.status === true)
      {
        $state.go("home");
    } else {
        alert("login fail,plz fill the correct info ");
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

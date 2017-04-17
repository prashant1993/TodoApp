app.controller('signUpController', function($scope, $http, $state, $auth) {
    $scope.signUp = function() {
        $auth.signup($scope.user, {
                url: "/signUp",
                method: "POST"
            })
            .then(function(data) {
                //  $location.path('/');
                console.log(data.data.status);
                // if(response.data.status === true)
                // alert("user register successfully");
                $state.go("login");
                //  console.log("suuucess");
                console.log(data);
            })
            .catch(function(data) {
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

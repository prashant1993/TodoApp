app.controller('googleController' , function($scope,$http,$state){
console.log("heeeeee");

function successCallback(data, status, headers, config) {
    // $scope.user = data;
    console.log(data);
    if (data.data.status === true)
    $state.go("home");
}
function errorCallback(data, status, headers, config) {
    console.log(data);
    console.log("hi");
      $scope.error = data;
      console.log(data);
}

$scope.googlelogin = function(){
$http({
    method : 'GET',
    url : 'http://localhost:8088/auth/google',
    data:$scope.user
}).then(successCallback, errorCallback);
};
});

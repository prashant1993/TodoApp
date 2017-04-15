 app.controller('fbController' , function($scope,$http,$state){
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

$scope.fblogin = function(){
$http({
    method : 'GET',
    url : 'http://localhost:8088/auth/facebook',
    data:$scope.user
}).then(successCallback, errorCallback);
};
});

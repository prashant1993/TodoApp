app.controller('authController', function($scope, $location, $auth, $state) {
    var info = $location.url();
    var temp = '{"';
    temp += info.substring(info.indexOf("?") + 1);

    temp = temp.split("=").join('":"');
    temp = temp.split("&").join('","');
    temp += '"}';
    // console.log(info.user);
    var authData = JSON.parse(temp);

    $auth.login(authData, {
            url: "/generateToken",
            method: "POST"
        })
        .then(function(data) {
            console.log(data);
            if (data.data.status)
                $state.go("home");
            else {
                $state.go("login");
            }
        })
        .catch(function(error) {
            console.log(error.data);
            console.log(error.status);
        });
});

// angular.module('app')
app.controller('logoutController', function($scope , $state , $auth) {
    if (!$auth.isAuthenticated()) { return; }
    $auth.logout()
      .then(function() {
        $state.go('login');
      });
});

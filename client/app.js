var app = angular.module('myApp', ['ui.router', 'satellizer', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.datetimepicker','moment-picker']);
app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

    /**
     * Helper auth functions
     */
    var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
        var deferred = $q.defer();
        console.log($auth.isAuthenticated());
        if ($auth.isAuthenticated()) {
            deferred.reject();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }];

    var loginRequired = ['$q', '$state', '$auth', function($q, $state, $auth) {
        var deferred = $q.defer();
        console.log($auth.isAuthenticated());
        if ($auth.isAuthenticated()) {
            deferred.resolve();
            // $state.go('/home');
        } else {
            $state.go('/login');
            // $location.path('/login');
        }
        return deferred.promise;
    }];


    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'template/login.html',
            controller: 'loginController',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .state('logout', {
            url: '/logout',
            template: null,
            controller: 'logoutController'
        })
        .state('signUp', {
            url: '/signUp',
            templateUrl: 'template/signUp.html',
            controller: 'signUpController',
            resolve: {
                skipIfLoggedIn: skipIfLoggedIn
            }
        })
        .state('home', {
            url: '/home',
            templateUrl: 'template/home.html',
            controller: 'homeController',
            resolve: {
                loginRequired: loginRequired
            }
        })
        .state('authProvider', {
            url: '/authProvider',
            template: 'template/home.html',
            controller: 'authController',
        });
});

var app = angular.module('myApp',['ui.router','satellizer','ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.config(function($stateProvider,$urlRouterProvider,$authProvider) {

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

    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/signup';

   $urlRouterProvider.otherwise('/login');
      $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : 'template/login.html',
        controller : 'loginController',
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
          url : '/signUp',
          templateUrl : 'template/signUp.html',
          controller : 'signUpController',
          resolve: {
                    skipIfLoggedIn: skipIfLoggedIn
                  }
        })
          .state('home', {
            url : '/home',
            templateUrl : 'template/home.html',
            controller : 'homeController',
            resolve: {
                      loginRequired: loginRequired
                    }
          });
          /**
    *  Satellizer config

   $authProvider.facebook({
     clientId: 'YOUR_GOOGLE_CLIENT_ID'
   });

   $authProvider.google({
     clientId: 'YOUR_GOOGLE_CLIENT_ID'
   });
*/
    });

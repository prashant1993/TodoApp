var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

var facebook = require('./facebook')(passport);  //configure facebook
var google   = require('./google')(passport);  //configure facebook

router.use('/signUp',require('./signUp'));
router.use('/login',require('./login'));

router.use("/authenticate",require('./authenticate'));

router.use("/todo/readTodo",require('./authenticate'),require("./todo/readTodo"));
router.use("/todo/createTodo",require('./authenticate'),require("./todo/createTodo"));
router.use("/todo/deleteTodo",require('./authenticate'),require("./todo/deleteTodo"));
router.use("/todo/updateTodo",require('./authenticate'),require("./todo/updateTodo"));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback

	// route for facebook authentication and login
	// different scopes while logging in
	router.get('/auth/facebook',
		passport.authenticate('facebook', { scope : 'email' }
	));

  // Facebook will redirect the user to this URL after approval.  Finish the
  // authentication process by attempting to obtain an access token.  If
  // access was granted, the user will be logged in.  Otherwise,
  // authentication has failed.

	router.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/',
			failureRedirect : '/'
		})
	);

	// router.get("/facebook/loginsuccess",function (req,res) {
	// 	res.send("successful");
	// });
	//
	// router.get("/facebook/loginfail",function (req,res) {
	// 	res.send("failure");
	// });

  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve redirecting
  //   the user to google.com.  After authorization, Google will redirect the user
  //   back to this application at /auth/google/callback
  router.get('/auth/google',
    passport.authenticate('google', { scope: ['email' , 'profile']}
  ));

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
    router.get('/auth/google/callback',
      passport.authenticate('google', {
				successRedirect : '/',
				failureRedirect : '/'
      }));

module.exports = router;

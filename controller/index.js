var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var facebook = require('./facebook')(passport); //configure facebook
var google = require('./google')(passport); //configure facebook
var users = require("../model/user");
router.use('/signUp', require('./signUp'));
router.use('/login', require('./login'));
router.use('/generateToken', require('./generateToken'));

router.use("/authenticate", require('./authenticate'));
router.use("/todo/readTodo", require('./authenticate'), require("./todo/readTodo"));
router.use("/todo/createTodo", require('./authenticate'), require("./todo/createTodo"));
router.use("/todo/deleteTodo", require('./authenticate'), require("./todo/deleteTodo"));
router.use("/todo", require('./authenticate'), require("./todo/updateTodo"));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback

// route for facebook authentication and login
// different scopes while logging in

router.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: 'email'
    }));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

// router.get('/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect: '/home',
//         failureRedirect: '/'
//     })
// );
//

router.get('/facebook/callback',facebookSignInCallback);


function facebookSignInCallback(req, res, next) {
    passport = req._passport.instance;
    passport.authenticate('facebook',function(err, user, info) {
			console.log("users::",user);
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.redirect('/#!/login');
        }
        // users.findOne({fb:{email: user._json.email}},function(err,user) {
            res.writeHead(302, {
                'Location': '/#!/authProvider?token=' + user.fb.access_token + '&id='+user._id+'&user=' + user.fb.id+'&email='+user.fb.email+'&provider='+'fb'
            });
            res.end();
        // });
    })(req,res,next);
}

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
// router.get('/auth/google/callback',
//     passport.authenticate('google', {
//         failureRedirect: '/'
//         successRedirect: '/',
//     }));

    router.get('/google/callback',googleSignInCallback);
    function googleSignInCallback(req, res, next) {
        passport = req._passport.instance;
        passport.authenticate('google',function(err, user, info) {
    			console.log("users::",user);
            if(err) {
                return next(err);
            }
            if(!user) {
                return res.redirect('/#!/login');
            }
            // users.findOne({fb:{email: user._json.email}},function(err,user) {
                res.writeHead(302, {
                    'Location': '/#!/authProvider?token=' + user.google.access_token + '&id='+user._id+'&user=' + user.google.id+'&email='+user.google.email+'&provider='+'google'
                });
                res.end();
            // });
        })(req,res,next);
    }
module.exports = router;

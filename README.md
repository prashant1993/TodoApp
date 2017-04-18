passport-facebook and passport-google
Build Coverage Quality Dependencies

Passport strategy for authenticating with Facebook and google using the OAuth 2.0 API.

This module lets you authenticate using Facebook and google in your Node.js applications. By plugging into Passport, Facebook and google authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.

Install
$ npm install passport-facebook
$ npm install passport-google

Usage

Create an Application

Before using passport-facebook and passport-google, you must register an application with Facebook and google. If you have not already done so, a new application can be created at Facebook Developers and Google Developers. Your application will be issued an app ID and app secret, which need to be provided to the strategy. You will also need to configure a redirect URI which matches the route in your application.

Configure Strategy

The Facebook authentication strategy and Google authentication strategy authenticates users using a Facebook account and Google accout and OAuth 2.0 tokens. The app ID and secret obtained when creating an application are supplied as options when creating the strategy. The strategy also requires a verify callback, which receives the access token and optional refresh token, as well as profile which contains the authenticated user's Facebook profile and Google profile. The verify callback must call cb providing a user to complete authentication.

facebook 
-------------------------------------
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8088/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
Authenticate Requests

Use passport.authenticate(), specifying the 'facebook' strategy, to authenticate requests.

For example, as route middleware in an Express application:

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


Google
----------------------------
passport.use(new GoogleStrategy({
    clientID: Google_APP_ID,
    clientSecret: Google_APP_SECRET,
    callbackURL: "http://localhost:8088/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
Authenticate Requests

Use passport.authenticate(), specifying the 'google' strategy, to authenticate requests.

For example, as route middleware in an Express application:

app.get('/auth/Google',
  passport.authenticate('google'));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
--------------------------------------------

var express = require('express'),
    router = express.Router(),
    jwt = require("jsonwebtoken"),
    config = require("../config/config"),
    SECRET = new config().secret;     // creating object of class config

// route middleware to verify a token
router.use(function(req, res, next) {
  console.log(req.isAuthenticated());
  console.log(req.user);

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  console.log(token);

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        // console.log();
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded.id;
        req.body.user_id = decoded.id;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});

module.exports = router;

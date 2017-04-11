var express    = require("express");
var app        =  express();
var config     =  require("../config/config");
var apiRoutes  = express.Router();
var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
var SECRET     = new config().secret;     // creating object of class config
// var SECRET     = config.secret;     // creating object of class config

var User = require("../model/signUp");

  apiRoutes.post('/',function(req,res){
    try {
    // console.log(req.body);

    req.checkBody("email", "Enter a valid email address.").isEmail();
    req.checkBody("password", "Enter a valid password").matches(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/);

    var errors = req.validationErrors();
      if (errors) {
          res.send(errors[0]);
      return;
      } else {
    User.findOne({
        "local.email":req.body.email,
        "local.password":req.body.password
      },function(err,user){
        try {
          if(err) throw err;
        if (!user) {
                  res.send({
                  status: false,
                  description: 'logging failed'
              });
           } else {
              // console.log(user);
              var userObj = user.toJSON();
              // console.log(userObj._id);
              // console.log(typeof userObj._id);
              // generate the token because we have the username and pasword matching
              var token = jwt.sign({id:userObj._id}, SECRET, { expiresIn: 1000*30 });
               //send the response to the caller with the access token and data
               res.send({
                   ObjectId:userObj._id,
                   status: true,
                   description: 'logging in Successfully',
                   token:token
                  });
                }
        } catch (e) {
          res.send({
          status: false,
          description: 'logging failed'
      });
    }
  });
  }
  } catch(e) {
        res.send({
          status: false,
          description: 'logging failed'
        });
  }
});
module.exports = apiRoutes;

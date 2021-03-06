/**
 * login controller
 */
var express = require("express");
var app = express();
var config = require("../config/config");
var apiRoutes = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var SECRET = new config().secret; // creating object of class config
var User = require("../model/user");

apiRoutes.post('/', function(req, res) {
    try {
      //email and password validation 
        req.checkBody("email", "Enter a valid email address.").isEmail();
        req.checkBody("password", "Enter a valid password").matches(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/);

        var errors = req.validationErrors();
        if (errors) {
            res.send(errors[0]);
            return;
        } else {
            User.findOne({
                "local.email": req.body.email,
                "local.password": req.body.password
            }, function(err, user) {
                try {
                    if (err) throw err;
                    console.log("user::",user);
                    if (!user) {
                        res.send({
                            status: false,
                            description: 'logging failed'
                        });
                    } else {
                        // console.log(user);
                        var userObj = user.toJSON();
                        // generate the token because we have the username and pasword matching
                        console.log(userObj.id);
                        var token = jwt.sign({
                            id: userObj.id
                        }, SECRET, {
                            expiresIn: 100*60
                        });
                        //send the response to the caller with the access token and data
                        res.send({
                            ObjectId: userObj.id,
                            status: true,
                            description: 'logging in Successfully',
                            token: token
                        });
                    }
                } catch (e) {
                  console.log(e);
                    res.send({
                        status: false,
                        description: 'logging failed'
                    });
                }
            });
        }
    } catch (e) {
        res.send({
            status: false,
            description: 'logging failed'
        });
    }
});
module.exports = apiRoutes;

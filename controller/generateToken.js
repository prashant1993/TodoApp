var express = require("express");
var apiRoutes = express.Router();
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require("../config/config");
var SECRET = new config().secret; // creating object of class config

apiRoutes.post('/', function(req, res) {
    try {
        // req.checkBody("token", "Enter a valid token.").isAlpha();
        req.checkBody("email", "Enter a valid email address.").isEmail();
        // req.checkBody("id", "Enter a valid id.").isInt();
        // req.checkBody("provider", "Enter a valid Provider.").isAlpha();
        var errors = req.validationErrors();
        if (errors) {
            res.status(401).send(errors[0]);
            return;
        } else {
          // console.log(req.body);
            var data = req.body;
            var token = jwt.sign({
                id: data.id,
                data: data
            }, SECRET, {
                expiresIn: 100 * 60
            });
            //send the response to the caller with the access token and data
            res.send({
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
module.exports = apiRoutes;

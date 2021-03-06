/**
 * signUp controller
 */

var Express = require("express");
var apiRoutes = Express.Router();
var User = require("../model/user");
var validator = require('express-validator');

/*POST to create new user */
apiRoutes.post("/", function(req, res) {
    try {
      // name email password and mobileno validation
        req.checkBody("name", "Enter Name.").notEmpty();
        req.checkBody("email", "Enter a valid email address.").isEmail();
        req.checkBody("password", "Enter a valid password").matches(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/);
        req.checkBody("mobileNo", "Enter a valid mob").matches(/^([7-9]{1}[0-9]{9})$/);
        var errors = req.validationErrors();
        if (errors) {
          throw errors;
            // res.send(errors[0]);
            // return;
        } else {
          //create new user
            var userData = new User({
                local: {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    mobileNo: req.body.mobileNo,
                    // profile:req.body.profilePic
                }
            });
            // save the created user
            userData.save(function(err) {
                try {
                    if (err) throw err;
                    console.log('User saved successfully');
                    res.send({
                        status: true,
                        description: "User saved successfully"
                    });
                } catch (e) {
                    res.send({
                        status: false,
                        description: "Email Aready Exist"
                    });
                }
            });
        }
    } catch (e) {
        console.log(e);
        res.send({
            status: false,
            description: "Please fill the correct information"
        });
    }
});

module.exports = apiRoutes;

/**
 * Userprofile controller
 */

var Express = require("express");
var apiRoutes = Express.Router();
var User = require("../model/user");

/*GET user detail */
apiRoutes.get("/", function(req, res) {
    // console.log(req);
    // console.log(req.decoded);
    User.findById(req.decoded, function(err, user) {
        try {
            if (err)
            {
              res.send({
                  status: false,
                  message: "not available"
            });
            }
            else {
              console.log("profile in ",user);
              // var userObj = user.toJSON();
              res.send({
                user:user,
                  status: true,
                  message: "available"
            });
          }
        } catch (e) {
            console.log(e);
            res.send({"message":"server error"});

        }
    });
});
module.exports = apiRoutes;

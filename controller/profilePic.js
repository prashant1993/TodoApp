var Express = require("express");
var apiRoutes = Express.Router();
var User = require("../model/user");
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

// var upload = multer().single('profilePic');

apiRoutes.post('/', upload.single('profilePic'),function(req, res) {
  console.log(req.file);
  console.log(req.body);
    // User.findById(req.decoded, function(err, user) {
    //     console.log(req.decoded);
    //     if (err) throw err;
    //     else {
    //
    //     }
    // });
});
module.exports = apiRoutes;

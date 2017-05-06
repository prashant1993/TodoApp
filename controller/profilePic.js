/**
 * profilePic controller
 */

var Express = require("express");
var apiRoutes = Express.Router();
var User = require("../model/user");
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});

var path = require('path');
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        var filename = path.parse(file.originalname);
        callback(null, filename.name + '-' + Date.now() + filename.ext);
    }
});

var upload = multer({
    storage: storage
}).single('profilePic');

/*POST to upload profile pic*/
apiRoutes.post('/', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
          res.send({
              status: false,
              message: "not upload"
        });
        }
        var updateData = {
            local: {}
        };
        console.log(req.file);
        if (req.file) {
            updateData.local.profile = JSON.stringify([{
                value: req.file.path
            }]);
        }
        console.log(req.decoded, updateData);
        var setValue = {};
        setValue.$set = updateData;
        User.findByIdAndUpdate(req.decoded, setValue, function(err, data) {
            if (err) {
                console.log("err");
            }
            console.log("done");
            console.log(data);
        });
        res.send({
            sucess: true,
            message: "image uploaded"
        });
    });
});

module.exports = apiRoutes;

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//establish connection

var db = 'mongodb://localhost/example';
 // 'secret': 'todoapp'
//connect to the database
module.exports = function () {
mongoose.connect(db);
};

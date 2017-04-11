var express    = require("express");
var app        =  express();
var bodyParser = require("body-parser");
// var mongoose   = require("mongoose"); //Indicate Node module and finding in current node_module
var morgan     = require('morgan');
// var User       = require("./model/signUp");//./ Indicate User module and finding in current folder
// var todo       = require("./model/Tododb");
var connect    = require("./config/db");
// var jwt        = require('jsonwebtoken'); // used to create, sign, and verify tokens
var passport = require('passport');
// var flash = require('connect-flash');
 // var config = require('./config/provider.json'); // get our config file
var validator = require('express-validator');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static("./client"));

app.use(passport.initialize());
app.use(passport.session());

app.use(validator());
 // Using the flash middleware provided by connect-flash to store messages in session
 // and displaying in templates
// var flash = require('connect-flash');
// app.use(flash());
app.use(require('./controller/index.js'));


//listen from the port
var port = process.env.PORT || 8088;
app.listen(port,function () {
  connect(); // connecting to DB
  console.log("listning from the port" +port);
});

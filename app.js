var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require('morgan');
var connect = require("./config/db");
var passport = require('passport');
var validator = require('express-validator');
var oauth = require('oauthio');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static("./client"));

app.use(passport.initialize());
app.use(passport.session());

app.use(validator());
app.use(require('./controller/index.js'));
 oauth.initialize('9fETs8kfHK7aK4Anf6rf2MhYJY4', 'F1lRLlAwr3tsfyDcCb1uNSef6J8');

//listen from the port
var port = process.env.PORT || 8088;
app.listen(port, function() {
    connect(); // connecting to DB
    console.log("listning from the port" + port);
});

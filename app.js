"use strict";

var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fs = require("fs");

var env = process.env.NODE_ENV || "development",
    appConfig = require("./app/configs/app")[env];

// Bootstrap db connection
// Connect to mongodb
var connect = function() {
    var options = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    };
    mongoose.connect(appConfig.db, options);
};
connect();

mongoose.connection.once("open", function() {
    //grid.gfs = grid(mongoose.connection.db, mongoose.mongo);
});

// Error handler
mongoose.connection.on("error", function(err) {
    console.log(err);
});

// Reconnect when closed
mongoose.connection.on("disconnected", function() {
    connect();
});

// Bootstrap models
var models_path = __dirname + "/app/models";
fs.readdirSync(models_path).forEach(function(file) {
    if (~file.indexOf(".js")) require(models_path + "/" + file);
});

var passportConfig = require("./app/configs/passport");
// bootstrap passport config
require("./app/configs/passport")(passportConfig);

var app = express();
// express settings
require("./app/configs/express")(app, appConfig);

// Bootstrap routes
var routes = require('./app/routes/index');
app.use('/', routes.basicRouter);
//app.use('/user', routes.userRouter);
app.use('/oauth', routes.oauthRouter);
app.use('/api', routes.apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    // as we use ng2 SPA, all uncaught url render to home page
    res.render('index', {
        user: JSON.stringify(req.user)
    });
});

module.exports = app;

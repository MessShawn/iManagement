"use strict";

var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
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
require("./app/configs/passport")(passport, passportConfig);

var app = express();
// express settings
require("./app/configs/express")(app, appConfig, passport);

// Bootstrap routes
var routes = require('./app/routes/index');
app.use('/', routes.basicRouter);
app.use('/user', routes.userRouter);
app.use('/oauth', routes.oauthRouter);
app.use('/api', routes.apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// assume "not found" in the error msgs
// is a 404. this is somewhat silly, but
// valid, you can do whatever you like, set
// properties, use instanceof etc.
app.use(function(err, req, res, next) {
    // treat as 404
    if (err.message &&
        (~err.message.indexOf('not found') ||
            (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next();
    }

    // log it
    // send emails if you want
    console.error(err.stack);

    // error page
    res.status(500).render('500', {
        error: err.stack
    });
});

// assume 404 since no middleware responded
app.use(function(req, res, next) {
    res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
    });
});

module.exports = app;

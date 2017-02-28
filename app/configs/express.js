'use strict';
/**
 * Module dependencies.
 */

var express = require('express'),
    flash = require('connect-flash'),
    winston = require('winston'),
    helpers = require('view-helpers'),
    pkg = require('../../package.json'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    i18n = require('i18next'),
    expressSession = require('express-session'),
    mongoStore = require('connect-mongo')(expressSession),
    compression = require('compression'),
    favicon = require('serve-favicon'),
    path = require('path'),
    morgan = require('morgan'),
    passport = require('passport');


var env = process.env.NODE_ENV || 'development';

module.exports = function(app, config) {
    app.set('showStackError', true);

    // should be placed before express.static
    app.use(compression({
        filter: function(req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    app.use(favicon(path.join(__dirname, '../../public', 'favicon.ico')));
    app.use(express.static(path.join(__dirname, '../../public')));

    // Logging
    // Use winston on production
    var logLevel;
    if (env == 'production') {
        logLevel = {
            stream: {
                write: function(message, encoding) {
                    winston.info(message);
                }
            }
        };
    } else {
        logLevel = 'dev';
    }
    // Don't log during tests
    //if (env !== 'test') app.use(express.logger(log))
    app.use(morgan(logLevel));

    // set views path, template engine and default layout
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');

    //app.configure(function () {
    // expose package.json to views
    app.use(function(req, res, next) {
        res.locals.pkg = pkg;
        next();
    });

    // cookieParser should be above session
    app.use(cookieParser());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // express/mongo session storage
    app.use(expressSession({
        secret: pkg.name,
        store: new mongoStore({
            url: config.db,
            collection: 'sessions'
        })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages - should be declared after sessions
    app.use(flash());

    // should be declared after session and flash
    app.use(helpers(pkg.name));
};

"use strict";

var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');

module.exports = function(config) {
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    // Passport oauth2.0 configuration
    require('./oauth2');
};

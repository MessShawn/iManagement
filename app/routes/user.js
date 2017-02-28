"use strict";

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    express = require('express'),
    router = express.Router();

module.exports = router;

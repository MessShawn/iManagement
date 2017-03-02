"use strict";

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    express = require('express'),
    router = express.Router(),
    requireAuthentication = require('../requireAuthentication');

router.all('*', requireAuthentication);

router.get('/userinfo', function (req, res) {
    res.json(req.user);
});

module.exports = router;

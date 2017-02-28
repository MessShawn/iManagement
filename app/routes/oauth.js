"use strict";

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    express = require('express'),
    router = express.Router(),
    oauth2 = require('../configs/oauth2');

router.get('/authorize', oauth2.authorization, oauth2.decision);
//router.post('/authorize/decision', oauth2.decision);
router.post('/token', oauth2.token);

module.exports = router;

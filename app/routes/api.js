"use strict";

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    express = require('express'),
    router = express.Router();

router.get('/userinfo', passport.authenticate('bearer', { session: false }), function (req, res) {
    res.json({ user_id: req.user.id, name: req.user.username, scope: req.authInfo.scope });
});

module.exports = router;

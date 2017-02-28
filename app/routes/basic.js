"use strict";

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    express = require('express'),
    router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
    console.log(req);
    res.render('index', {
        user: req.user
    });
});

router.get('/register', function(req, res) {
    res.render('register', {});
});

router.post('/register', function(req, res) {
    User.register(new User({
        username: req.body.username
    }), req.body.password, function(err, user) {
        if (err) {
            return res.render('register', {
                user: user
            });
        }

        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    });
});

router.get('/login', function(req, res) {
    res.render('login', {
        user: req.user
    });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
    delete req.session.returnTo;
    res.redirect(redirectTo);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res) {
    res.status(200).send("pong!");
});

module.exports = router;

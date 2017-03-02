var passport = require('passport');

module.exports = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    var redirectTo = req.session.returnTo;
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            if (redirectTo) {
                // for oauth
                return next(err);
            } else {
                // for app
                return res.json(err);
            }
        }
        if (!user) {
            if (redirectTo) {
                // for oauth
                return res.redirect('/login');
            } else {
                // for app
                return res.json('Not Authenticated.');
            }
        }
        req.login(user, function(err) {
            if (err) {
                if (redirectTo) {
                    // for oauth
                    return next(err);
                } else {
                    // for app
                    return res.json(err);
                }
            }

            if (redirectTo) {
                // for oauth
                return res.redirect(redirectTo);
            } else {
                next();
            }
        });
    })(req, res, next);
};

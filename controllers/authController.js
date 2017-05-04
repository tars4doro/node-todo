const models = require("../models");
const passport = require('passport');


exports.logout_get = (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};


exports.login_get = (req, res) => {
    res.render('login_page', { user : req.user, error : req.flash('error')});
};


exports.login_post = (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};


exports.register_post = (req, res, next) => {

    models.User.register(new models.User({ username : req.body.username }), req.body.password, (err, user) => {
        if (err) {
            console.log(err.message);
          return res.render('login_page', { error : err.message });
        }
       console.log(req.body.username);
        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
};

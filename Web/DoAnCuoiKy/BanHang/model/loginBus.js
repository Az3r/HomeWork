let express = require('express');
let router = express.Router();

let passport = require('passport');




class loginHandler
{
    loginUser(req, res, next)
    {
        passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login.html'});
    }

    logout(req, res, next)
    {
        req.logout();
        res.redirect('/');
    }
}

module.exports = loginHandler;

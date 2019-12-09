let express = require('express');
let router = express.Router();
let passport = require('passport');

class login_outBus
{
    showDashboard(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
        res.render('admin/dashboard', { title: 'Trang chủ',layout: 'admin', adminName: req.user.name });
    else
        res.redirect('/admin/login.html');
    }
    showlogin(req, res, next)
    {
        res.render('admin/login', { title: 'Đăng nhập' ,layout: 'admin_Login_Register_Layout'});
    }

    login(req, res, next)// need to take a look
    {
        passport.authenticate('local', {successRedirect: '/admin/dashboard.html', failureRedirect: '/admin/login.html'});
    }

    logout(req, res, next)
    {
        req.logout();
        res.redirect('/admin/login.html');
    }
}
module.exports = login_outBus;
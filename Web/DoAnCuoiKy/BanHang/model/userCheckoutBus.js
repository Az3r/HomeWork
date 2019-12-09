let express = require('express');
let router = express.Router();

let pool = require('../connection');

class CheckoutHandler
{
    showCheckout(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('user/checkout', { title: 'Thanh toán',layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất'});
        else
            res.redirect('/login.html');
    }
}

module.exports = CheckoutHandler;
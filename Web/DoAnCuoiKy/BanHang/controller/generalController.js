let express = require('express');
let router = express.Router();
let model = require('../model/productDetail_Bus');
let registerModel = require('../model/registerBus');
let loginModel = require('../model/loginBus');
let searchModel = require('../model/searchBus');

let bus = new model();
let registerBus = new registerModel();
let login_outBus = new loginModel();
let searchBus = new searchModel();

class gerneralControl
{
    home(req, res, next)
    {
        bus.showHome(req, res, next);
    }
    shop(req, res, next)
    {
        bus.showAll(req, res, next);
    }

    contact(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('user/contact', { title: 'Liên hệ',layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất'});
        else
            res.render('user/contact', { title: 'Liên hệ',layout: 'index', username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập'});
    }

    account(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('user/acount', { title: 'Tài khoản' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất'});
        else
            res.redirect('/login.html');
    }

    checkout(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('user/checkout', { title: 'Thanh toán',layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất'});
        else
            res.redirect('/login.html');
    }

    showLogin(req, res, next)
    {
        if(req.isAuthenticated())
            res.redirect('/');
        else
        {   
            res.render('user/login', { title: 'Đăng nhập' ,layout: 'index', username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập'});
        }
            
    }

    showRegister(req, res, next)
    {
        if(req.isAuthenticated())
            res.redirect('/');
        else
            res.render('user/register', { title: 'Đăng ký',layout: 'index', notification: "", username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập' });
    }

    forgetPassword(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('user/forgotpasswork', { title: 'Quên tài khoản /mật khẩu',layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất'});
        else
            res.render('user/forgotpasswork', { title: 'Quên tài khoản /mật khẩu',layout: 'index', username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập' });
    }

    success(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('user/success', { title: 'Đăng nhập thành công' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất'});
        else
            res.render('user/success', { title: 'Đăng nhập thành công' ,layout: 'index', username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập'});
    }

    history(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('user/history', { title: 'Lịch sử giao dịch' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất'});
        else
            res.redirect('/login.html');
    }

    dilevery(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('user/dilevery', { title: 'Tài khoản' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất'});
        else
            res.render('user/dilevery', { title: 'Tài khoản' ,layout: 'index', username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập'});
    }
    productDetail(req, res, next)
    {
        bus.showDetail(req, res, next);
    }
    logout(req, res, next)
    {
        login_outBus.logout(req, res, next);
    }

    searchProduct(req, res, next)
    {
        searchBus.search(req, res, next);
    }
    
    //for post register method
    register(req, res, next)
    {   
        registerBus.registerUser(req, res, next);
    }

    //for post login
    login(req, res, next)
    {
        login_outBus.loginUser(req, res, next);
    }
    
}

module.exports = gerneralControl;
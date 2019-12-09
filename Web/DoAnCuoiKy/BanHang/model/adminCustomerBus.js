let express = require('express');
let router = express.Router();

class customerBus
{
    viewAccount(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
            res.render('admin/user', { title: 'Khách hàng',layout: 'admin', adminName: req.user.name });
        else
            res.redirect('/admin/login.html');
    }

    customerDetail(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
            res.render('admin/edit-user', { title: 'Chi tiết người dùng',layout: 'admin', adminName: req.user.name });
        else
            res.redirect('/admin/login.html');
    }
}

module.exports = customerBus;
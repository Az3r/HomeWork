let express = require('express');
let router = express.Router();

class customerBus
{
    viewAccount(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('admin/user', { title: 'Khách hàng',layout: 'admin', adminName: req.user.name });
        else
        res.redirect('/admin/login.html');
    }

    customerDetail(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('admin/edit-user', { title: 'Chi tiết người dùng',layout: 'admin', adminName: req.user.name });
        else
            res.redirect('/admin/login.html');
    }
}

module.exports = customerBus;
let express = require('express');
let router = express.Router();

class orderBus
{
    allOrder(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
            res.render('admin/order', { title: 'Đơn hàng',layout: 'admin', adminName: req.user.name });
        else
            res.redirect('/admin/login.html');
    }

    orderDetail(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
            res.render('admin/edit-order', { title: 'Chi tiết đơn hàng',layout: 'admin', adminName: req.user.name });
        else
            res.redirect('/admin/login.html');
    }
}

module.exports = orderBus;
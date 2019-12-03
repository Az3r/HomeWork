let express = require('express');
let router = express.Router();

class productManage
{
    salesReport(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('admin/sales', { title: 'Chi tiết đơn hàng',layout: 'admin', adminName: req.user.name });
        else
            res.redirect('/admin/login.html');
    }

    topProduct(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('admin/top', { title: 'Chi tiết đơn hàng',layout: 'admin', adminName: req.user.name });
        else
            res.redirect('/admin/login.html');
    }
}

module.exports = productManage;
let express = require('express');
let router = express.Router();
let pool = require('../connection');

class orderBus
{
    allOrder(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
        {
            pool.query("SELECT DISTINCT userbill.id, name, fullname, tel, address, userbill.status, date FROM userbill INNER JOIN usertable ON userbill.userid = usertable.id INNER JOIN userhistory ON userbill.id = userhistory.userbill", function(err, result){
                if(err)
                    return console.log(err);
                    
                const itemInPage = 5;
                let page = (req.query.page) || 1;    
                const output = result;
                    
                let maxPage = parseInt(result.rowCount / itemInPage);
                    
                    
                maxPage =  parseInt(result.rowCount % itemInPage) == 0 ? maxPage : maxPage + 1;
      
                    
                output.rows = result.rows.slice(((page - 1) * itemInPage), ((page - 1) * itemInPage + itemInPage));
                const startIndex = (page - 1) * itemInPage + 1;

                
                res.render('admin/order', { title: 'Đơn hàng',layout: 'admin', adminName: req.user.name, danhsach:output, currentPage: page, limitPage: maxPage, i: startIndex });
            });
           
        }
        else
            res.redirect('/admin/login.html');
    }

    orderDetail(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
        {
            if(req.query.completeid)
            {
                pool.query("UPDATE userbill SET status = 'đã giao' WHERE id = " + req.query.completeid)
                .then((result) => {
                    res.redirect('/admin/order.html');
                });
            }
            else
            {
                pool.query("SELECT userbill.fullname, userbill.tel, userbill.address, userhistory.date,  userhistory.userbill, userhistory.number, product.price , product.id, product.name FROM userbill INNER JOIN userhistory ON userbill.id = userhistory.userbill INNER JOIN product ON userhistory.productid = product.id WHERE userbill.id = " + req.query.orderid)
                .then(result => 
                {
                    res.render('admin/edit-order', { title: 'Chi tiết đơn hàng',layout: 'admin', adminName: req.user.name, danhsach: result });
                });               
               
            }
        }
        else
            res.redirect('/admin/login.html');
    }
}

module.exports = orderBus;
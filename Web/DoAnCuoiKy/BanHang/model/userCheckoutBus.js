let express = require('express');
let router = express.Router();

let pool = require('../connection');

class CheckoutHandler
{
    showCheckout(req, res, next)
    {
        if(req.isAuthenticated())
        {
            if(req.user.status == "active")
            {
                const userID = req.user.id;

                pool.query("SELECT * FROM usercart INNER JOIN product ON usercart.productid = product.id WHERE usercart.userid = " + userID, function(err, result)
                {
                    if(err)
                        return console.log(err);
                    
                        let totalPrice = 0;
                        
                        for(let i = 0; i < result.rowCount; i++)                  
                            totalPrice += result.rows[i].number * result.rows[i].price;
                        

                    res.render('user/checkout', { title: 'Thanh toán',layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất',  danhsach: result, totalMoney: totalPrice});
                });
            }
            else if(req.user.status == "ban")
                res.redirect('/banned.html');
            else
                res.redirect('/active.html');
        }      
        else
            res.redirect('/login.html');
    }

    checkout(req, res ,next)
    {
        if(req.isAuthenticated())
        {
            pool.query("INSERT INTO userbill(userid, fullname, tel, address, status) VALUES(" + req.user.id + ", '" + req.body.fullname +"', '" + req.body.tel + "','" + req.body.address + "','đang giao')", function(err)
            {
                if(err)
                    return console.log(err);

                pool.query("SELECT MAX(id) FROM userbill", function(er, lastID)
                {
                    if(er)
                        return console.log(er);

                    const today = new Date();
                    let currentDay = today.getDate().toString() + '/' + (today.getMonth() + 1).toString() + '/' + today.getFullYear().toString();

                    pool.query("SELECT * FROM usercart WHERE userid = " + req.user.id, function(e, result)
                    {
                        for(let i = 0; i < result.rowCount; i++)
                        {
                            pool.query("INSERT INTO userhistory(userbill, userid, productid, number, date) VALUES (" + lastID.rows[0].max + "," + req.user.id + "," + result.rows[i].productid + "," + result.rows[i].number + ",'" + currentDay + "')", function(e)
                            {
                                if(e)
                                    return console.log(e);

                                pool.query("SELECT price, profit FROM product WHERE id = " + result.rows[i].productid)
                                .then((list) => 
                                {
                                    const newProfit = parseInt(list.rows[0].profit) + result.rows[i].number * parseInt(list.rows[0].price);

                                    pool.query("UPDATE product SET profit = " + newProfit + " WHERE id = " + result.rows[i].productid);
                                });

                                if(i == result.rowCount - 1)
                                {
                                    pool.query("DELETE FROM usercart WHERE userid = " + req.user.id, function(errr){
                                        if(errr)
                                            return console.log(errr);
                                            
                                        res.redirect('/history.html');
                                    })
                                }
                                   
                            });
                        }
                    });
                });
            });
        }      
        else
            res.redirect('/login.html');
    }

    showBill(req, res, next)
    {
        if(req.isAuthenticated())
        {
            if(req.user.status == "active")
            {
                const queryString = "SELECT * FROM userhistory INNER JOIN product ON userhistory.productid = product.id INNER JOIN userbill ON userhistory.userbill = userbill.id WHERE userbill.id = " + req.query.billid;
                pool.query(queryString, function(er, result)
                {
                    if(er)
                        return console.log(er);

                    let totalPrice = 0;
                        
                    for(let i = 0; i < result.rowCount; i++)                  
                        totalPrice += result.rows[i].number * result.rows[i].price;
                    
                    res.render('user/dilevery', { title: 'Hóa đơn' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất', danhsach: result, totalMoney: totalPrice});
                });
            }
            else if(req.user.status == "ban")
                res.redirect('/banned.html');
            else
                res.redirect('/active.html');
            
        }
        else
            res.redirect('/login.html');
    }

    removeBill(req, res, next)
    {
        if(req.isAuthenticated())
        {
            const billID = req.query.delete;

            pool.query("UPDATE userbill SET status='đã hủy' WHERE id = " + billID, function(er)
            {
                if(er)
                    return console.log(er);
                
                res.redirect('/history.html');
            });
            
        }
        else
            res.redirect('/login.html');
    }
}

module.exports = CheckoutHandler;
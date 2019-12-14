let express = require('express');
let router = express.Router();

let pool = require('../connection');

class addCart
{
    showCart(req, res, next)
    {
        if(req.isAuthenticated())
        {
            if(req.user.status == "active")
            {
                const userID = req.user.id;

                pool.query("SELECT * FROM usercart INNER JOIN product ON usercart.productid = product.id WHERE usercart.userid = " + userID, function(err, result){
                    if(err)
                        return console.log(err);
                    
                    res.render('user/Cart', { title: 'Giỏ hàng', layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất', danhsach: result});
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

    addProductToCart(req, res, next)
    {
        if(req.isAuthenticated())
        {
            const productID = req.query.id;
            const userID = req.user.id;
            
            let amount = 1;

            pool.query("SELECT * FROM usercart WHERE (userid = " + userID + " AND productID = " + productID + ")", function(error, result)
            {
                if(error)
                    return console.log(error);
                
                if(result.rowCount < 1) // tuc la san pham chua ton tai => them no vo
                {
                    pool.query('INSERT INTO usercart (userid, productid, number) VALUES (' + userID + ',' + productID + ',' + amount + ')', function(err)
                    {
                        if(err)
                            return console.log('error in add cart' + err);
        
                        res.redirect('/' + productID);
                    });
                }
                else // nguoc lai la co san pham nay roi thi tang no len thoi, xong
                {
                    amount = parseInt(result.rows[0].number) + 1;
                    pool.query("UPDATE usercart SET number = " + amount + "WHERE (userid = " + userID + " AND productID = " + productID + ")", function(e)
                    {
                        if(e)
                            return console.log(e);

                        res.redirect('/' + productID);
                    });
                }
            });

           
        }
        else
            res.redirect('/login.html');
        
    }

    removeProductFromCart(req, res, next)
    {
        if(req.isAuthenticated())
        {
            const userID = req.user.id;
            const productID = req.query.id;

            pool.query("DELETE FROM usercart WHERE ( userid = " + userID + "AND productid = " + productID + ")", function(err){
                if(err)
                    return console.log(err);
                
                res.redirect('/cart.html');
            });
        }
        else
            res.redirect('/login.html');
    }

    updateCart(req, res, next)
    {
        const userID = req.user.id;
        
        pool.query("SELECT * FROM usercart WHERE userid = " + userID, function(err, result){
            for(let i = 0; i < result.rowCount; i++)
            {
                const accessName = 'quantity' + result.rows[i].productid;
                const newValue = parseInt(req.body[accessName]);

                pool.query("UPDATE usercart SET number = " + newValue + " WHERE userid = " + userID + " AND productid = " + result.rows[i].productid, function(e){
                    if(e)
                        return console.log(e);

                    if(i == result.rowCount - 1)
                        res.redirect('/cart.html');
                    
                    
                });
            }
                   
        });
        
    }
}

module.exports = addCart;
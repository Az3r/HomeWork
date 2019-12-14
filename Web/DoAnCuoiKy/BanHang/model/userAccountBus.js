let express = require('express');
let router = express.Router();

let pool = require('../connection');
let bcrypt = require('bcryptjs');
let mailHandler = require('../model/sendEmail');

class userAccountBus
{
    showHistory(req, res, next)
    {
        if(req.isAuthenticated())
        {
            if(req.user.status == "active")
            {
                const queryString = "SELECT * FROM userhistory INNER JOIN product ON userhistory.productid = product.id INNER JOIN userbill ON userhistory.userbill = userbill.id WHERE userhistory.userid = " + req.user.id + " ORDER BY userhistory.userbill DESC";
                pool.query(queryString, function(er, result)
                {
                    if(er)
                        return console.log(er);
                    
                    res.render('user/history', { title: 'Lịch sử giao dịch' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất', danhsach: result});
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

    showUserInfo(req, res, next)
    {
        if(req.isAuthenticated())
        {
            if(req.user.status == "active")            
                res.render('user/acount', { title: 'Tài khoản' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất', account: req.user});         
            else if(req.user.status == "ban")
                res.redirect('/banned.html');
            else
                res.redirect('/active.html');
        }
         else
            res.redirect('/login.html');
    }

    showEditAccountForm(req, res ,next)
    {
        if(req.isAuthenticated())
        {
            if(req.user.status == "active")
                res.render('user/edit-account', { title: 'Tài khoản' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất', account: req.user, mess:''});               
            else if(req.user.status == "ban")
                res.redirect('/banned.html');
            else
                res.redirect('/active.html');
        }   
        else
            res.redirect('/login.html');
    }

    submitEditInfo(req, res, next)
    {
        const userID = req.user.id;

        pool.query("SELECT * FROM usertable WHERE (username = '" + req.body.newusername + "' OR email = '" + req.body.newemail + "' )", function(error, checkList){
            if(error)
                return console.log(error);

            if(checkList.rowCount > 0)
                res.render('user/edit-account', { title: 'Tài khoản' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất', account: req.user, mess:'username hoặc email đã tồn tại'});  
            else
            {
                pool.query("SELECT * FROM usertable WHERE id = " + userID, function(err, result)
                {
                    if(err)
                        return console.log(err);

                    const oldpass = (req.body.oldpass == "") ? result.rows[0].password : req.body.oldpass;
                    const newname = (req.body.newname == "") ? result.rows[0].name: req.body.newname;
                    const newlastname = (req.body.newlastname == "") ? result.rows[0].lastname : req.body.newlastname;
                    const newemail = (req.body.newemail == "") ? result.rows[0].email : req.body.newemail;
                    const newusername = (req.body.newusername == "") ? result.rows[0].username : req.body.newusername;
                    const newpass = req.body.newpass;
                    const newpass_confrim = req.body.newpass_confrim;
        
                        if(newpass === "" || (newpass !== "" && oldpass == result.rows[0].password))
                        {
                            if(newpass === "" || (newpass !== "" && newpass.length >= 6))
                            {
                                if(newpass == newpass_confrim)
                                {
                                    bcrypt.genSalt(10, (er, salt) => {
                                        if(er)
                                            return console.log(er);

                                        bcrypt.hash(newpass, salt, (eror, lastpass) => 
                                        {
                                            if(eror)
                                                return console.log(eror);
                      
                                            let queryString = "UPDATE usertable SET username = '" + newusername + "', email = '" + newemail + "', name = '" + newname + "', lastname = '" + newlastname;
                                    
                                            if(newpass !== "")
                                                queryString +=  "', password = '" + lastpass;
                                    
                                            queryString += "' WHERE id = " + userID;
                                            pool.query(queryString, function(re)
                                            {
                                            if(re)                      
                                                return console.log('error in update acc', re);  
                      
                                            res.redirect('/acount.html');
                                            });                                               
                                        });
                                    });
                                }
                                else
                                    res.render('user/edit-account', { title: 'Tài khoản' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất', account: req.user, mess:'Nhập lại mật khẩu mới không trùng khớp'});               
                            }
                            else
                                res.render('user/edit-account', { title: 'Tài khoản' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất', account: req.user, mess:'Mật khẩu dài ít nhất 6 kí tự'});               
                        }
                        else
                            res.render('user/edit-account', { title: 'Tài khoản' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất', account: req.user, mess:'Mật khẩu hiện tại không đúng'});               
                                          
                });
            }             
        });

       
    }

    showActivePage(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('user/activeAccount', { title: 'Kích hoạt tài khoản',layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất'});
        else
            res.redirect('/login.html');
    }

    activeAccount(req, res, next)
    {
        if(req.body.code == req.user.activecode)
        {
            pool.query("UPDATE usertable SET status = 'active' WHERE id = " + req.user.id, function(e)
            {
                if(e)
                    return console.log(e);
                
                res.redirect('/');
            });
        }
        else
            res.redirect('/active.html');
    }

    showBannedPage(req, res, next)
    {
        if(req.isAuthenticated())
            res.render('user/banned', { title: 'Tài khoản vô hiệu hóa :( ',layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất'});
        else
            res.redirect('/login.html');
    }

    showForgetPasswordPage(req, res, next)
    {
        res.render('user/forgotpasswork', { title: 'Quên tài khoản /mật khẩu',layout: 'index', username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập' });
    }

    forgetPasswordProcess(req, res, next)
    {
        pool.query("SELECT * FROM usertable WHERE username = '" + req.body.uname + "'", function(err, result){
            if(err)
                return console.log(err)
            if(result.rowCount < 1)
                res.redirect('/register.html');
            else if(result.rows[0].status == "ban")
                res.redirect('/banned.html');         
            else
            {
                bcrypt.genSalt(10, (er, salt) => {
                    if(er)
                      return console.log(er);
      
                    bcrypt.hash(result.rows[0].activecode, salt, (eror, newpass) => 
                    {
                      if(eror)
                        return console.log(eror);                    
      
                      pool.query("UPDATE usertable SET password = '" + newpass + "' WHERE id = " +  result.rows[0].id, function(e)
                      {
                        if(e)                      
                          return console.log('error in insert db', e);  

                        mailHandler(result.rows[0].email, result.rows[0].activecode, 0);
                        res.redirect('/login.html');
                      });   
                              
                    });
                  });
            }
        });
    }

}

module.exports = userAccountBus;
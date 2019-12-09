let express = require('express');
let router = express.Router();

let bycrypt = require('bcryptjs');

let pool = require('../connection');

class adminRegisterBus
{
    showRegister(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
            res.render('admin/register', { title: 'Đăng kí' ,layout: 'admin', notification: '', adminName: req.user.name});
        else
        res.redirect('/admin/login.html');
    }

    registerAccount(req, res, next)
    {
        //res.redirect('/admin/dashboard.html');
        if(req.body.password.length < 6 )
            res.render('admin/register', { title: 'Đăng kí' ,layout: 'admin', notification: 'Mật khẩu dài ít nhất 6 kí tự', adminName: req.user.name});
        
        if(req.body.password !== req.body.password_confirm)
            res.render('admin/register', { title: 'Đăng kí' ,layout: 'admin', notification: 'Mật khẩu nhập lại không đúng', adminName: req.user.name});

        pool.query("SELECT * FROM usertable WHERE type = 2", function(error, rootAdmin){
            if(error)
                return console.log(error);
            if(rootAdmin.rows[0].password !== req.body.root_admin_pass)       
                res.render('admin/register', { title: 'Đăng kí' ,layout: 'admin', notification: 'Mật khẩu xác thực không đúng', adminName: req.user.name});
            else
            {
                pool.query("SELECT * FROM usertable WHERE username = '" + req.body.username +"'", function(err, result){
                    if(err)
                        return console.log(err);
        
                    if(result.rowCount > 0)               
                        res.render('admin/register', { title: 'Đăng kí' ,layout: 'admin', notification: 'Username đã tồn tại', adminName: req.user.name});
                    else
                    {
                        pool.query("SELECT * FROM usertable WHERE email = '" + req.body.email +"'", function(err2, result)
                        {
                            if(err2)
                                return console.log(err2);
                
                            if(result.rowCount > 0)
                                res.render('admin/register', { title: 'Đăng kí' ,layout: 'admin', notification: 'email đã được sử dụng', adminName: req.user.name});
                            else
                            {
                                bycrypt.genSalt(10, (er, salt)=>{
                                    if(er)
                                        return console.log(er);
                        
                                    bycrypt.hash(req.body.password, salt, (er2, newpass)=>{
                                        if(er2)
                                            return console.log(er2);
                                        
                                        pool.query("INSERT INTO usertable (username, email ,password, name, lastname, type, status) VALUES ('" + req.body.username + "','" + req.body.email + "','" + newpass + "','" + req.body.firstName + "','" + req.body.lastName  + "', 1, 'active')", function(e)
                                        {
                                            if(e)                      
                                                return console.log('error in insert db', e);  
                        
                                          res.redirect('/admin/dashboard.html');
                                        });   
                                    });    
                                });
                        
                            }
                               
                            
                        });
                    }  
                    
                });
            }   
            
        }); 

        
    }
        

        
}

module.exports = adminRegisterBus;
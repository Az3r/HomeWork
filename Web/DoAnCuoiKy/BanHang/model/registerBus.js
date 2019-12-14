let express = require('express');
let router = express.Router();
let bycrypt = require('bcryptjs');
let mailHandler = require('../model/sendEmail');
let pool = require('../connection');
let random = require('./activeCodeGenerate');

class registerHandler
{  
  
  registerUser(req, res, next)
  {
    if(req.body.password.length < 6)
      res.render('user/register', { title: 'Đăng ký',layout: 'index', notification: "Mật khẩu dài ít nhất 6 kí tự", username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập' });

    if(req.body.password !== req.body.password_confirm) 
      res.render('user/register', { title: 'Đăng ký',layout: 'index', notification: "Mật khẩu nhập lại không khớp", username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập' });       

    pool.query("SELECT * FROM usertable WHERE username = '" + req.body.username + "'", function(error, result1)
    {
      if(error){
        return console.log('error in check username',  error);
      }

      if(result1.rowCount > 0){
        res.render('user/register', { title: 'Đăng ký',layout: 'index', notification: "Username đã tồn tại" , username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập'});
      }
      else
      {
        pool.query("SELECT * FROM usertable WHERE email ='" + req.body.email +"'", function(err, result2){

          if(err)         
            return console.log('error in check email',  err);
          
          if(result2.rowCount > 0)
            res.render('user/register', { title: 'Đăng ký',layout: 'index', notification: "Email đã được sử dụng" , username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập'});          
          else
          {
            bycrypt.genSalt(10, (er, salt) => {
              if(er)
                return console.log(er);

              bycrypt.hash(req.body.password, salt, (eror, newpass) => 
              {
                if(eror)
                  return console.log(e);

                const acticeCode = random();                
               

                pool.query("INSERT INTO usertable (username, email ,password, name, lastname, type, status, activecode) VALUES ('" + req.body.username + "','" + req.body.email + "','" + newpass + "','" + req.body.name + "','" + req.body.lastname  + "', 0, 'nonactive','" + acticeCode +"')", function(e)
                {
                  if(e)                      
                    return console.log('error in insert db', e);  

                  mailHandler(req.body.email, acticeCode, 1);
                  res.redirect('/success.html');
                });   
                        
              });
            });
                    
            }
        });
      }
    });   
  }
}

module.exports = registerHandler;
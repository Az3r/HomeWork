let express = require('express');
let router = express.Router();

let pool = require('../connection');

class cataloryBus
{
    showProduct(req, res, next, value)
    {
        pool.connect(function(err, client, done) {
            if(err){
              return console.log('Error fetching client from pool')
            }   
            const stringQuery = "SELECT * FROM product WHERE catalog = '" + value + "'";    
            client.query(stringQuery, function(err, result){       
              done();       
              if(err){
                res.end();
                return console.log('Error runing query', err);
              }  
              if(req.isAuthenticated())
                res.render('user/catolory', { title: value ,layout: 'index', danhsach:result, username: req.user.name, link: '../logout.html', status: 'Đăng xuất'});
              else
                res.render('user/catolory', { title: value ,layout: 'index', danhsach:result, username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập'});            
            });
          });  
    }
}

module.exports = cataloryBus;
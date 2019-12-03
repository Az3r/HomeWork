let express = require('express');
let router = express.Router();

let pool = require('../connection');

class productDetail
{
    showDetail(req, res, next)
    {
        pool.connect(function(err, client, done) {
            if(err){
              return console.log('Error fetching client from pool')
            }
            let temp;
            client.query("SELECT * FROM product ", function(err1, listProc)
            {
              if(err1)
              {
                res.end();
                return console.log('Error runing query', err1);
              }
              temp = listProc;
            });
            client.query('SELECT * FROM product WHERE id = ' + req.params.id, function(err, result){        
              done();        
              if(err){
                res.end();
                return console.log('Error runing query', err);
                }
                if(req.isAuthenticated())               
                  res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất' ,danhsach:result, splienquan: temp});  
                else    
                  res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', username: 'Tài khoản' , username: 'Tài khoản' ,link: '../logout.html', status: 'Đăng xuất',danhsach:result, splienquan: temp});       
            });
          });   
    }

    showAll(req, res, next)
    {
        pool.connect(function(err, client, done) {
            if(err){
              return console.log('Error fetching client from pool')
            }
        
            client.query('SELECT * FROM product', function(err, result){
        
              done();
        
              if(err){
                res.end();
                return console.log('Error runing query', err);
              }  
              if(req.isAuthenticated())                              
                res.render('user/shop', { title: 'Cửa hàng',layout: 'index', danhsach:result, username: req.user.name, link: '../logout.html', status: 'Đăng xuất' });
              else                     
                res.render('user/shop', { title: 'Cửa hàng',layout: 'index', danhsach:result , username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập'});
              
            });
          });
    }

    showHome(req, res, next)
    {
        pool.connect(function(err, client, done) {
            if(err){
              return console.log('Error fetching client from pool')
            }
        
            client.query("SELECT * FROM product ", function(err, result)
            {
              done();
              if(err)
              {
                res.end();
                return console.log('Error runing query sp_ua_thich', err);
              }  
              if(req.isAuthenticated())                              
                res.render('user/home', { title: 'Trang chủ',layout: 'index', username: req.user.name,  link: '../logout.html', status: 'Đăng xuất', danhsach:result});
              else    
                res.render('user/home', { title: 'Trang chủ',layout: 'index', username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập' , danhsach:result});
              
            });
        });   
    }
}

module.exports = productDetail;
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
            client.query(stringQuery, function(err, result)
            {       
              done();       
              if(err){
                res.end();
                return console.log('Error runing query', err);
              }  

              const itemInPage = 9;
              let page = (req.query.page) || 1;

            
              let maxPage = parseInt(result.rowCount / itemInPage);

              let fullURL = '/catolory' + req.url;

              if(!fullURL.includes('?'))
                fullURL += '?';
              if(fullURL.includes('&page='))
              {
                const tokens = fullURL.split('&page=');
                fullURL = tokens[0];
              }
          
              const output = result;
              maxPage =  parseInt(result.rowCount % itemInPage) == 0 ? maxPage : maxPage + 1;

              output.rows = result.rows.slice(((page - 1) * itemInPage), ((page - 1) * itemInPage + itemInPage));

              if(req.isAuthenticated())
              {
                if(req.user.status == "active")
                  res.render('user/catolory', { title: value ,layout: 'index', danhsach:result, username: req.user.name, link: '../logout.html', status: 'Đăng xuất', fullreq: fullURL  ,currentPage: page, limitPage: maxPage});
                else if(req.user.status == "ban")
                  res.redirect('/banned.html');
                else
                  res.redirect('/active.html');
              }
              else
                res.render('user/catolory', { title: value ,layout: 'index', danhsach:result, username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập', fullreq: fullURL  ,currentPage: page, limitPage: maxPage});            
            });
          });  
    }
}

module.exports = cataloryBus;
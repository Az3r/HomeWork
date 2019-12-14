let express = require('express');
let router = express.Router();

let model = require('./toolQueryForShopPage');
let pool = require('../connection');

let tool = new model();


class productDetail
{
   

    showDetail(req, res, next)
    {
        pool.connect(function(err, client, done) {
            if(err)
              return console.log('Error fetching client from pool')
            
            let temp;
            client.query("SELECT * FROM product ", function(err1, listProc)
            {
              if(err1)
                return console.log('Error runing query', err1);


              temp = listProc;
            });
            client.query('SELECT * FROM product WHERE id = ' + req.params.id, function(err, result){        
              done();        
              if(err)
                return console.log('Error runing query', err);

                
                client.query('SELECT * FROM comment WHERE productid = ' + req.params.id, function(e, cmt)
                {
                  if(e)
                    return console.log('error load comment ', e);

                  const newViewValue = parseInt(result.rows[0].view) + 1;
                  client.query('UPDATE product SET view = ' + newViewValue + ' WHERE id = ' + result.rows[0].id);
  
                  const commentInPage = 4;
                  let page = (req.query.page) || 1;
                  const output = cmt;
                  let maxPage = parseInt(cmt.rowCount / commentInPage);
              

                  maxPage =  parseInt(cmt.rowCount % commentInPage) == 0 ? maxPage : maxPage + 1;
                  
                  output.rows = cmt.rows.slice(((page - 1) * commentInPage), ((page - 1) * commentInPage + commentInPage));


                  if(req.isAuthenticated())      
                  {         
                    if(req.user.status == "active")
                      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', username: req.user.name, link: '../logout.html', status: 'Đăng xuất' ,danhsach:result, splienquan: temp, comment: cmt, currentPage: page, limitPage: maxPage, unameauto: req.user.username, emailauto: req.user.email});  
                    else
                      res.redirect('/active.html');
                  }
                  else    
                    res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', username: 'Tài khoản' ,link: '../login.html', status: 'Đăng nhập',danhsach:result, splienquan: temp, comment: cmt, currentPage: page, limitPage: maxPage , unameauto: '', emailauto: ''});       
                });
               
            });
          });   
    }

    showAll(req, res, next)
    {
        pool.connect(function(err, client, done) {
            if(err){
              return console.log('Error fetching client from pool')
            }

            let fullURL = req.url;

            if(!fullURL.includes('?'))
              fullURL += '?';
            if(fullURL.includes('&page='))
            {
              const tokens = fullURL.split('&page=');
              fullURL = tokens[0];
              fullURL += tokens[1].slice(1);
            }

            const itemInPage = 9
            let page = (req.query.page) || 1;
            
            let deleteIndex = req.query.delete;

            let product = req.query.product;
            let brand = req.query.brand;
            let catalog = req.query.catalog;
            let sort = req.query.sort;

            if(sort == 1)
            {
              req.url = req.url.replace('&sort=1', '');
              res.redirect(req.url);
            }

            if(deleteIndex == 1)
              req.url = req.url.replace('product=' + product, '');
            else if(deleteIndex == 2)
              req.url = req.url.replace('&brand=' + brand, '');
            else if(deleteIndex == 3)
              req.url = req.url.replace('&catalog=' + catalog, '');

            if(deleteIndex !== undefined)
            {
              req.url = req.url.replace('&delete=' + deleteIndex, '');
              res.redirect(req.url);
            }
      
            let standardURL = req.url;
            let firstParam = "" ;
            let secondParam = "" ;
            let thirdParam = "" ;
            

            if(standardURL.includes('?'))
            {
              let token = standardURL.split('?');
              standardURL = token[0];
            }
            
            standardURL += '?';

            if(product !== undefined)
              firstParam = ('product=' + product);

            if(brand !== undefined)
              secondParam = ('&brand=' + brand);

            if(catalog !== undefined )
              thirdParam = ('&catalog=' + catalog);

            let queryString = tool.customQueyString(product, brand, catalog, sort);

            if(sort === undefined)
              sort = 'Nothing';
            else if(sort == 2)
              sort = 'High Price → Low Price';
            else if(sort == 3)
              sort = 'Low Price → High Price';

            client.query(queryString, function(err, result){
              
              done();
        
              if(err){
                res.end();
                return console.log('Error runing query', err);
              }  
              const output = result;
              let maxPage = parseInt(result.rowCount / itemInPage);
              
              maxPage =  parseInt(result.rowCount % itemInPage) == 0 ? maxPage : maxPage + 1;

              output.rows = result.rows.slice(((page - 1) * itemInPage), ((page - 1) * itemInPage + itemInPage));

              if(req.isAuthenticated())    
              {         
                if(req.user.status == "active")                 
                  res.render('user/shop', {title: 'Cửa hàng',layout: 'index', fullreq: fullURL, originURL: standardURL, productParam: firstParam, brandParam: secondParam, catalogParam: thirdParam, sortParam: sort ,danhsach: output, currentPage: page, limitPage: maxPage,  username: req.user.name, link: '../logout.html', status: 'Đăng xuất' });
                else if(req.user.status == "ban")
                  res.redirect('/banned.html');
                else
                  res.redirect('/active.html');
              }
              else                     
                res.render('user/shop', {title: 'Cửa hàng',layout: 'index', fullreq: fullURL, originURL: standardURL, productParam: firstParam, brandParam: secondParam, catalogParam: thirdParam, sortParam: sort  ,danhsach: output, currentPage: page, limitPage: maxPage, username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập'});
              
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
              {
                if(req.user.status == "active")                         
                  res.render('user/home', { title: 'Trang chủ',layout: 'index', username: req.user.name,  link: '../logout.html', status: 'Đăng xuất', danhsach:result});
                else if(req.user.status == "ban")
                  res.redirect('/banned.html');
                else
                  res.redirect('/active.html');
              }
              else    
                res.render('user/home', { title: 'Trang chủ',layout: 'index', username: 'Tài khoản', link: '../login.html', status: 'Đăng nhập' , danhsach:result});
              
            });
        });   
    }
}

module.exports = productDetail;
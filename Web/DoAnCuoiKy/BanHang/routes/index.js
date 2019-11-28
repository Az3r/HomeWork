var express = require('express');
var router = express.Router();

//connect database
const pg = require('pg');
  
const config = {
  user: 'tgglwunjjggxth',
  database: 'd7o2it0mfovi3o',
  password: '2befc3fcc78bb78ddd3a18869865a079169054a97b9640fb7f2c91d168f2884b',
  host: 'ec2-107-21-111-24.compute-1.amazonaws.com',
  port: '5432',
  max: '10',
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

/* GET home page. */
router.get('/', function(req, res, next) {
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
      res.render('user/home', { title: 'Trang chủ',layout: 'index', danhsach:result});
    });
  });   
  
  
});
 

router.get('/index.html', function(req, res, next) {
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
      res.render('user/home', { title: 'Trang chủ',layout: 'index', danhsach:result});
      
    });
    
    
  });   
});

//-------------END HOME PAGE--------------------------

router.get('/shop.html', function(req, res, next) {
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
      res.render('user/shop', { title: 'Cửa hàng',layout: 'index', danhsach:result });
    });
  });
});

router.get('/contact-us.html', function(req, res, next) {
  res.render('user/contact', { title: 'Liên hệ',layout: 'index' });
});
router.get('/acount.html', function(req, res, next) {
  res.render('user/acount', { title: 'Tài khoản' ,layout: 'index'});
});
router.get('/checkout.html', function(req, res, next) {
  res.render('user/checkout', { title: 'Thanh toán',layout: 'index' });
});
router.get('/Cart.html', function(req, res, next) {
  res.render('user/Cart', { title: 'Giỏ hàng',layout: 'index'});
});
router.get('/login.html', function(req, res, next) {
  res.render('user/login', { title: 'Đăng nhập' ,layout: 'index'});
});
router.get('/register.html', function(req, res, next) {
  res.render('user/register', { title: 'Đăng ký',layout: 'index' });
});
router.get('/forgotpasswork.html', function(req, res, next) {
  res.render('user/forgotpasswork', { title: 'Quên tài khoản /mật khẩu',layout: 'index' });
});
router.get('/success.html', function(req, res, next) {
  res.render('user/success', { title: 'Quên tài khoản /mật khẩu' ,layout: 'index'});
});
router.get('/history.html', function(req, res, next) {
  res.render('user/history', { title: 'Tài khoản' ,layout: 'index'});
});


//----------------------PRODUCT DETAIL--------------------------------
router.get('/mat-kinh-thay-do.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Mắt kính thầy đồ' ", function(err, result){
      done();
      if(err)
      {
        res.end();
        return console.log('Error runing query', err);
      }  
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach: result, splienquan: temp});
    });
    
  });   
});

router.get('/mat-kinh-nobita.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Mắt kính Nobita' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
    });
  });   
});

router.get('/non-ket-quan-doi-rpa-35.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Nón kết quân đội RPA 35' ", function(err, result){
      done();
      if(err){
        res.end();
        return console.log('Error runing query', err);
              }
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/kinh-mat-tre-em.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Kính mát trẻ em' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/vest-cong-so.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Vest công sở' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/non-bao-hiem-QS96.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Nón bảo hiểm QS96' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/non-la.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Nón lá' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/non-rong-vanh.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Nón rộng vành' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/non-vai-baby.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Nón vải baby' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/non-chu-cong-an.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Nón chú công an' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/dong-ho-rolex.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Đồng hồ Rolex' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/dong-ho-the-thao.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Đồng hồ thể thao' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/lac-chan-sakura.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Lắc chân sakura' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/ao-thun-chocopie.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Áo thun Chocopie' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/quan-tay-ninh.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Quần tây ninh' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/dam-da-hoi.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Đầm dạ hội' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/chan-vay-crk.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Chân váy CRK' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/pyjama-tre-em.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Pyjama trẻ em' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/bo-do-cham-tre.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Bộ đồ chăm trẻ' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/gio-di-cho.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Giỏ đi chợ' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/tui-xach-da-ran.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Túi xách da rắn' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/boot-quan-doi-3tf5.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Boot quân đội 3TF5' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/giay-hunter.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Giày hunter' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/giay-cao-got-ai-cap.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Giày cao gót Ai Cập' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/giay-nu.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Giày nữ' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/giay-co-den-chop.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Giày có đèn chớp' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/giay-sandanl.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Giày sandanl' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/mat-kinh-chu-ong-con.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Mắt kính chú ong con' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/day-chuyen-tinh-yeu.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Dây chuyền tình yêu' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/vest-an-choi.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Vest ăn chơi' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/mat-kinh-the-thao-rc5.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Mắt kính thể thao RC5' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});

router.get('/mat-kinh-da-trong.html', function(req, res, next) {
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
    client.query("SELECT * FROM product WHERE name = 'Mắt kính đa tròng' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product-detail', { title: 'Chi tiết sản phầm' ,layout: 'index', danhsach:result, splienquan: temp});
      
    });
  });   
});
//-------------------------END PRODUCT DETAIL-----------------------


//-----------------------PRODUCT--------------------------------
router.get('/product-mat-kinh.html', function(req, res, next) {

  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE tag = 'Mắt kính' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product', { title: 'Mắt kính' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});

router.get('/product-vest.html', function(req, res, next) {

  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE tag = 'Vest' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product', { title: 'Vest' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});

router.get('/product-mu-non.html', function(req, res, next) {

  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE tag = 'Mũ nón' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product', { title: 'Mũ nón' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});

router.get('/product-trang-suc.html', function(req, res, next) {

  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE tag = 'Trang sức' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product', { title: 'Trang sức' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});

router.get('/product-quan-ao.html', function(req, res, next) {

  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE tag = 'Quần áo' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product', { title: 'Quần áo' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});

router.get('/product-tui-xach.html', function(req, res, next) {

  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE tag = 'Túi xách' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product', { title: 'Túi xách' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});

router.get('/product-giay.html', function(req, res, next) {

  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE tag = 'Giày' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/product', { title: 'Giày' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});
//-----------------------END PRODUCT---------------------------------
///--------------------BRANDS---------------------------
router.get('/brands-viet-tien.html', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE brand = 'Việt tiến' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/brands', { title: 'Thương hiệu Việt Tiến' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});

router.get('/brands-owen.html', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE brand = 'owen' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/brands', { title: 'Thương hiệu Owen' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});

router.get('/brands-5-the-way.html', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE brand = '5 the way' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/brands', { title: 'Thương hiệu 5 the way' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});

router.get('/brands-4men.html', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE brand = '4men' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/brands', { title: 'Thương hiệu 4men' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});

router.get('/brands-juno.html', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE brand = 'juno' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/brands', { title: 'Thương hiệu juno' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});

router.get('/brands-bwm.html', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE brand = 'bwm' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      
      res.render('user/brands', { title: 'Thương hiệu BWM' ,layout: 'index', danhsach:result});
      
    });
  });  
 
});
//--------------------END BRANDS---------------------------
//--------------------------------CATALOG---------------------
router.get('/catolory-nam.html', function(req, res, next) {
  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE catalog = 'thời trang nam' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
      res.render('user/catolory', { title: 'Sản phẩm cho phái nam' ,layout: 'index', danhsach:result});
      
    });
  });  
});

router.get('/catolory-nu.html', function(req, res, next) {

  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE catalog = 'thời trang nữ' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  

      res.render('user/catolory', { title: 'Sản phẩm cho phái nữ' ,layout: 'index', danhsach:result});
      
    });
  });  

  
});

router.get('/catolory-tre-em.html', function(req, res, next) {

  pool.connect(function(err, client, done) {
    if(err){
      return console.log('Error fetching client from pool')
    }

    client.query("SELECT * FROM product WHERE catalog = 'trẻ em' ", function(err, result){

      done();

      if(err){
        res.end();
        return console.log('Error runing query', err);
              }  
  
      res.render('user/catolory', { title: 'Sản phẩm cho trẻ em' ,layout: 'index', danhsach:result});     
    });
  });  
});

//-------------------------------END CATALOG---------------------
router.get('/dilevery.html', function(req, res, next) {
  res.render('user/dilevery', { title: 'Tài khoản' ,layout: 'index'});
});
module.exports = router;

var express = require('express');
var router = express.Router();

let generalControl = require('../controller/generalController');
let control = new generalControl();
let passport = require('passport');

/* GET home page. */
router.get(['/', '/index.html'], function(req, res, next) {
    control.home(req, res, next);
      
});
 
//-------------END HOME PAGE--------------------------
router.get('/shop.html', function(req, res, next) {
  control.shop(req, res, next);
});


router.get('/contact-us.html', function(req, res, next) {
  control.contact(req, res, next);
});

router.get('/acount.html', function(req, res, next) {
  control.account(req, res, next);
});

router.get('/checkout.html', function(req, res, next) {
  control.checkout(req, res, next);
});

router.get('/Cart.html', function(req, res, next) {
  control.cart(req, res, next);
});

router.get('/login.html', function(req, res, next) {
  control.showLogin(req, res, next);
});

router.post('/login.html', (req, res, next) => control.login(req, res, next));
/*router.post('/login.html', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login.html',
    failureFlash: true
  })(req, res, next);
});*/
/*router.post('/login.html', function(req, res, next){
  passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login.html'});
});*/

router.get('/register.html', function(req, res, next) {
  control.showRegister(req, res, next);
});

router.post('/register.html', function(req, res, next){
  control.register(req, res, next);
});

router.get('/forgotpasswork.html', function(req, res, next) {
  control.forgetPassword(req, res, next);
});

router.get('/success.html', function(req, res, next) {
  control.success(req, res, next);
});

router.get('/history.html', function(req, res, next) {
  control.history(req, res, next);
});

router.get('/dilevery.html', function(req, res, next) {
  control.dilevery(req, res, next);
});

router.get('/logout.html', (req, res, next) => control.logout(req, res, next));
//----------------------PRODUCT DETAIL--------------------------------

router.get('/:id', function(req, res, next) { 
  control.productDetail(req, res, next);
});
//-------------------------END PRODUCT DETAIL-----------------------

module.exports = router;

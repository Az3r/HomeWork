var express = require('express');
var router = express.Router();

let generalControl = require('../controller/generalController');
const userController = require('../controller/userController');

let control = new generalControl();
const userControl = new userController();


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

//--------------------- ACCOUNT ----------------------------
router.get('/acount.html', function(req, res, next) {
  userControl.showAccInfo(req, res, next);
});

router.get('/edit-account.html', function(req, res, next){
  userControl.showEditForm(req, res, next);
});

router.post('/edit-account.html', function(req, res, next){
  userControl.updateAcc(req, res ,next);
});

//------------------ ACTIVE ACCOUNT ----------------------
router.get('/active.html', function(req,res, next){ 
  userControl.showActivePage(req, res, next);
});

router.post('/active.html', function(req, res, next){
  userControl.activeAccount(req, res, next);
});

//-----------------BAN ACCOUNT ----------------------
router.get('/banned.html', function(req, res, next){
  userControl.showBanPage(req, res, next);
});

//-------------------FORGET PASS -----------------------------
router.get('/forgotpasswork.html', function(req, res, next) {
  userControl.showForgetPass(req, res, next);
});

router.post('/forgotpassword.html', function(req, res, next){
  userControl.getForgetPass(req, res, next);
});

//--------------------- CHECKOUT -----------------------------
router.get('/checkout.html', function(req, res, next) {
 userControl.showCheckout(req, res, next);
});

router.post('/checkout.html', function(req, res, next){
  userControl.checkout(req, res, next);
});


router.get('/login.html', function(req, res, next) {
  control.showLogin(req, res, next);
});

router.post('/login.html', (req, res, next) => control.login(req, res, next));


router.get('/register.html', function(req, res, next) {
  control.showRegister(req, res, next);
});

router.post('/register.html', function(req, res, next){
  control.register(req, res, next);
});



router.get('/success.html', function(req, res, next) {
  control.success(req, res, next);
});

//----------------HISTORY-----------------------------
router.get('/history.html', function(req, res, next) {
  userControl.showHistory(req, res, next);
});

//---------------DILEVERY-----------------------------
router.get('/dilevery.html', function(req, res, next) {
  userControl.showBill(req, res, next);
});

router.post('/dilevery.html', function(req, res, next){
  userControl.removeBill(req, res, next);
});

router.get('/logout.html', (req, res, next) => control.logout(req, res, next));


//------------------------ CART-------------------------------------------
router.get('/Cart.html', function(req, res, next) {
  userControl.showCart(req, res, next);
});

router.get('/addcart', (req, res, next) => userControl.addCart(req, res, next));

router.post('/updateCart', (req, res, next) => userControl.updateCart(req, res, next));

//-------------------------SEARCH-----------------------------
router.get('/search.html', (req, res, next) => control.searchProduct(req, res, next));

//----------------------PRODUCT DETAIL--------------------------------

router.get('/:id', function(req, res, next) { 
  control.productDetail(req, res, next);
});
//-------------------------END PRODUCT DETAIL-----------------------

router.post('/:id', function(req, res, next){
  userControl.postComment(req, res, next);
})


module.exports = router;

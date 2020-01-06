var express = require('express');
var router = express.Router();
let passport = require('passport');

let regisTemplate = require('../controller/adminRegisterController');
let login_outTemplate = require('../controller/adminLogin_outController');
let customerTemplate = require('../controller/adminCustomerController');
let productTemplate = require('../controller/adminProductController');
let orderTemplate = require('../controller/adminOrderController');

let regisControl = new regisTemplate();
let login_outControl = new login_outTemplate();
let customerControl = new customerTemplate();
let productControl = new productTemplate();
let orderControl = new orderTemplate();


/* GET admins listing. */
router.get('/', function(req, res, next) {
   res.redirect('/admin/dashboard.html');
});

router.get('/dashboard.html', function(req, res, next){
   login_outControl.showHomePage(req, res, next);
});

router.post('/login.html', function(req, res, next){
    login_outControl.loginAccount(req, res, next);   
});



router.get('/register.html', function(req, res, next) {
    regisControl.showRegister(req, res, next);
});

router.post('/register.html', function(req, res, next){
    regisControl.register(req, res, next);
});
//----------------VIEW USER-----------------------------

router.get('/user.html', function(req, res, next) {
    customerControl.showAllUserAcc(req, res, next);
});

//------------------EDIT ACOUNT , BAN, UNLOCK -----------------------
router.get('/edit-user.html', function(req, res, next) {
    customerControl.editUserAccount(req, res, next);
});

router.post('/edit-user.html', function(req, res, next){
    customerControl.submitEditAccount(req, res, next);
})

router.get('/order.html', function(req, res, next) {
    orderControl.showAllOrder(req, res, next);
});

router.get('/edit-order.html', function(req, res, next) {
    orderControl.editOrder(req, res, next);
});
router.get('/edit-order-1.html', function(req, res, next) {
    orderControl.editOrder(req, res, next);
});
//-----------------PRODUCT MANAGE --------------------------
router.get('/sales.html', function(req, res, next) {
    productControl.showSales(req, res, next);
});

router.get('/manage-product.html', function(req, res, next){
    productControl.showStore(req, res, next);
});

router.get('/edit-product.html', function(req, res, next){
    productControl.showProduct(req, res, next);
});

router.post('/edit-product.html', function(req, res, next){
    productControl.submitProduct(req, res, next);
});

//--------------- TOP -------------------------------
router.get('/top.html', function(req, res, next) {
    productControl.topProduct(req, res, next);
});

router.get('/login.html', function(req, res, next) {
    login_outControl.showLogin(req, res, next);
   
});
router.get('/logout.html', function(req, res, next){
    login_outControl.logoutAccount(req, res, next);
});

module.exports = router;
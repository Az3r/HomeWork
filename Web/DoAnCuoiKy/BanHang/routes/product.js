let express = require('express');
let router = express.Router();

let productController = require('../controller/produtController');

let control = new productController();

//-----------------------PRODUCT--------------------------------

router.get('/mat-kinh.html', (req, res, next) => control.showGlass(req, res, next));

router.get('/vest.html', (req, res, next) => control.showVest(req, res, next));

router.get('/mu-non.html', (req, res, next) => control.showHat(req, res, next));

router.get('/trang-suc.html', (req, res, next) => control.showJewelry(req, res, next));

router.get('/quan-ao.html', (req, res, next) => control.showColthes(req, res, next));

router.get('/tui-xach.html', (req, res, next) => control.showHandBag(req, res, next));

router.get('/giay.html', (req, res, next) => control.showShoes(req, res, next));

  //-----------------------END PRODUCT---------------------------------

module.exports = router;
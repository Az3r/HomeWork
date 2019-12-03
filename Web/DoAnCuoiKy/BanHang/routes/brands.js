let express = require('express');
let router = express.Router();

const brandControl = require('../controller/brandsController');

const control = new brandControl();

///--------------------BRANDS---------------------------
router.get('/viet-tien.html', (req, res, next) => control.showVietTien(req, res, next));


router.get('/owen.html', (req, res, next) => control.showOwen(req, res, next));
  
router.get('/5-the-way.html', (req, res, next) => control.show5theway(req, res, next));
  
router.get('/4men.html', (req, res, next) => control.show4men(req, res, next));

router.get('/juno.html', (req, res, next) => control.showJuno(req, res, next));
  
router.get('/bwm.html', (req, res, next) => control.showBWM(req, res, next));
  

  //--------------------END BRANDS---------------------------

  module.exports = router;
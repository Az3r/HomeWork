let express = require('express');
let router = express.Router();

let model = require('../model/brandsBus');

let bus = new model();

class brandControl
{
  showVietTien(req, res, next)
  {
    bus.showProduct(req, res, next, 'Việt tiến');
  }

  showOwen(req, res, next)
  {
    bus.showProduct(req, res, next, 'owen');
  }

  show5theway(req, res, next)
  {
    bus.showProduct(req, res, next, '5 the way');
  }

  show4men(req, res, next)
  {
    bus.showProduct(req, res, next, '4men');
  }

  showJuno(req, res, next)
  {
    bus.showProduct(req, res, next, 'juno');
  }

  showBWM(req, res, next)
  {
    bus.showProduct(req, res, next, 'bwm');
  }  
    
}

module.exports = brandControl
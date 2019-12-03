let express = require('express');
let router = express.Router();

let catalogControl = require('../controller/catalogController');

let control = new catalogControl();

//--------------------------------CATALOG---------------------

router.get('/nam.html', (req, res, next) => control.showMenProduct(req, res, next));

router.get('/nu.html', (req, res, next) => control.showWomenProduct(req, res, next));

router.get('/tre-em.html', (req, res, next) => control.showKidProduct(req, res, next));

//-------------------------------END CATALOG---------------------

module.exports = router;
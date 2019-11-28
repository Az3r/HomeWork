var express = require('express');
var router = express.Router();

/* GET admins listing. */
router.get('/', function(req, res, next) {
    res.render('admin/dashboard', { title: 'Trang chủ',layout: 'admin' });
});
router.get('/user.html', function(req, res, next) {
    res.render('admin/user', { title: 'Khách hàng',layout: 'admin' });
});
router.get('/edit-user.html', function(req, res, next) {
    res.render('admin/edit-user', { title: 'Chi tiết người dùng',layout: 'admin' });
});
router.get('/order.html', function(req, res, next) {
    res.render('admin/order', { title: 'Đơn hàng',layout: 'admin' });
});

router.get('/edit-order.html', function(req, res, next) {
    res.render('admin/edit-order', { title: 'Chi tiết đơn hàng',layout: 'admin' });
});
router.get('/edit-order-1.html', function(req, res, next) {
    res.render('admin/edit-order-1', { title: 'Chi tiết đơn hàng',layout: 'admin' });
});
router.get('/sales.html', function(req, res, next) {
    res.render('admin/sales', { title: 'Chi tiết đơn hàng',layout: 'admin' });
});
router.get('/top.html', function(req, res, next) {
    res.render('admin/top', { title: 'Chi tiết đơn hàng',layout: 'admin' });
});
module.exports = router;
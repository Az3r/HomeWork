let model = require('../model/adminProductManage');
let bus = new model();

class adminProductController
{
    showSales(req, res, next)
    {
        bus.salesReport(req, res, next);
    }

    topProduct(req, res, next)
    {
        bus.topProduct(req, res, next);
    }
}

module.exports = adminProductController
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

    showStore(req, res, next)
    {
        bus.showStore(req, res, next);
    }

    showProduct(req, res, next)
    {
        bus.editProduct(req, res, next);
    }

    submitProduct(req, res, next)
    {
        bus.submitProduct(req, res, next);
    }
}

module.exports = adminProductController
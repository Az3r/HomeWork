let model = require('../model/adminOrderBus');
let bus = new model();

class adminOrderBus
{
    showAllOrder(req, res, next)
    {
        bus.allOrder(req, res, next);
    }

    editOrder(req, res, next)
    {
        bus.orderDetail(req, res, next);
    }
}

module.exports = adminOrderBus;
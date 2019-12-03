let model = require('../model/adminCustomerBus');

let bus = new model();

class adminCustomerBus
{
    showAllUserAcc(req, res, next)
    {
        bus.viewAccount(req, res, next);
    }

    editUserAccount(req, res, next)
    {
        bus.customerDetail(req, res, next);
    }
}

module.exports = adminCustomerBus;
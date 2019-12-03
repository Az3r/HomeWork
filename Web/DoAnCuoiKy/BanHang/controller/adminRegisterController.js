let model = require('../model/admingRegisterBus');
let bus = new model();

class adminRegisterControl
{
    showRegister(req, res, next)
    {
        bus.showRegister(req, res, next);
    }

    register(req, res, next)
    {
        bus.registerAccount(req, res, next);
    }
}

module.exports = adminRegisterControl;
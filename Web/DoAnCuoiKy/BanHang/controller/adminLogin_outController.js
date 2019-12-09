let model = require('../model/admin_login_outBus');
let bus = new model();

class login_outControll
{
    showHomePage(req, res, next)
    {
        bus.showDashboard(req, res, next);
    }

    showLogin(req, res, next)
    {
        bus.showlogin(req, res, next);
    }

    loginAccount(req, res, next)
    {
        bus.login(req, res, next);
    }

    logoutAccount(req, res, next)
    {
        bus.logout(req, res, next);
    }
}
module.exports = login_outControll;
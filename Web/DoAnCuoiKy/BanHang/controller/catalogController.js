let model = require('../model/cataloryBus');

let bus = new model();

class catalogControl
{
    
    showMenProduct(req, res, next)
    {
        bus.showProduct(req, res, next, 'thời trang nam');
    }

    showWomenProduct(req, res, next)
    {
        bus.showProduct(req, res, next, 'thời trang nữ');
    }

    showKidProduct(req, res, next)
    {
        bus.showProduct(req, res, next, 'trẻ em');
    }   

}

module.exports = catalogControl;

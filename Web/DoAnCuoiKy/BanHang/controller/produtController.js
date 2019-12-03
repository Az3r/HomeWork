let model = require('../model/productBus');

let bus = new model();

class productControl
{
    showGlass(req, res, next)
    { 
        bus.showProduct(req, res, next, 'Mắt kính');
    }

    showVest(req, res, next)
    {
        bus.showProduct(req, res, next, 'Vest');
     
    }

    showHat(req, res, next)
    {
        bus.showProduct(req, res, next, 'Mũ nón');
    }

    showJewelry(req, res, next)
    {
        bus.showProduct(req, res, next, 'Trang sức');
    }

    showColthes(req, res, next)
    {
        bus.showProduct(req, res, next, 'Quần áo');
    }

    showHandBag(req, res, next)
    {
        bus.showProduct(req, res, next, 'Túi xách');
    }

    showShoes(req, res, next)
    {
        bus.showProduct(req, res, next, 'Giày');
    }
}

module.exports = productControl;
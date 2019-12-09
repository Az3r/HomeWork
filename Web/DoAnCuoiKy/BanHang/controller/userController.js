const commentModel = require('../model/userPostCommentBus');
const addCartModel = require('../model/userCartBus');
const checkoutModel = require('../model/userCheckoutBus')

const commentBus = new commentModel();
const cartBus = new addCartModel();
const checkoutBus = new checkoutModel();

class userControl
{
    postComment(req, res, next)
    {
       commentBus.postComment(req, res, next);
    }

    addCart(req, res, next)
    {
        if(req.query.delete)
            cartBus.removeProductFromCart(req, res, next);
        else
            cartBus.addProductToCart(req, res, next);
    }

    showCart(req, res, next)
    {
        cartBus.showCart(req, res, next);
    }

    updateCart(req, res, next)
    {
        cartBus.updateCart(req, res, next);
        
    }
    showCheckout(req, res, next)
    {
        checkoutBus.showCheckout(req, res, next);     
    }
}

module.exports = userControl;
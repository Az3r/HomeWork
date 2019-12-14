const commentModel = require('../model/userPostCommentBus');
const addCartModel = require('../model/userCartBus');
const checkoutModel = require('../model/userCheckoutBus');
const accountModel = require('../model/userAccountBus');

const commentBus = new commentModel();
const cartBus = new addCartModel();
const checkoutBus = new checkoutModel();
const accountBus = new accountModel();

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

    checkout(req, res, next)
    {
        checkoutBus.checkout(req, res, next);
    }

    showHistory(req,res, next)
    {
        accountBus.showHistory(req, res, next);
    }

    showBill(req, res, next)
    {
        checkoutBus.showBill(req, res, next);
    }

    removeBill(req, res, next)
    {
        checkoutBus.removeBill(req, res, next);
    }

    showAccInfo(req, res, next)
    {
        accountBus.showUserInfo(req, res, next);
    }

    showEditForm(req, res, next)
    {
        accountBus.showEditAccountForm(req, res, next);
    }

    updateAcc(req, res, next)
    {
        accountBus.submitEditInfo(req, res, next);
    }

    showActivePage(req, res, next)
    {
        accountBus.showActivePage(req, res, next);
    }

    activeAccount(req, res, next)
    {
        accountBus.activeAccount(req, res, next);
    }

    showBanPage(req, res, next)
    {
        accountBus.showBannedPage(req, res, next);
    }

    showForgetPass(req, res, next)
    {
        accountBus.showForgetPasswordPage(req, res, next);
    }

    getForgetPass(req, res, next)
    {
        accountBus.forgetPasswordProcess(req, res, next);
    }
}

module.exports = userControl;
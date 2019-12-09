let express = require('express');
let router = express.Router();

let pool = require('../connection');

class searchBus
{
    search(req, res, next)
    {
        let fullURL = req.url;

        if(!fullURL.includes('?'))
            fullURL += '?';
        if(fullURL.includes('&page='))
        {
            const tokens = fullURL.split('&page=');
            fullURL = tokens[0];
            fullURL += tokens[1].slice(1);
        }

        const itemInPage = 9
        let page = (req.query.page) || 1;

        const needle = req.query.searchBlock;
        let standardURL;
        let accountName, linkParam, statusParam;
        const sort = 'x';
        
        if(req.isAuthenticated())
        {
            accountName = req.user.name;
            linkParam = '../logout.html';
            statusParam = 'Đăng xuất';
        }
        else
        {
            accountName = 'Tài khoản';
            linkParam = '../login.html';
            statusParam = 'Đăng nhập';
        }

        const token = req.url.split('/');
        standardURL = token[0] + '/shop.html?';

        pool.query("SELECT * FROM product WHERE name LIKE '%" + needle +"%'", function(err, result)
        {
            if(err)
                return console.log('err in query ' + err);

            if(result.rowCount < 1)
                res.render('user/shopNotFound',  {title: 'Cửa hàng',layout: 'index', originURL: standardURL, productParam: '', brandParam: '', catalogParam: '' , username: accountName, link: linkParam, status: statusParam });
            else
            {
                const output = result;
                const maxPage = parseInt(result.rowCount / itemInPage) + 1;
                
                output.rows = result.rows.slice(((page - 1) * itemInPage), ((page - 1) * itemInPage + itemInPage))
                res.render('user/shop', {title: 'Cửa hàng',layout: 'index',  fullreq: fullURL, originURL: standardURL, productParam: '', brandParam: '', catalogParam: '', sortParam: sort ,danhsach: output, currentPage: page, limitPage: maxPage,  username: accountName, link: linkParam, status: statusParam });              
            }
        });
    }
}

module.exports = searchBus;
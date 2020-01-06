let express = require('express');
let router = express.Router();
let pool = require('../connection');

class productManage
{
    builQueryStringForStore(req)
    {
        const tagName = ['Mắt kính', 'Vest', 'Mũ nón', 'Trang sức', 'Quần áo', 'Túi xách', 'Giày'];
        const brandName = ['Việt tiến', 'owen', '5 the way', '4men', 'juno', 'bwm'];
        const catalogName = ['thời trang nam', 'thời trang nữ', 'trẻ em'];

        let output = "SELECT * FROM product WHERE ";
        if(req.query.tagid)
            output += "tag = '" + tagName[parseInt(req.query.tagid)] + "'";
        else if(req.query.brandid)
            output += "brand = '" + brandName[parseInt(req.query.brandid)] + "'";
        else
            output += "catalog = '" + catalogName[parseInt(req.query.catalogid)] + "'";

        return output;
    }

    getParamForStoreHeader(req)
    {
        const tagName = ['mắt kính', 'vest', 'mũ nón', 'trang sức', 'quần áo', 'túi xách', 'giày'];
        const brandName = ['việt tiến', 'owen', '5 the way', '4men', 'juno', 'bwm'];
        const catalogName = ['thời trang nam', 'thời trang nữ', 'trẻ em'];

        if(req.query.tagid)
            return  tagName[parseInt(req.query.tagid)];
        else if(req.query.brandid)
            return brandName[parseInt(req.query.brandid)];
        else
            return catalogName[parseInt(req.query.catalogid)];
    }

    salesReport(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
        {
            pool.query("SELECT * FROM product")
            .then(result => 
                {
                    const tagName = ['Mắt kính', 'Vest', 'Mũ nón', 'Trang sức', 'Quần áo', 'Túi xách', 'Giày'];
                    const brandName = ['Việt tiến', 'owen', '5 the way', '4men', 'juno', 'bwm'];
                    const catalogName = ['thời trang nam', 'thời trang nữ', 'trẻ em'];

                    let tagProfit = [0,0,0,0,0,0,0,];
                    let brandProfit = [0,0,0,0,0,0];
                    let catalogProfit = [0,0,0];

                    let amountTag = [0,0,0,0,0,0,0,];
                    let amountBrand = [0,0,0,0,0,0];
                    let amountCatalog = [0,0,0];

                    for(let i = 0; i < result.rowCount; i++)
                    {
                        for(let j = 0; j < tagName.length; j++)
                        {
                            if(result.rows[i].tag == tagName[j])
                            {
                                tagProfit[j] += parseInt(result.rows[i].profit);
                                amountTag[j] += 1;
                            }
                        }

                        for(let j = 0; j < brandName.length; j++)
                        {
                            if(result.rows[i].brand == brandName[j])
                            {
                                brandProfit[j] += parseInt(result.rows[i].profit);
                                amountBrand[j] += 1;
                            }
                        }

                        for(let j = 0; j < catalogName.length; j++)
                        {
                            if(result.rows[i].catalog == catalogName[j])
                            {
                                catalogProfit[j] += parseInt(result.rows[i].profit);
                                amountCatalog[j] += 1;
                            }
                        }
                       
                    }

                    res.render('admin/sales', { title: 'Quản lí gian hàng',layout: 'admin', adminName: req.user.name, tagname: tagName, tagprofit: tagProfit, tagamount: amountTag, brandname: brandName, brandprofit: brandProfit, brandamount : amountBrand, catalogname: catalogName, catalogprofit: catalogProfit, catalogamount: amountCatalog });
                });
            
        }
        else
            res.redirect('/admin/login.html');
    }

    topProduct(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
        {
            
            pool.query("SELECT * FROM product ORDER BY profit DESC")
            .then((result) => 
            {
                result.rows = result.rows.slice(0, 10);
                
                res.render('admin/top', { title: 'Chi tiết đơn hàng',layout: 'admin', adminName: req.user.name, danhsach: result });
            });
            
        }
        else
            res.redirect('/admin/login.html');
    }

    showStore(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
        {
            const queryString = this.builQueryStringForStore(req);
            const headerName = this.getParamForStoreHeader(req);
            
            pool.query(queryString)
            .then(result => 
            {
                const itemInPage = 5;
                let page = (req.query.page) || 1;    
                const output = result;
                    
                let maxPage = parseInt(result.rowCount / itemInPage);
                    
                    
                maxPage =  parseInt(result.rowCount % itemInPage) == 0 ? maxPage : maxPage + 1;
      
                    
                output.rows = result.rows.slice(((page - 1) * itemInPage), ((page - 1) * itemInPage + itemInPage));
                const startIndex = (page - 1) * itemInPage + 1;
                let url = req.url;

                if(!url.includes('?'))
                    url += '?';

                if(url.includes('&page'))
                {
                    let token = url.split('&page');
                    url = token[0];
                }
                url = url.replace('&')

                res.render('admin/store-detail', { title: 'Gian hàng',layout: 'admin', adminName: req.user.name, name:headerName, danhsach: result, currentPage: page, limitPage: maxPage, i : startIndex, fullURL:url});
            });
            
           
        }
        else
            res.redirect('/admin/login.html');
    }

    editProduct(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
        {     
            pool.query("SELECT * FROM product WHERE id = " + req.query.productid)
            .then(result => 
            {
                res.render('admin/edit-product', { title: 'Cập nhật sản phẩm',layout: 'admin', adminName: req.user.name, danhsach: result, masp: req.query.productid});
            }) ;
            
        }
        else
            res.redirect('/admin/login.html');
    }

    submitProduct(req, res, next)
    {
        let queryString = "UPDATE product SET ";
        let firstParam = 0;

        if(req.body.newname == "" && req.body.newprice == "" && req.body.newamount == "" && req.body.newdescription == "")
            res.redirect('/admin/sales.html');
        else
        {
            if(req.body.newname !== "")
            {
                queryString += "name = '" + req.body.newname + "'";
                firstParam = 1;
            }

            if(req.body.newprice !== "")
            {
                if(firstParam)
                    queryString += " , ";
                queryString += "price = " + req.body.newprice;
                firstParam = 1;
            }

            if(req.body.newamount !== "")
            {
                if(firstParam)
                    queryString += " , ";
                queryString += "amount = " + req.body.newamount;
                firstParam = 1;
            }

            if(req.body.newdescription !== "")
            {
                if(firstParam)
                    queryString += " , ";
                queryString += "description = '" + req.body.newdescription + "'";
            }

            queryString += "WHERE id = " + req.query.productid;

            pool.query(queryString)
            .then(() => 
            {
                res.redirect('/admin/sales.html');
            });
        }
        
    }
}

module.exports = productManage;
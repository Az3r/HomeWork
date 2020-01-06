let express = require('express');
let router = express.Router();
let pool = require('../connection');
let bcrypt = require('bcryptjs');

class customerBus
{
    buildQueryStringForEditUser(newusername, newemail, newlastname, newname)
    {
        let queyString = "UPDATE usertable SET ";
        let firstParam = 0;

        if(newusername === "" && newemail === "" && newlastname === "" && newname === "")
            return "";

        if(newusername !== "")
        {
            queyString += "username = '" + newusername + "'";
            firstParam = 1;
        }
        
        if(newemail !== "")
        {
            if(firstParam)
                queyString += " , ";
            queyString += "email = '" + newemail + "'";
            firstParam = 1;
        }
        
        if(newlastname !== "")
        {
            if(firstParam)
                queyString += " , ";
            queyString += "lastname = '" + newlastname + "'";
            firstParam = 1; 
        }
        
        if(newname !== "")
        {
            if(firstParam)
                queyString += " , ";
            queyString += "name = '" + newname + "'";
        }
        
        return queyString;
         
    }
    viewAccount(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
        {
            pool.query("SELECT * FROM usertable", function(err, result){
                if(err)
                    return console.log(err);
                    
                const itemInPage = 5;
                let page = (req.query.page) || 1;    
                const output = result;
                    
                let maxPage = parseInt(result.rowCount / itemInPage);
                    
                    
                maxPage =  parseInt(result.rowCount % itemInPage) == 0 ? maxPage : maxPage + 1;
      
                    
                output.rows = result.rows.slice(((page - 1) * itemInPage), ((page - 1) * itemInPage + itemInPage));
                const startIndex = (page - 1) * itemInPage + 1;

                res.render('admin/user', { title: 'Khách hàng',layout: 'admin', adminName: req.user.name, danhsach:output, currentPage: page, limitPage: maxPage, i: startIndex });
            });
           
        }
        else
            res.redirect('/admin/login.html');
    }

    customerDetail(req, res, next)
    {
        if(req.isAuthenticated() && (req.user.type == 1 || req.user.type == 2))
        {
            if(req.query.banid)
            {
                if(req.query.banid == req.user.id)
                    res.redirect('/admin/user.html');
                else
                {
                    pool.query("SELECT * FROM usertable WHERE id = " + req.query.banid)
                    .then(banRequest => 
                    {
                        pool.query("SELECT * FROM usertable WHERE id = " + req.user.id)
                        .then(isAdmin => 
                        {
                            if(isAdmin.rows[0].type > banRequest.rows[0].type)
                            {
                                pool.query("UPDATE usertable SET status = 'ban' WHERE id =" + req.query.banid + " AND status = 'active'")
                                .then(e => {
            
                                    res.redirect('/admin/user.html');
                                });
                            }
                            else
                            res.redirect('/admin/user.html');
                        });
                    });
                  
                }
            }
            else if(req.query.unlockid)
            {
                pool.query("UPDATE usertable SET status = 'active' WHERE id =" + req.query.unlockid)
                .then(e => {

                        res.redirect('/admin/user.html');
                });
            }
            else
            {
                pool.query('SELECT * FROM usertable WHERE id = ' + req.query.userid)
                .then((result) => {
                    res.render('admin/edit-user', { title: 'Chi tiết người dùng',layout: 'admin', adminName: req.user.name, danhsach: result.rows[0], nofi: "" });
                });              
            }
        }
        else
            res.redirect('/admin/login.html');
    }

    submitEditAccount(req, res, next)
    {
        
       let tempQueryString = this.buildQueryStringForEditUser(req.body.newusername, req.body.newemail, req.body.newlastname, req.body.newname);  

        if(tempQueryString == "" && req.body.newpassword == "") 
            res.redirect('/admin/user.html');
        else if(req.query.userid != req.user.id)
        res.render('admin/edit-user', { title: 'Chi tiết người dùng',layout: 'admin', adminName: req.user.name, danhsach: req.user, nofi: "Bạn không thể sửa thông tin của người khác" });                            
        else
        {
            pool.query("SELECT * FROM usertable WHERE username = '" + req.body.newusername + "' OR email = '" + req.body.newemail + "'", function(err, check)
            {
                if(err)
                    return console.log(err);
                
                if(check.rowCount > 0)
                    res.render('admin/edit-user', { title: 'Chi tiết người dùng',layout: 'admin', adminName: req.user.name, danhsach: req.user, nofi: "username hoặc email đã tồn tại" });
                else
                {
                    if(req.body.newpassword === "")
                    {
                        tempQueryString += " WHERE id = " + req.query.userid;
                        pool.query(tempQueryString)
                        .then(() => {
                            res.redirect('/admin/user.html');
                        });
                    }
                    else
                    {
                        
                        if(req.body.newpassword.length < 6)
                        {                         
                            res.render('admin/edit-user', { title: 'Chi tiết người dùng',layout: 'admin', adminName: req.user.name, danhsach: req.user, nofi: "Mật khẩu phải dài ít nhất 6 kí tự" });                            
                        }
                        else
                        {
                            bcrypt.genSalt(10, (er, salt) => {
                                if(er)
                                return console.log(er);
                
                                bcrypt.hash(req.body.newpassword, salt, (eror, newpass) => 
                                {
                                if(eror)
                                    return console.log(e);
                                    
                                    if(tempQueryString !== "")
                                        tempQueryString += " , ";
                                    else
                                        tempQueryString += "UPDATE usertable SET "
                                    tempQueryString += "password = '" + newpass + "' WHERE id = " + req.query.userid ;            
                                
                
                                pool.query(tempQueryString, function(e)
                                {
                                    if(e)                      
                                    return console.log('error in insert db', e);  
                                    
                                    res.redirect('/admin/user.html');
                                });   
                                        
                                });
                            });
                        }
                    }
                }
            });
            
        }
    }
    
}

module.exports = customerBus;
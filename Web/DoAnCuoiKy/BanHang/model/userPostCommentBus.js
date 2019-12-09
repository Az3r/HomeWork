let express = require('express');
let router = express.Router();

let pool = require('../connection');


class postCommentHandle
{
    postComment(req, res, next)
    {
        
        const productid = req.params.id;
        const username = req.body.username;
        const email = req.body.email;
        const content = req.body.content;

        pool.query("SELECT * FROM usertable WHERE ( username = '" + username + "' AND email = '" + email + "' )", function(err, userAccount){
            if(err)
                return console.log(err);

            if(userAccount.rowCount < 1)
                res.redirect('/login.html');

            pool.query("INSERT INTO comment (productid, userid, name, content) VALUES (" + productid + " , " + userAccount.rows[0].id + " , '" + userAccount.rows[0].name + "' , '" + content + "' )", function(e){
                if(e)
                    return console.log(e);

                res.redirect('/' + productid);
            });

        });
       
    }
}

module.exports = postCommentHandle;
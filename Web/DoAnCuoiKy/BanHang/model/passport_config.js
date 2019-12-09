let express = require('express');
let router = express.Router();
let LocalStrategy = require('passport-local').Strategy;
let passport = require('passport');
let bcrypt = require('bcryptjs');

let pool = require('../connection');

module.exports = function(passport)
{
    passport.use(new LocalStrategy(
        function (username,password,done) {
            
                pool.query("SELECT * FROM usertable WHERE username = '" + username + "'", function(error, result){
                    if(error)
                        return done(error);
    
                    if(result.rowCount === 1 )
                    {
                        bcrypt.compare(password, result.rows[0].password, function(err, res){
                            if(err)
                                return done(err);
                            if(res)
                                return done(null, result);
                            else
                                
                                return done(null, false, {message: 'Incorrect username and password' });
                        });
                    }
                    else
                        return done(null, false, {message: 'Username does not exist' });
                });
           
       }
    ));
passport.serializeUser(function(user, done) {
    done(null, user.rows[0].id);
});

passport.deserializeUser(function(id, done) {
        pool.query("SELECT * FROM usertable WHERE id = '" + id + "'", function(error, result){
            if(result.rowCount > 0)
                done(null, result.rows[0]);
            else
                return console.log(error);
        });     
});



}
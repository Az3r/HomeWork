let nodemailer = require('nodemailer');
let random = require('./activeCodeGenerate')

module.exports = function(reciver, activeCode, isActive)
{

    let textSend;
    
    if(isActive == 1)
        textSend = "Your active code is ";
    else
        textSend = "Your new password is "
    let transport = nodemailer.createTransport
    ({
        sendMail: true,
        service: 'gmail',
        auth: {
            user: 'hcmus.student.LMT@gmail.com',
            pass: 'ofcl euop hvoz rdbb'
        }
    });

    let mainOption = {
        from: 'hcmus.student.LMT@gmail.com',
        to: reciver,
        subject: 'Test nodemail',
        text: textSend + activeCode
    };

    transport.sendMail(mainOption, function(err, info)
    {
        if(err)
            console.log('email err ', err);
        else
        {
            console.log('Email was send', info.response);
        }
    });


}
var nodemailer = require('nodemailer');


var mailer = {
    fromUser: 'jdtgame@163.com', //'info@jiudingame.com',
    password: 'lu53898490', //'ABFmd3vcSx[k',
    server: 'smtp.163.com', //'mail.jiudingame.com',
    port: 25, //26,
    protocol: 'smtp://',
    sendMail: function(toUser, subject, content, onsuccess, onerror){
        var mailOptions= {
            "from": this.fromUser,
            "subject": subject,
            "html": content
        }
        //根据人数决定普通发送或密送
        //单人普通发送
        //多人使用密送
        var ar = toUser.split(',');
        for(var i in ar){
            if(ar[i] == undefined || ar[i] == null || ar[i] == ""){
                ar.splice(i, 1);
            }
        }
        if(ar.length>1){
            mailOptions["bcc"] = toUser;
        }else{
            mailOptions["to"] = toUser;
        }
        var smtpcfg = {
            host: this.server,
            port: this.port,
            secure: false,
            ignoreTLS: true,
            auth: {
                user: this.fromUser,
                pass: this.password
            }
        }
        //var transporter = nodemailer.createTransport(this.protocol + this.fromUser + ':' + this.password + '@' + this.server);
        var transporter = nodemailer.createTransport(smtpcfg);
        transporter.sendMail(mailOptions, function(err, res){
            if(err){
                console.log(err);
                onerror && onerror();
            }else{
                console.log("Mail sent:" + res.message);
                onsuccess && onsuccess();
            }
            transporter.close();
        });
    }
}



module.exports=mailer;
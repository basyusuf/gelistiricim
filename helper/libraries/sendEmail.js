const nodemailer = require('nodemailer');
const config = require('../../config');
const sendEmail = async(mailOptions)=>{
    let transporter =  nodemailer.createTransport({
        host:config.smtpSetting.host,
        port:config.smtpSetting.port,
        auth:{
            user:config.smtpSetting.email,
            pass:config.smtpSetting.pass
        }
    });
    let info = await transporter.sendMail(mailOptions);
}
module.exports=sendEmail;
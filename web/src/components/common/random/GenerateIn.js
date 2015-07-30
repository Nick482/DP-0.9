/**
 * Created by Nick on 4/17/2015.
 */
var nodemailer = require('nodemailer');

function Generate (user) {
    function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    }

    var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kolya.bandura@gmail.com',
            pass: 'Nick2809155576000635337173'
        }
    });
    transporter.sendMail({
        from: 'kolya.bandura@gmail.com',
        to: user.email,
        subject: "Finalization",
        text: 'http://localhost:3000/users/verifyIn?link=' + rString
    });
    Generate.rString = rString
}
module.exports = Generate;
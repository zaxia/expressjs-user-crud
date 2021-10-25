const {
	user,
	item,
	Sequelize
} = require("../models");

var nodemailer = require('nodemailer');

const Op = Sequelize.Op;

let self = {};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
	port: 587,               // port 587 pour smtp outlook
	host: "smtp-mail.outlook.com",
    auth: {
        user: 'zacharie.bossard@up.coop',
        pass: 'Cityzen51',
	},
    secureConnection: false,
    tls: {
        ciphers:'SSLv3'
    }
});

const default_mail_data = {
	from: 'zacharie.bossard@up.coop',  // sender address
	to: 'bossard.zacharie@hotmail.fr',   // list of receivers
	subject: 'Sending test Email using Node.js',
	html: `<b>Hey there! </b>
			 <br> This is our test message sent with Nodemailer<br/>`,
};

const send_email = (mailData) => {
	if(mailData == undefined) {
		mailData = default_mail_data;
	}
	transporter.sendMail(mailData, function (err, info) {
		if(err)
			console.log(err)
		else
			console.log(info);
	});
}

self.email = (req,res) => {
    if(req.session.user==null)
        return res.redirect("/login");
    return res.render("email/email", {user: req.session.user, nav: "/email"});
}

self.sendTest = async (req,res) => {
	try{
        send_email();
		return res.json({
			status:"ok"
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

self.send = async (req,res) => {
	try{
		let body = req.body;
		let mailData = {
			from: body.from || default_mail_data.from,
			to: body.to || default_mail_data.to,
			subject : body.object || default_mail_data.subject,
			text: body.mail_body || default_mail_data.html
		};
		send_email(mailData);
		return res.json({
			status:"ok"
		})
	}catch(error){
		res.status(500).json({
			status:"error",
			data:error
		})
	}
}

module.exports = self;